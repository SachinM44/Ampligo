import { commandOptions, createClient } from "redis";
import { copyFinalDist, downloadS3Folder } from "./aws";
import { buildProject } from "./util";
const subscriber=createClient();
subscriber.connect();
async function main(){
    // its the infinetly running loop 
    while(1){
        const response=await subscriber.brPop(
            commandOptions({isolated:true}),
            'build-queue',
            0
        );
        console.log(response);
        //@ts-ignore
        const id=response.element
        await downloadS3Folder(`output/${id}`)
        await buildProject(id);
        await copyFinalDist(id);
        subscriber.hSet("status", id, "uploaded");
    }
}
main();