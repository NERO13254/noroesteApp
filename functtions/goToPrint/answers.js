let idCtaCte = localStorage.getItem("idCtaCte");
// obtiene la base de datos
const dbRed             = require("../../db/dbRed");
const db                = dbRed.getDb(__dirname);
// funcion para ejecutar db.all
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

async function getNameCtaCte() {
    try {
        // obtine el nombre de la cuenta corriente en base a su id del localStorage
        let getData = await allAnswer(`SELECT name FROM cuentascorrientes WHERE id ='${idCtaCte}'`);
        return getData ;
    } catch (error) {
        console.log(error);
    }
}

async function getOrders() {
    try {
        // obtine los movimientos  de la cta cte 
        let getData = await allAnswer(`SELECT date , obs , debit , pay, total , ordernum FROM payordebit WHERE owner = '${idCtaCte}' ORDER BY id DESC LIMIT 500 `);
        return getData;
    } catch (error) {
        console.log(error);
    }
}

module.exports  = {
    getNameCtaCte,
    getOrders
}