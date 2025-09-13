"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectComponentsNeeded = detectComponentsNeeded;
const fs_1 = __importDefault(require("fs"));
function detectComponentsNeeded(templatePath) {
    const content = fs_1.default.readFileSync(templatePath, 'utf8');
    const matches = [
        ...content.matchAll(/from\s+["']@\/components\/ui\/(.*?)["']/g),
    ];
    return matches.map((m) => m[1]).filter((c) => Boolean(c));
}
//# sourceMappingURL=detectComponentsNeeded.js.map