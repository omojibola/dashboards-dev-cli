#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const logger_1 = require("./utils/logger");
const pm_1 = require("./utils/pm");
const tailwind_1 = require("./utils/tailwind");
const pm_2 = require("./utils/pm");
const scaffold_1 = require("./utils/scaffold");
const shadcnChecker_1 = require("./utils/shadcnChecker");
async function main() {
    var _a;
    const [, , arg] = process.argv;
    const dashboardName = (arg === null || arg === void 0 ? void 0 : arg.includes('/')) ? arg.split('/')[1] : arg;
    if (!dashboardName) {
        (0, logger_1.err)('Usage: npx add-dashboard <org-or-scope>/<dashboard-name>  OR  npx add-dashboard <dashboard-name>');
        process.exit(1);
    }
    // 1) Detect framework (MVP: Next.js only)
    const { framework } = await inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'framework',
            message: 'Framework?',
            choices: ['Next.js (React)'],
        },
    ]);
    if (!framework)
        process.exit(1);
    // 2) Resolve template paths
    const templateRoot = path_1.default.join(__dirname, 'templates');
    const pageTemplate = path_1.default.join(templateRoot, 'next', `${dashboardName}.tsx`);
    if (!fs_extra_1.default.existsSync(pageTemplate)) {
        (0, logger_1.err)(`Dashboard "${dashboardName}" not found for Next.js.\nAvailable: ${listAvailable(path_1.default.join(templateRoot, 'next'))}`);
        process.exit(1);
    }
    // 3) Copy page into /pages if pages router, else /app if app router
    let targetDir;
    if (fs_extra_1.default.existsSync(path_1.default.join(process.cwd(), 'app'))) {
        // App Router project
        targetDir = path_1.default.join(process.cwd(), 'app', dashboardName);
        await fs_extra_1.default.ensureDir(targetDir);
        fs_extra_1.default.copyFileSync(pageTemplate, path_1.default.join(targetDir, 'page.tsx'));
        (0, logger_1.ok)(`Page created: app/${dashboardName}/page.tsx`);
    }
    else {
        // Pages Router project
        targetDir = path_1.default.join(process.cwd(), 'pages');
        await fs_extra_1.default.ensureDir(targetDir);
        fs_extra_1.default.copyFileSync(pageTemplate, path_1.default.join(targetDir, `${dashboardName}.tsx`));
        (0, logger_1.ok)(`Page created: pages/${dashboardName}.tsx`);
    }
    const comps = (_a = detectComponentsNeeded(pageTemplate)) !== null && _a !== void 0 ? _a : [];
    if ((comps === null || comps === void 0 ? void 0 : comps.length) > 0) {
        await (0, shadcnChecker_1.ensureShadcn)(process.cwd());
        await (0, shadcnChecker_1.addShadcnComponents)(process.cwd(), comps);
    }
    // 4) Ensure components/ui/* and lib/utils.ts
    const componentsSrc = path_1.default.join(templateRoot, 'components');
    const libSrc = path_1.default.join(templateRoot, 'lib');
    const componentsDest = path_1.default.join(process.cwd(), 'components', 'ui');
    const libDest = path_1.default.join(process.cwd(), 'lib');
    await fs_extra_1.default.ensureDir(path_1.default.dirname(componentsDest));
    (0, scaffold_1.copyIfMissing)(path_1.default.join(componentsSrc, 'card.tsx'), path_1.default.join(componentsDest, 'card.tsx'));
    (0, scaffold_1.copyIfMissing)(path_1.default.join(componentsSrc, 'button.tsx'), path_1.default.join(componentsDest, 'button.tsx'));
    (0, scaffold_1.copyIfMissing)(path_1.default.join(componentsSrc, 'dialog.tsx'), path_1.default.join(componentsDest, 'dialog.tsx'));
    await fs_extra_1.default.ensureDir(libDest);
    (0, scaffold_1.copyIfMissing)(path_1.default.join(libSrc, 'utils.ts'), path_1.default.join(libDest, 'utils.ts'));
    // 5) Tailwind check & prompt install
    const pm = (0, pm_1.detectPM)(process.cwd());
    if (!(0, tailwind_1.hasTailwind)(process.cwd())) {
        const { should } = await inquirer_1.default.prompt([
            {
                type: 'confirm',
                name: 'should',
                message: 'TailwindCSS is required. Install & configure automatically?',
                default: true,
            },
        ]);
        if (should) {
            await (0, tailwind_1.installTailwind)(pm, process.cwd());
        }
        else {
            (0, logger_1.err)('TailwindCSS is required for the styled dashboard. Exiting.');
            process.exit(1);
        }
    }
    await (0, shadcnChecker_1.ensureShadcn)(process.cwd());
    await (0, shadcnChecker_1.addShadcnComponents)(process.cwd(), ['card', 'button', 'dialog']);
    // 6) Runtime deps (Radix + utils)
    (0, logger_1.info)('Ensuring UI dependencies are installed…');
    await (0, pm_2.addDeps)(pm, [
        '@radix-ui/react-dialog',
        '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-avatar',
        'lucide-react',
        'clsx',
        'tailwind-merge',
    ], false, process.cwd());
    (0, logger_1.ok)('Dependencies installed.');
    // 7) Final hints
    (0, logger_1.info)(`Done. Start your dev server and visit: /${dashboardName}`);
    (0, logger_1.ok)('Happy hacking! 🚀');
}
function listAvailable(dir) {
    if (!fs_extra_1.default.existsSync(dir))
        return '(none)';
    return fs_extra_1.default
        .readdirSync(dir)
        .filter((f) => f.endsWith('.tsx'))
        .map((f) => f.replace('.tsx', ''))
        .join(', ');
}
main().catch((e) => {
    (0, logger_1.err)((e === null || e === void 0 ? void 0 : e.message) || String(e));
    process.exit(1);
});
function detectComponentsNeeded(pageTemplate) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=index.js.map