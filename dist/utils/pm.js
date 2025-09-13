"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectPM = detectPM;
exports.addDeps = addDeps;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const execa_1 = require("execa");
function detectPM(cwd) {
    if (fs_extra_1.default.existsSync(path_1.default.join(cwd, 'pnpm-lock.yaml')))
        return 'pnpm';
    if (fs_extra_1.default.existsSync(path_1.default.join(cwd, 'yarn.lock')))
        return 'yarn';
    if (fs_extra_1.default.existsSync(path_1.default.join(cwd, 'bun.lockb')))
        return 'bun';
    return 'npm';
}
async function addDeps(pm, deps, dev = false, cwd = process.cwd()) {
    const stdio = 'inherit';
    if (!deps.length)
        return;
    if (pm === 'pnpm')
        await (0, execa_1.execa)('pnpm', ['add', dev ? '-D' : '', ...deps].filter(Boolean), {
            stdio,
            cwd,
        });
    else if (pm === 'yarn')
        await (0, execa_1.execa)('yarn', ['add', dev ? '-D' : '', ...deps].filter(Boolean), {
            stdio,
            cwd,
        });
    else if (pm === 'bun')
        await (0, execa_1.execa)('bun', ['add', dev ? '-d' : '', ...deps].filter(Boolean), {
            stdio,
            cwd,
        });
    else
        await (0, execa_1.execa)('npm', ['install', dev ? '-D' : '', ...deps].filter(Boolean), {
            stdio,
            cwd,
        });
}
//# sourceMappingURL=pm.js.map