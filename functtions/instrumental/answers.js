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


async function insertNewTool(keys, values) {
    try {
        await runAnswer(`INSERT INTO instrumental (${keys})VALUES(${values})`);
    } catch (error) {
        console.log(error.message);
    }
}

async function getToolsDefault() {
    try {
        return await allAnswer(`SELECT * FROM instrumental WHERE 1 ORDER BY id DESC`);
    } catch (error) {
        console.log(err.message);
    }
}

async function updateNewTool(params , id) {
    try {
        await runAnswer(`UPDATE instrumental SET ${params} WHERE id ='${id}'`);
    } catch (error) {
        console.log(err.message);
    }
}

async function deleteTool(params) {
    try {
        await runAnswer(`DELETE FROM instrumental WHERE id='${params}'`);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    insertNewTool,
    getToolsDefault,
    updateNewTool,
    deleteTool
}