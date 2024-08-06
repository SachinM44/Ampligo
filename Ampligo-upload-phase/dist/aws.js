"use strict";
///logic to upload the file to the aws s3 or cloudeflare R2 is given here 
//sdl software develepment kit 
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
exports.uploadFile = void 0;
//s3 bucket or r2 cloudeflare bucket 
// Import necessary modules
const aws_sdk_1 = require("aws-sdk");
const fs_1 = __importDefault(require("fs"));
// Create an S3 instance
const s3 = new aws_sdk_1.S3({
    accessKeyId: "", // add ur s3/r2 accesskey here 
    secretAccessKey: "", // add ur s3/r2 secretAccess key here 
    endpoint: "", // add ur endpoint url here 
});
// Define the uploadFile function
const uploadFile = (filename, localFilePath) => __awaiter(void 0, void 0, void 0, function* () {
    const fileContent = fs_1.default.readdirSync(localFilePath);
    const response = yield s3.upload({
        Body: fileContent,
        Bucket: "vercel",
        Key: filename,
    }).promise();
    console.log(response);
});
exports.uploadFile = uploadFile;
