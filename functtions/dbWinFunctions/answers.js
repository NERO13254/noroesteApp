async function allAnswer(params) {
    return new Promise((resolve, reject) => {
        db.all(params , (err, row)=>{
            if(err){
                reject(err.message);
            }else{
                resolve(row);
            }
        });
    })
}
async function runAnswer(params) {
    return new Promise((resolve, reject) => {
        db.run(params , err =>{
            if(err){
                reject(err.message);
            }else{
                resolve();
            }
        })
    })
}
//obtiene los nombres de las tablas de db
async function getNamesOfTables() {
    return await allAnswer(`SELECT name FROM sqlite_master WHERE type='table' ORDER BY name ASC`);
}

//obtiene los valores de la tabla seleccionada
async function getDataOfTheTable(table , limit ) {
    return await allAnswer(`SELECT * FROM ${table} WHERE 1 ORDER BY ID DESC LIMIT ${limit}`);
}

// actualiza el registro seleccionado
async function updateRegister(data , table , conditional){
    return await runAnswer(`UPDATE ${table} SET ${data} WHERE id='${conditional}' `);
}

module.exports = {
    getNamesOfTables,
    getDataOfTheTable,
    updateRegister
}