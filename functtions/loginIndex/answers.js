async function allAnswer(answer){
    return new Promise((resolve, reject) => {
        db.all(answer , (err , row)=>{
            if(err){
                console.log(err.message);
            }else{
                resolve(row);
            }
        })
    })
}
async function runAnswer(answer){
    return new Promise((resolve, reject) => {
        db.run(answer , (err)=>{
            if(err){
                console.log(err.message);
            }else{
                resolve();
            }
        })
    })
}

async function getToolsInfo() {
    try {
        return await allAnswer(`SELECT expiredDate , toolName FROM instrumental WHERE 1`);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports={
    getToolsInfo
}