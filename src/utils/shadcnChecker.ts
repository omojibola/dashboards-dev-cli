import fs from 'fs-extra';
import path from 'path';
import { execa } from 'execa';
import inquirer from 'inquirer';
import { info, ok, err } from './logger';

export function hasShadcn(cwd: string): boolean {
  return fs.existsSync(path.join(cwd, 'components.json'));
}

export async function ensureShadcn(cwd: string) {
  if (!hasShadcn(cwd)) {
    const { shouldInit } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'shouldInit',
        message: 'shadcn/ui not found. Initialize it now?',
        default: true,
      },
    ]);

    if (!shouldInit) {
      err('❌ shadcn/ui is required for styled dashboards.');
      process.exit(1);
    }

    info('⚙️  Initializing shadcn/ui…');
    await execa('npx', ['shadcn-ui@latest', 'init'], { stdio: 'inherit', cwd });
    ok('✅ shadcn/ui initialized.');
  }
}

export async function addShadcnComponents(cwd: string, components: string[]) {
  info(`📦 Adding shadcn/ui components: ${components.join(', ')}`);
  await execa('npx', ['shadcn@latest', 'add', ...components], {
    stdio: 'inherit',
    cwd,
  });
  ok('✅ Components installed.');
}
