async function allAnswer(params) {
    return new Promise((resolve) => {
        db.all(params , (err, row)=>{
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
        });
    }) 
}

async function getDataCilinder(params) {
    try {
        return await allAnswer(`SELECT * FROM cilindersaved WHERE id ='${params}' `)
    } catch (error) {
        console.log(error.message);
    }
}

async function updateCilinderData(answerDataContent ,  idCil) {
    try {
        return await runAnswer(`UPDATE cilindersaved SET ${answerDataContent},finished='SI' WHERE id='${idCil}' `)
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getDataCilinder,
    updateCilinderData
}