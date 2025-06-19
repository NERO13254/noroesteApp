async function allAnswer(answer){
    return new Promise((resolve, reject) => {
        db.all(answer , (err, row)=>{
            if(err){
                console.log(err.message);
            }else{
                resolve(row);
            }
        })
    })
}

async function nameCtaCte(data) {
    try {
        return await allAnswer(`SELECT name FROM cuentascorrientes WHERE id = '${data}'`);
    } catch (error) {
        console.log(error.message)
    }
}

async function getDataVoucher(param) {
    try {
        return await allAnswer(`SELECT insideid,date, content, discount FROM remitos WHERE id ='${param}'`);
    } catch (error) {
        console.log(error.message);
    }
}

async function getLastVoucher() {
    try {
        return await allAnswer(`SELECT insideid,date, content, discount , owner FROM remitos WHERE 1 ORDER BY id DESC LIMIT 1`);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    nameCtaCte,
    getDataVoucher,
    getLastVoucher
}