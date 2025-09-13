import fs from 'fs';

export function detectComponentsNeeded(templatePath: string): string[] {
  const content = fs.readFileSync(templatePath, 'utf8');
  const matches = [
    ...content.matchAll(/from\s+["']@\/components\/ui\/(.*?)["']/g),
  ];
  return matches.map((m) => m[1]).filter((c): c is string => Boolean(c));
}
