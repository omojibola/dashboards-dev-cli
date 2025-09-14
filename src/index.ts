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

// --- Main CLI Logic ---
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

  // Check if a package.json file exists
  if (!fs.existsSync(path.join(process.cwd(), 'package.json'))) {
    err('❌ Not a valid project directory. A package.json file is required.');
    process.exit(1);
  }

  const [category, dashboardName] = arg.split('/');
  const templateRoot = path.join(__dirname, 'templates');

  if (!category || !dashboardName) {
    err('❌ Invalid format. Use <category>/<dashboard-name>');
    process.exit(1);
  }

  // 1) Framework selection
  const frameworkMap = {
    'Next.js (React)': 'next',
    React: 'react',
    Vue: 'vue',
  };

  const frameworkChoices = Object.keys(frameworkMap) as Array<
    keyof typeof frameworkMap
  >;
  const { framework } = await inquirer.prompt<{
    framework: keyof typeof frameworkMap;
  }>([
    {
      type: 'list',
      name: 'framework',
      message: 'Framework?',
      choices: frameworkChoices,
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
      `❌ Dashboard template not found in "${category}".\nAvailable: ${listAvailable(
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

  // 4) Ensure shadcn is initialized
  await ensureShadcn(process.cwd());

  // 5) Detect & add required shadcn components
  const comps = detectComponentsNeeded(pageTemplate) ?? [];
  if (comps.length > 0) {
    info(`Detected needed shadcn components: ${comps.join(', ')}`);
    await addShadcnComponents(process.cwd(), comps);
  }

  // 6) Copy shared framework components
  const componentsSrc = path.join(frameworkRoot, 'components');
  const componentsDest = path.join(process.cwd(), 'components');
  copyIfMissing(
    path.join(componentsSrc, 'dashboard-header.tsx'),
    path.join(componentsDest, 'dashboard-header.tsx')
  );

  // 7) Copy global lib
  const libSrc = path.join(templateRoot, 'lib');
  const libDest = path.join(process.cwd(), 'lib');
  copyIfMissing(path.join(libSrc, 'utils.ts'), path.join(libDest, 'utils.ts'));

  // 8) Tailwind check & install
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
      info('Installing TailwindCSS...');
      await installTailwind(pm, process.cwd());
      ok('TailwindCSS installed.');
    } else {
      err('TailwindCSS is required for the styled dashboard. Exiting.');
      process.exit(1);
    }
  }

  // 9) Install runtime deps
  info('Ensuring UI dependencies are installed…');
  const deps = [
    '@radix-ui/react-dialog',
    '@radix-ui/react-dropdown-menu',
    '@radix-ui/react-avatar',
    'lucide-react',
    'clsx',
    'tailwind-merge',
  ];
  await addDeps(pm, deps, false, process.cwd());
  ok('Dependencies installed.');

  // 10) Final hints
  info(`✅ Done. Start your dev server and visit: /${dashboardName}`);
  ok('Happy hacking! 🚀');
}

// --- Helper Functions ---
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
