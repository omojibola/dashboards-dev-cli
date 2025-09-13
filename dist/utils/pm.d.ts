export type PM = 'pnpm' | 'yarn' | 'bun' | 'npm';
export declare function detectPM(cwd: string): PM;
export declare function addDeps(pm: PM, deps: string[], dev?: boolean, cwd?: string): Promise<void>;
//# sourceMappingURL=pm.d.ts.map