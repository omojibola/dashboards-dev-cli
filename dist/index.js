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
const scaffold_1 = require("./utils/scaffold");
const shadcnChecker_1 = require("./utils/shadcnChecker");
const detectComponentsNeeded_1 = require("./utils/detectComponentsNeeded");
// --- Main CLI Logic ---
async function main() {
    var _a;
    const [, , cmd, arg] = process.argv;
    if (cmd !== 'add') {
        (0, logger_1.err)('❌ Unknown command. Usage: npx dashboard-studio add <category>/<dashboard-name>');
        process.exit(1);
    }
    if (!arg) {
        (0, logger_1.err)('❌ Missing argument. Usage: npx dashboard-studio add <category>/<dashboard-name>');
        process.exit(1);
    }
    // Check if a package.json file exists
    if (!fs_extra_1.default.existsSync(path_1.default.join(process.cwd(), 'package.json'))) {
        (0, logger_1.err)('❌ Not a valid project directory. A package.json file is required.');
        process.exit(1);
    }
    const [category, dashboardName] = arg.split('/');
    const templateRoot = path_1.default.join(__dirname, 'templates');
    if (!category || !dashboardName) {
        (0, logger_1.err)('❌ Invalid format. Use <category>/<dashboard-name>');
        process.exit(1);
    }
    // 1) Framework selection
    const frameworkMap = {
        'Next.js (React)': 'next',
        React: 'react',
        Vue: 'vue',
    };
    const frameworkChoices = Object.keys(frameworkMap);
    const { framework } = await inquirer_1.default.prompt([
        {
            type: 'list',
            name: 'framework',
            message: 'Framework?',
            choices: frameworkChoices,
        },
    ]);
    if (!framework)
        process.exit(1);
    const frameworkFolder = frameworkMap[framework];
    if (!frameworkFolder) {
        (0, logger_1.err)(`❌ Framework not supported`);
        process.exit(1);
    }
    const frameworkRoot = path_1.default.join(templateRoot, frameworkFolder);
    // 2) Resolve dashboard template
    const pageTemplate = path_1.default.join(frameworkRoot, category, `${dashboardName}.tsx`);
    if (!fs_extra_1.default.existsSync(pageTemplate)) {
        (0, logger_1.err)(`❌ Dashboard template not found in "${category}".\nAvailable: ${listAvailable(path_1.default.join(frameworkRoot, category))}`);
        process.exit(1);
    }
    // 3) Copy page into /pages or /app
    let targetDir;
    if (fs_extra_1.default.existsSync(path_1.default.join(process.cwd(), 'app'))) {
        targetDir = path_1.default.join(process.cwd(), 'app', dashboardName);
        await fs_extra_1.default.ensureDir(targetDir);
        fs_extra_1.default.copyFileSync(pageTemplate, path_1.default.join(targetDir, 'page.tsx'));
        (0, logger_1.ok)(`Page created: app/${dashboardName}/page.tsx`);
    }
    else {
        targetDir = path_1.default.join(process.cwd(), 'pages');
        await fs_extra_1.default.ensureDir(targetDir);
        fs_extra_1.default.copyFileSync(pageTemplate, path_1.default.join(targetDir, `${dashboardName}.tsx`));
        (0, logger_1.ok)(`Page created: pages/${dashboardName}.tsx`);
    }
    // 4) Ensure shadcn is initialized
    await (0, shadcnChecker_1.ensureShadcn)(process.cwd());
    // 5) Detect & add required shadcn components
    const comps = (_a = (0, detectComponentsNeeded_1.detectComponentsNeeded)(pageTemplate)) !== null && _a !== void 0 ? _a : [];
    if (comps.length > 0) {
        (0, logger_1.info)(`Detected needed shadcn components: ${comps.join(', ')}`);
        await (0, shadcnChecker_1.addShadcnComponents)(process.cwd(), comps);
    }
    // 6) Copy shared framework components
    const componentsSrc = path_1.default.join(frameworkRoot, 'components');
    const componentsDest = path_1.default.join(process.cwd(), 'components');
    (0, scaffold_1.copyIfMissing)(path_1.default.join(componentsSrc, 'dashboard-header.tsx'), path_1.default.join(componentsDest, 'dashboard-header.tsx'));
    // 7) Copy global lib
    const libSrc = path_1.default.join(templateRoot, 'lib');
    const libDest = path_1.default.join(process.cwd(), 'lib');
    (0, scaffold_1.copyIfMissing)(path_1.default.join(libSrc, 'utils.ts'), path_1.default.join(libDest, 'utils.ts'));
    // 8) Tailwind check & install
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
            (0, logger_1.info)('Installing TailwindCSS...');
            await (0, tailwind_1.installTailwind)(pm, process.cwd());
            (0, logger_1.ok)('TailwindCSS installed.');
        }
        else {
            (0, logger_1.err)('TailwindCSS is required for the styled dashboard. Exiting.');
            process.exit(1);
        }
    }
    // 9) Install runtime deps
    (0, logger_1.info)('Ensuring UI dependencies are installed…');
    const deps = [
        '@radix-ui/react-dialog',
        '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-avatar',
        'lucide-react',
        'clsx',
        'tailwind-merge',
    ];
    await (0, pm_1.addDeps)(pm, deps, false, process.cwd());
    (0, logger_1.ok)('Dependencies installed.');
    // 10) Final hints
    (0, logger_1.info)(`✅ Done. Start your dev server and visit: /${dashboardName}`);
    (0, logger_1.ok)('Happy hacking! 🚀');
}
// --- Helper Functions ---
function listAvailable(dir) {
    if (!fs_extra_1.default.existsSync(dir))
        return '(none)';
    return fs_extra_1.default
        .readdirSync(dir, { withFileTypes: true })
        .filter((d) => d.isFile() && d.name.endsWith('.tsx'))
        .map((f) => f.name.replace('.tsx', ''))
        .join(', ');
}
main().catch((e) => {
    (0, logger_1.err)((e === null || e === void 0 ? void 0 : e.message) || String(e));
    process.exit(1);
});
//# sourceMappingURL=index.js.map