import fs from 'fs-extra';
import path from 'path';
import { ok, info } from './logger';

export function copyIfMissing(src: string, dest: string) {
  if (!fs.existsSync(dest)) {
    fs.copySync(src, dest);
    ok(`Added ${path.relative(process.cwd(), dest)}`);
  } else {
    info(`Skipped (exists): ${path.relative(process.cwd(), dest)}`);
  }
}
