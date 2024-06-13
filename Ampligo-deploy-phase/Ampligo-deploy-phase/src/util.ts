import { exec } from "child_process";
import path, { resolve } from "path";
import { promises } from "stream";
// its promisified bcoz u awaited this in index.ts (functoion call ) so that the promise will make sure that the function will compleatly run 
export function buildProject(id:string){
    return new Promise((resolve)=>{
        // its will buid the react the HTML & CSS & JS
  const child=exec(`cd ${path.join(__dirname, `output/${id}`)} && npm install && npm run build `)
  child.stdout?.on('data',function(data){
    console.log('stdout: '+data)
  })
  child.stderr?.on('data',function(data){
    console.log('stdrr:'+data);
  })
  child.on('close',function(){
    resolve("");
  })
    })
}