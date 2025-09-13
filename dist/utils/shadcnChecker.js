"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasShadcn = hasShadcn;
exports.ensureShadcn = ensureShadcn;
exports.addShadcnComponents = addShadcnComponents;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const execa_1 = require("execa");
const inquirer_1 = __importDefault(require("inquirer"));
const logger_1 = require("./logger");
function hasShadcn(cwd) {
    return fs_extra_1.default.existsSync(path_1.default.join(cwd, 'components.json'));
}
async function ensureShadcn(cwd) {
    if (!hasShadcn(cwd)) {
        const { shouldInit } = await inquirer_1.default.prompt([
            {
                type: 'confirm',
                name: 'shouldInit',
                message: 'shadcn/ui not found. Initialize it now?',
                default: true,
            },
        ]);
        if (!shouldInit) {
            (0, logger_1.err)('❌ shadcn/ui is required for styled dashboards.');
            process.exit(1);
        }
        (0, logger_1.info)('⚙️  Initializing shadcn/ui…');
        await (0, execa_1.execa)('npx', ['shadcn-ui@latest', 'init'], { stdio: 'inherit', cwd });
        (0, logger_1.ok)('✅ shadcn/ui initialized.');
    }
}
async function addShadcnComponents(cwd, components) {
    (0, logger_1.info)(`📦 Adding shadcn/ui components: ${components.join(', ')}`);
    await (0, execa_1.execa)('npx', ['shadcn@latest', 'add', ...components], {
        stdio: 'inherit',
        cwd,
    });
    (0, logger_1.ok)('✅ Components installed.');
}
//# sourceMappingURL=shadcnChecker.js.map