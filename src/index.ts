#!/usr/bin/env node
import inquirer from 'inquirer';
import path from 'path';
import fs from 'fs-extra';
import { info, ok, err } from './utils/logger';
import { detectPM } from './utils/pm';
import { hasTailwind, installTailwind } from './utils/tailwind';
import { addDeps } from './utils/pm';
import { copyIfMissing } from './utils/scaffold';
import { addShadcnComponents, ensureShadcn } from './utils/shadcnChecker';

async function main() {
  const [, , arg] = process.argv;
  const dashboardName = arg?.includes('/') ? arg.split('/')[1] : arg;

  if (!dashboardName) {
    err(
      'Usage: npx add-dashboard <org-or-scope>/<dashboard-name>  OR  npx add-dashboard <dashboard-name>'
    );
    process.exit(1);
  }

  // 1) Detect framework (MVP: Next.js only)
  const { framework } = await inquirer.prompt([
    {
      type: 'list',
      name: 'framework',
      message: 'Framework?',
      choices: ['Next.js (React)'],
    },
  ]);
  if (!framework) process.exit(1);

  // 2) Resolve template paths
  const templateRoot = path.join(__dirname, 'templates');
  const pageTemplate = path.join(templateRoot, 'next', `${dashboardName}.tsx`);
  if (!fs.existsSync(pageTemplate)) {
    err(
      `Dashboard "${dashboardName}" not found for Next.js.\nAvailable: ${listAvailable(
        path.join(templateRoot, 'next')
      )}`
    );
    process.exit(1);
  }

  // 3) Copy page into /pages if pages router, else /app if app router
  let targetDir: string;
  if (fs.existsSync(path.join(process.cwd(), 'app'))) {
    // App Router project
    targetDir = path.join(process.cwd(), 'app', dashboardName);
    await fs.ensureDir(targetDir);
    fs.copyFileSync(pageTemplate, path.join(targetDir, 'page.tsx'));
    ok(`Page created: app/${dashboardName}/page.tsx`);
  } else {
    // Pages Router project
    targetDir = path.join(process.cwd(), 'pages');
    await fs.ensureDir(targetDir);
    fs.copyFileSync(pageTemplate, path.join(targetDir, `${dashboardName}.tsx`));
    ok(`Page created: pages/${dashboardName}.tsx`);
  }

  const comps: string[] = detectComponentsNeeded(pageTemplate) ?? [];
  if (comps?.length > 0) {
    await ensureShadcn(process.cwd());
    await addShadcnComponents(process.cwd(), comps);
  }

  // 4) Ensure components/ui/* and lib/utils.ts
  const componentsSrc = path.join(templateRoot, 'components');
  const libSrc = path.join(templateRoot, 'lib');
  const componentsDest = path.join(process.cwd(), 'components', 'ui');
  const libDest = path.join(process.cwd(), 'lib');

  await fs.ensureDir(path.dirname(componentsDest));
  copyIfMissing(
    path.join(componentsSrc, 'card.tsx'),
    path.join(componentsDest, 'card.tsx')
  );
  copyIfMissing(
    path.join(componentsSrc, 'button.tsx'),
    path.join(componentsDest, 'button.tsx')
  );
  copyIfMissing(
    path.join(componentsSrc, 'dialog.tsx'),
    path.join(componentsDest, 'dialog.tsx')
  );

  await fs.ensureDir(libDest);
  copyIfMissing(path.join(libSrc, 'utils.ts'), path.join(libDest, 'utils.ts'));

  // 5) Tailwind check & prompt install
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

  await ensureShadcn(process.cwd());
  await addShadcnComponents(process.cwd(), ['card', 'button', 'dialog']);

  // 6) Runtime deps (Radix + utils)
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

  // 7) Final hints
  info(`Done. Start your dev server and visit: /${dashboardName}`);
  ok('Happy hacking! 🚀');
}

function listAvailable(dir: string): string {
  if (!fs.existsSync(dir)) return '(none)';
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.tsx'))
    .map((f) => f.replace('.tsx', ''))
    .join(', ');
}

main().catch((e) => {
  err(e?.message || String(e));
  process.exit(1);
});
function detectComponentsNeeded(pageTemplate: string) {
  throw new Error('Function not implemented.');
}
