"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const simple_git_1 = __importDefault(require("simple-git"));
const utils_1 = require("./utils");
const path_1 = __importDefault(require("path"));
const file_1 = require("./file");
const aws_1 = require("./aws");
const redis_1 = require("redis");
//import * as fs from 'fs';
// const path1: string = 'C:\\Users\\HP\\Desktop\\vercel-1\\vercel-upload-phase\\dist\\output\\r4p8t\\.git\\config';
const subscriber = (0, redis_1.createClient)();
subscriber.connect();
const publisher = (0, redis_1.createClient)();
publisher.connect();
const PORT = process.env.PORT || 3100;
// import cors from "cors"
const app = (0, express_1.default)();
app.use(express_1.default.json()); // middleware 
//  app.use(cors())
app.post("/deploy", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repourl = req.body.repourl; /// github url
    const id = (0, utils_1.generate)();
    console.log(__dirname);
    yield (0, simple_git_1.default)().clone(repourl, path_1.default.join(__dirname, `output/${id}`));
    const files = (0, file_1.getAllFiles)(path_1.default.join(__dirname, `output/${id}`));
    files.forEach((File) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, aws_1.uploadFile)(File.slice(__dirname.slice.length + 1), File);
    }));
    // got a id from upload phase and now u need to push into deploy phase via sqs queue and deploy phase will pull the id from sqs queue by redies   and deplay it ti internet  
    yield new Promise((resolve) => setTimeout(resolve, 5000));
    publisher.lPush("build_queue", id);
    publisher.hSet("status", id, "uploaded");
    res.json({
        id: id
    });
}));
app.get("/status", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.query.id;
    const responce = yield subscriber.hGet("staus", id);
    res.json({
        status: responce
    });
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
