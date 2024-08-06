"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildProject = void 0;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
// its promisified bcoz u awaited this in index.ts (functoion call ) so that the promise will make sure that the function will compleatly run 
function buildProject(id) {
    return new Promise((resolve) => {
        var _a, _b;
        // its will buid the react the HTML & CSS & JS
        const child = (0, child_process_1.exec)(`cd ${path_1.default.join(__dirname, `output/${id}`)} && npm install && npm run build `);
        (_a = child.stdout) === null || _a === void 0 ? void 0 : _a.on('data', function (data) {
            console.log('stdout: ' + data);
        });
        (_b = child.stderr) === null || _b === void 0 ? void 0 : _b.on('data', function (data) {
            console.log('stdrr:' + data);
        });
        child.on('close', function () {
            resolve("");
        });
    });
}
exports.buildProject = buildProject;
