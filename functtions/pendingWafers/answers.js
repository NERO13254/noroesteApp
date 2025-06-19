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
// selecciona las obleas del día de hoy o las que no fueron seleccionadas
async function collectWafersForDate(date) {
    try {
        return await allAnswer(`SELECT * FROM pendingwafers WHERE date ='${date}'`);
    } catch (error) {
        console.log(error.message);
    }
}
// inserta una oblea
async function insertWafer(params) {
    try {
        return await runAnswer(`INSERT INTO pendingwafers ${params}`);
    } catch (error) {
        console.log(error.message);
    }
}
// actualiza la oblea
async function updateWafer(params , idWafer) {
    try {
        return await runAnswer(`UPDATE pendingwafers SET ${params} WHERE id ='${idWafer}' `);
    } catch (error) {
        console.log(error.message);
    }
}

async function getLastId() {
    try {
        return await allAnswer("SELECT id FROM pendingwafers WHERE 1 ORDER BY id DESC LIMIT 1");
    } catch (error) {
        console.log(error.message);
    }
}
async function deleteWaferAnswer(params) {
    try {
        return await runAnswer(`DELETE FROM pendingwafers WHERE id ='${params}'`)
    } catch (error) {
        console.log(error.message)
    }
}

async function pendingLastestDayWafers() {
    try {
        let newDate = new Date();
        let dateNow = `${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}`;
        return await allAnswer(`SELECT * FROM pendingwafers WHERE branded='' AND date !='${dateNow}'`);
    } catch (error) {
        console.log(error.message);
    }
}

async function allWafers() {
    try {
        return await allAnswer(`SELECT * FROM pendingwafers WHERE 1 ORDER BY id ASC`);
    } catch (error) {
        console.log(error.message);
    }
}
module.exports = {
    collectWafersForDate,
    insertWafer,
    updateWafer,
    getLastId,
    deleteWaferAnswer,
    pendingLastestDayWafers,
    allWafers
}