import  express  from "express";
import cors from "cors"
import simpleGit from "simple-git";
import { generate } from "./utils";
import   path from "path";
import { getAllFiles } from "./file";
import { uploadFile } from "./aws";
import { createClient } from "redis";

//import * as fs from 'fs';

// const path1: string = 'C:\\Users\\HP\\Desktop\\vercel-1\\vercel-upload-phase\\dist\\output\\r4p8t\\.git\\config';

const subscriber=createClient();
subscriber.connect();
const publisher=  createClient();
publisher.connect();
const PORT = process.env.PORT || 3100;

// import cors from "cors"

 const app=express();
 app.use(express.json());// middleware 
//  app.use(cors())
app.post("/deploy",async (req,res)=>{
    const repourl=req.body.repourl;/// github url
   const id=generate();
   console.log(__dirname)
   await simpleGit().clone(repourl, path.join(__dirname, `output/${id}`));
   const files=getAllFiles(path.join(__dirname, `output/${id}`))
   
   files.forEach(async File=>{
     await uploadFile(File.slice(__dirname.slice.length + 1),File)
   })
    // got a id from upload phase and now u need to push into deploy phase via sqs queue and deploy phase will pull the id from sqs queue by redies   and deplay it ti internet  

 await new Promise((resolve)=>setTimeout(resolve,5000))
    publisher.lPush("build_queue",id)
    publisher.hSet("status", id , "uploaded")
    res.json({
        id:id
    })
});
app.get("/status", async (req,res)=>{
    const id=req.query.id;
    const responce= await subscriber.hGet("staus",id as string);
    res.json({
        status:responce
    })
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


