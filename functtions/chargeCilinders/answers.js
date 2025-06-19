async function allAnswer(answer){
    return new Promise((resolve, reject) => {
        db.all(answer , (err , row)=>{
            if(err){
                console.log(err.message);
            }else{
                resolve(row);
            }
        });
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

async function getProvincesNames() {
    try {
        return await allAnswer("SELECT name FROM provincia WHERE 1");
    } catch (error) {
        console.log(error.message);
    }
}
async function getClientData(params) {
    try {
        return await allAnswer(`SELECT idtype , dni , nameandsurname , country , provincia , cp , direccion , domain FROM cilindersaved WHERE id = '${params}' `);
    } catch (error) {
        console.log(error.message);
    }
}
async function searchClientInDbClients(params) {
    try {
        return await allAnswer(`SELECT idtype , dni , nameandsurname , country, provincia  , cp ,direccion ,domain  FROM clients WHERE dni = '${params}'  `);
    } catch (error) {
        console.log(error.message);
    }
}
async function getWorkShopName(params) {
    try {
        return await allAnswer (`SELECT workshop FROM tdm WHERE id = '${params}' `);
    } catch (error) {
        console.log(error.message);
    }
}

async function updateClientDataFunc(params , paramsDni) {
    try {
        return await runAnswer(`UPDATE clients SET ${params} WHERE dni ='${paramsDni}'`);
    } catch (error) {
        console.log(error.message);
    }
}

async function insertClientData(keys , values) {
    try {
        return await runAnswer(`INSERT INTO clients (${keys})VALUES(${values})`);
    } catch (error) {
        console.log(error.message);
    }
}
async function getLastCevigas() {
    try {
        return await allAnswer(`SELECT idcevigas, idinter FROM clients WHERE 1 ORDER BY id DESC LIMIT 1`);
    } catch (error) {
        console.log(error.message);
    }
}
async function searchLocations(params) {
    try {
        return await allAnswer(`SELECT id, name , cp FROM locations WHERE name LIKE '%' || '${params}' || '%' LIMIT  10 `)
    } catch (error) {
        console.log(error.message);
    }
}

 
module.exports = {
    getProvincesNames,
    getClientData,
    getWorkShopName,
    searchClientInDbClients,
    updateClientDataFunc,
    insertClientData,
    getLastCevigas,
    searchLocations
}