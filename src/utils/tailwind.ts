import fs from 'fs-extra';
import path from 'path';
import { execa } from 'execa';
import { PM, addDeps } from './pm';
import { info, ok } from './logger';

export function hasTailwind(cwd: string): boolean {
  const pkg = safeReadJSON(path.join(cwd, 'package.json'));
  const deps = {
    ...(pkg?.dependencies || {}),
    ...(pkg?.devDependencies || {}),
  };
  if (deps['tailwindcss']) return true;
  return (
    fs.existsSync(path.join(cwd, 'tailwind.config.js')) ||
    fs.existsSync(path.join(cwd, 'tailwind.config.ts'))
  );
}

export async function installTailwind(pm: PM, cwd = process.cwd()) {
  info('Installing TailwindCSS (+ PostCSS & Autoprefixer)…');
  await addDeps(pm, ['tailwindcss', 'postcss', 'autoprefixer'], true, cwd);
  // npx tailwindcss init -p
  await execa(
    pm === 'npm' ? 'npx' : pm,
    pm === 'npm'
      ? ['tailwindcss', 'init', '-p']
      : ['tailwindcss', 'init', '-p'],
    { stdio: 'inherit', cwd }
  );
  await tweakTailwindConfig(cwd);
  await ensureTailwindCSSImported(cwd);
  ok('Tailwind installed & configured.');
}

async function tweakTailwindConfig(cwd: string) {
  const cfgJs = path.join(cwd, 'tailwind.config.js');
  const cfgTs = path.join(cwd, 'tailwind.config.ts');
  const cfg = fs.existsSync(cfgTs) ? cfgTs : cfgJs;
  if (!fs.existsSync(cfg)) return;
  let content = await fs.readFile(cfg, 'utf8');
  content = content.replace(
    /content:\s*\[.*?\],?/s,
    `content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],`
  );
  // add a basic theme extension (optional)
  await fs.writeFile(cfg, content, 'utf8');
}

async function ensureTailwindCSSImported(cwd: string) {
  // Prefer app router, else pages router
  const appCss = path.join(cwd, 'app', 'globals.css');
  const pagesCssDir = path.join(cwd, 'styles');
  const pagesCss = path.join(pagesCssDir, 'globals.css');

  let targetCss: string;
  if (fs.existsSync(appCss)) targetCss = appCss;
  else {
    await fs.ensureDir(pagesCssDir);
    targetCss = pagesCss;
  }

  let current = fs.existsSync(targetCss)
    ? await fs.readFile(targetCss, 'utf8')
    : '';
  const directives = [
    '@tailwind base;',
    '@tailwind components;',
    '@tailwind utilities;',
  ];
  const missing = directives.filter((d) => !current.includes(d));
  if (missing.length) {
    current = `${missing.join('\n')}\n` + current;
    await fs.writeFile(targetCss, current, 'utf8');
  }

  // If pages router, ensure _app imports the css
  const appTsx = path.join(cwd, 'pages', '_app.tsx');
  const appJsx = path.join(cwd, 'pages', '_app.jsx');
  const appFile = fs.existsSync(appTsx)
    ? appTsx
    : fs.existsSync(appJsx)
    ? appJsx
    : null;
  if (appFile && !fs.readFileSync(appFile, 'utf8').includes('globals.css')) {
    const rel = path
      .relative(path.dirname(appFile), targetCss)
      .replace(/\\/g, '/');
    const importLine = `import "${rel.startsWith('.') ? rel : './' + rel}";\n`;
    await fs.writeFile(
      appFile,
      importLine + fs.readFileSync(appFile, 'utf8'),
      'utf8'
    );
  }
}

function safeReadJSON(file: string): any | null {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch {
    return null;
  }
}
