import fs from 'fs-extra';
import path from 'path';
import { execa } from 'execa';

export type PM = 'pnpm' | 'yarn' | 'bun' | 'npm';

export function detectPM(cwd: string): PM {
  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn';
  if (fs.existsSync(path.join(cwd, 'bun.lockb'))) return 'bun';
  return 'npm';
}

export async function addDeps(
  pm: PM,
  deps: string[],
  dev = false,
  cwd = process.cwd()
) {
  const stdio = 'inherit' as const;
  if (!deps.length) return;
  if (pm === 'pnpm')
    await execa('pnpm', ['add', dev ? '-D' : '', ...deps].filter(Boolean), {
      stdio,
      cwd,
    });
  else if (pm === 'yarn')
    await execa('yarn', ['add', dev ? '-D' : '', ...deps].filter(Boolean), {
      stdio,
      cwd,
    });
  else if (pm === 'bun')
    await execa('bun', ['add', dev ? '-d' : '', ...deps].filter(Boolean), {
      stdio,
      cwd,
    });
  else
    await execa('npm', ['install', dev ? '-D' : '', ...deps].filter(Boolean), {
      stdio,
      cwd,
    });
}
