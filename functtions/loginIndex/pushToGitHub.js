const {exec} = require("child_process");

async function pushToGitHub(path) {
    return new Promise((resolve, reject) => {
        exec(
            `cd ${path} && git add . && git commit -m "respaldo db" && git push `,
            (err , std , stderr)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log("registro actualizado");
                    resolve(std);
                }
            }
        ) 
    });
}

module.exports = {
    pushToGitHub
}