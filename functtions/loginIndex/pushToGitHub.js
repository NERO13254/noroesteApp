const {exec} = require("child_process");

async function pushToGitHub(path) {
    return new Promise((resolve, reject) => {
        exec(
            ` git add copiaDb `,
        ) 

        exec('git commit -m "respaldo db"')

        exec("git push origin main " , (err , res)=>{
            if(err){
                console.log(err)
            }else{
                console.log("resuelto")
                resolve(res)
            }
        })
    });
}

module.exports = {
    pushToGitHub
}