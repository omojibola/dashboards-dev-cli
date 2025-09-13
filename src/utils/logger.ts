import pc from 'picocolors';
export const info = (m: string) => console.log(pc.cyan('ℹ ') + m);
export const ok = (m: string) => console.log(pc.green('✅ ') + m);
export const warn = (m: string) => console.log(pc.yellow('⚠ ') + m);
export const err = (m: string) => console.error(pc.red('❌ ') + m);
