"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasTailwind = hasTailwind;
exports.installTailwind = installTailwind;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const execa_1 = require("execa");
const pm_1 = require("./pm");
const logger_1 = require("./logger");
function hasTailwind(cwd) {
    const pkg = safeReadJSON(path_1.default.join(cwd, 'package.json'));
    const deps = {
        ...((pkg === null || pkg === void 0 ? void 0 : pkg.dependencies) || {}),
        ...((pkg === null || pkg === void 0 ? void 0 : pkg.devDependencies) || {}),
    };
    if (deps['tailwindcss'])
        return true;
    return (fs_extra_1.default.existsSync(path_1.default.join(cwd, 'tailwind.config.js')) ||
        fs_extra_1.default.existsSync(path_1.default.join(cwd, 'tailwind.config.ts')));
}
async function installTailwind(pm, cwd = process.cwd()) {
    (0, logger_1.info)('Installing TailwindCSS (+ PostCSS & Autoprefixer)…');
    await (0, pm_1.addDeps)(pm, ['tailwindcss', 'postcss', 'autoprefixer'], true, cwd);
    // npx tailwindcss init -p
    await (0, execa_1.execa)(pm === 'npm' ? 'npx' : pm, pm === 'npm'
        ? ['tailwindcss', 'init', '-p']
        : ['tailwindcss', 'init', '-p'], { stdio: 'inherit', cwd });
    await tweakTailwindConfig(cwd);
    await ensureTailwindCSSImported(cwd);
    (0, logger_1.ok)('Tailwind installed & configured.');
}
async function tweakTailwindConfig(cwd) {
    const cfgJs = path_1.default.join(cwd, 'tailwind.config.js');
    const cfgTs = path_1.default.join(cwd, 'tailwind.config.ts');
    const cfg = fs_extra_1.default.existsSync(cfgTs) ? cfgTs : cfgJs;
    if (!fs_extra_1.default.existsSync(cfg))
        return;
    let content = await fs_extra_1.default.readFile(cfg, 'utf8');
    content = content.replace(/content:\s*\[.*?\],?/s, `content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}"],`);
    // add a basic theme extension (optional)
    await fs_extra_1.default.writeFile(cfg, content, 'utf8');
}
async function ensureTailwindCSSImported(cwd) {
    // Prefer app router, else pages router
    const appCss = path_1.default.join(cwd, 'app', 'globals.css');
    const pagesCssDir = path_1.default.join(cwd, 'styles');
    const pagesCss = path_1.default.join(pagesCssDir, 'globals.css');
    let targetCss;
    if (fs_extra_1.default.existsSync(appCss))
        targetCss = appCss;
    else {
        await fs_extra_1.default.ensureDir(pagesCssDir);
        targetCss = pagesCss;
    }
    let current = fs_extra_1.default.existsSync(targetCss)
        ? await fs_extra_1.default.readFile(targetCss, 'utf8')
        : '';
    const directives = [
        '@tailwind base;',
        '@tailwind components;',
        '@tailwind utilities;',
    ];
    const missing = directives.filter((d) => !current.includes(d));
    if (missing.length) {
        current = `${missing.join('\n')}\n` + current;
        await fs_extra_1.default.writeFile(targetCss, current, 'utf8');
    }
    // If pages router, ensure _app imports the css
    const appTsx = path_1.default.join(cwd, 'pages', '_app.tsx');
    const appJsx = path_1.default.join(cwd, 'pages', '_app.jsx');
    const appFile = fs_extra_1.default.existsSync(appTsx)
        ? appTsx
        : fs_extra_1.default.existsSync(appJsx)
            ? appJsx
            : null;
    if (appFile && !fs_extra_1.default.readFileSync(appFile, 'utf8').includes('globals.css')) {
        const rel = path_1.default
            .relative(path_1.default.dirname(appFile), targetCss)
            .replace(/\\/g, '/');
        const importLine = `import "${rel.startsWith('.') ? rel : './' + rel}";\n`;
        await fs_extra_1.default.writeFile(appFile, importLine + fs_extra_1.default.readFileSync(appFile, 'utf8'), 'utf8');
    }
}
function safeReadJSON(file) {
    try {
        return JSON.parse(fs_extra_1.default.readFileSync(file, 'utf8'));
    }
    catch {
        return null;
    }
}
//# sourceMappingURL=tailwind.js.map