"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.err = exports.warn = exports.ok = exports.info = void 0;
const picocolors_1 = __importDefault(require("picocolors"));
const info = (m) => console.log(picocolors_1.default.cyan('ℹ ') + m);
exports.info = info;
const ok = (m) => console.log(picocolors_1.default.green('✅ ') + m);
exports.ok = ok;
const warn = (m) => console.log(picocolors_1.default.yellow('⚠ ') + m);
exports.warn = warn;
const err = (m) => console.error(picocolors_1.default.red('❌ ') + m);
exports.err = err;
//# sourceMappingURL=logger.js.map