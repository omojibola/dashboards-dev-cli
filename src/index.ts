#!/usr/bin/env node
import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs-extra';
import { info, ok, err } from './utils/logger';
import { detectPM, addDeps } from './utils/pm';
import { hasTailwind, installTailwind } from './utils/tailwind';
import { copyIfMissing } from './utils/scaffold';
import { addShadcnComponents, ensureShadcn } from './utils/shadcnChecker';
import { detectComponentsNeeded } from './utils/detectComponentsNeeded';

async function main() {
  const [, , cmd, arg] = process.argv;

  if (cmd !== 'add') {
    err(
      '❌ Unknown command. Usage: npx dashboard-studio add <category>/<dashboard-name>'
    );
    process.exit(1);
  }

  if (!arg) {
    err(
      '❌ Missing argument. Usage: npx dashboard-studio add <category>/<dashboard-name>'
    );
    process.exit(1);
  }

  const [category, dashboardName] = arg.split('/');
  const templateRoot = path.join(__dirname, 'templates');

  if (!category || !dashboardName) {
    err('❌ Invalid format. Use <category>/<dashboard-name>');
    process.exit(1);
  }

  // 1) Framework selection
  const frameworkMap: Record<string, string> = {
    'Next.js (React)': 'next',
    React: 'react',
    Vue: 'vue',
  };

  const { framework } = await inquirer.prompt([
    {
      type: 'list',
      name: 'framework',
      message: 'Framework?',
      choices: Object.keys(frameworkMap),
    },
  ]);
  if (!framework) process.exit(1);

  const frameworkFolder = frameworkMap[framework];
  if (!frameworkFolder) {
    err(`❌ Framework not supported`);
    process.exit(1);
  }
  const frameworkRoot = path.join(templateRoot, frameworkFolder);

  // 2) Resolve dashboard template
  const pageTemplate = path.join(
    frameworkRoot,
    category,
    `${dashboardName}.tsx`
  );

  if (!fs.existsSync(pageTemplate)) {
    err(
      `❌ Dashboard "${dashboardName}" not found in "${category}".\nAvailable: ${listAvailable(
        path.join(frameworkRoot, category)
      )}`
    );
    process.exit(1);
  }

  // 3) Copy page into /pages or /app
  let targetDir: string;
  if (fs.existsSync(path.join(process.cwd(), 'app'))) {
    targetDir = path.join(process.cwd(), 'app', dashboardName);
    await fs.ensureDir(targetDir);
    fs.copyFileSync(pageTemplate, path.join(targetDir, 'page.tsx'));
    ok(`Page created: app/${dashboardName}/page.tsx`);
  } else {
    targetDir = path.join(process.cwd(), 'pages');
    await fs.ensureDir(targetDir);
    fs.copyFileSync(pageTemplate, path.join(targetDir, `${dashboardName}.tsx`));
    ok(`Page created: pages/${dashboardName}.tsx`);
  }

  // 4) Detect & install required shadcn components
  const comps: string[] = detectComponentsNeeded(pageTemplate) ?? [];
  if (comps.length > 0) {
    await ensureShadcn(process.cwd());
    await addShadcnComponents(process.cwd(), comps);
  }

  // 5) Copy shared framework components
  const componentsSrc = path.join(frameworkRoot, 'components');
  const componentsDest = path.join(process.cwd(), 'components');
  await fs.ensureDir(componentsDest);

  copyIfMissing(
    path.join(componentsSrc, 'dashboard-header.tsx'),
    path.join(componentsDest, 'dashboard-header.tsx')
  );

  // 6) Copy global lib
  const libSrc = path.join(templateRoot, 'lib');
  const libDest = path.join(process.cwd(), 'lib');
  await fs.ensureDir(libDest);

  copyIfMissing(path.join(libSrc, 'utils.ts'), path.join(libDest, 'utils.ts'));

  // 7) Tailwind check & install
  const pm = detectPM(process.cwd());
  if (!hasTailwind(process.cwd())) {
    const { should } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'should',
        message: 'TailwindCSS is required. Install & configure automatically?',
        default: true,
      },
    ]);
    if (should) {
      await installTailwind(pm, process.cwd());
    } else {
      err('TailwindCSS is required for the styled dashboard. Exiting.');
      process.exit(1);
    }
  }

  // 8) Ensure shadcn init
  await ensureShadcn(process.cwd());

  // 9) Install runtime deps
  info('Ensuring UI dependencies are installed…');
  await addDeps(
    pm,
    [
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-avatar',
      'lucide-react',
      'clsx',
      'tailwind-merge',
    ],
    false,
    process.cwd()
  );
  ok('Dependencies installed.');

  // 10) Final hints
  info(`✅ Done. Start your dev server and visit: /${dashboardName}`);
  ok('Happy hacking! 🚀');
}

function listAvailable(dir: string): string {
  if (!fs.existsSync(dir)) return '(none)';
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && d.name.endsWith('.tsx'))
    .map((f) => f.name.replace('.tsx', ''))
    .join(', ');
}

main().catch((e) => {
  err(e?.message || String(e));
  process.exit(1);
});
