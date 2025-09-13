"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyIfMissing = copyIfMissing;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("./logger");
function copyIfMissing(src, dest) {
    if (!fs_extra_1.default.existsSync(dest)) {
        fs_extra_1.default.copySync(src, dest);
        (0, logger_1.ok)(`Added ${path_1.default.relative(process.cwd(), dest)}`);
    }
    else {
        (0, logger_1.info)(`Skipped (exists): ${path_1.default.relative(process.cwd(), dest)}`);
    }
}
//# sourceMappingURL=scaffold.js.map