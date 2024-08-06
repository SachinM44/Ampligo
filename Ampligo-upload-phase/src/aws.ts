///logic to upload the file to the aws s3 or cloudeflare R2 is given here 
//sdl software develepment kit 

//s3 bucket or r2 cloudeflare bucket 

 // Import necessary modules
import { S3 } from "aws-sdk";
import  fs from "fs" 
// Create an S3 instance
const s3 = new S3({
    accessKeyId: "",// add ur s3/r2 accesskey here 
    secretAccessKey: "",// add ur s3/r2 secretAccess key here 
    endpoint:"",// add ur endpoint url here 
});

// Define the uploadFile function
export const uploadFile = async (filename: string, localFilePath: string) => {
    const fileContent = fs.readdirSync(localFilePath); 
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "vercel", 
        Key: filename, 
    }).promise();
    console.log(response); 
};
