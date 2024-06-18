"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHtmlTemplate = void 0;
const fs_1 = __importDefault(require("fs"));
// Function to read the HTML template
function getHtmlTemplate(filePath, replacements) {
    let html = fs_1.default.readFileSync(filePath, "utf8");
    for (const key in replacements) {
        html = html.replace(new RegExp(`{{${key}}}`, "g"), replacements[key]);
    }
    return html;
}
exports.getHtmlTemplate = getHtmlTemplate;
//# sourceMappingURL=template.js.map