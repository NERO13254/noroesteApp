async function allAnswer(answer){
    return new Promise((resolve, reject) => {
        db.all(answer , (err, row)=>{
            if(err){
                reject ( new Error(err.message) );
            }
            else{
                resolve(row);
            }
        })
    })
}

async function runAnswer(answer){
    return new Promise((resolve, reject) => {
        db.all(answer , (err)=>{
            if(err){
                reject ( new Error (err.message) )
            }
            else{
                resolve();
            }
        })
    })
}


async function getDataClientSearchedForDni(dni){
    try {
        let getData = await allAnswer(`SELECT idtype,dni,names,location,country,cp,direccion ,domain  FROM clients WHERE dni = '${dni}' ORDER BY id DESC LIMIT 1`);
        return getData;
    } catch (error) {
        console.log(error.message);
    }
}

async function getProvinces() {
    try {
        let getProvinces = await allAnswer("SELECT name FROM provincia WHERE 1");
        return getProvinces;
    } catch (error) {
        console.log(error.message);
    }
}

async function getClientDataFromCilinderSaved(data) {
    try {
        return await allAnswer(`SELECT idtype , dni , nameandsurname , country , provincia , cp , direccion , domain FROM cilindersaved WHERE id ='${data}' `)
    } catch (error) {
        console.log(error.message);
    }
}

async function getNameTdm(data) {
    try {
      return  await allAnswer(`SELECT workshop FROM tdm WHERE id ='${data}' `);
    } catch (error) {
        console.log(error.message);
    }
}

async function getLocations() {
    try {
        return allAnswer(`SELECT id, name , cp FROM locations WHERE 1 `);
    } catch (error) {
        console.log(error.message);
    }
}

async function updateClient(params) {
    try {
        await runAnswer(`UPDATE clients SET ${params} WHERE dni ='${document.getElementById("dni").value}' `);
        return true
    } catch (error) {
        console.log(error.message);
    }
}
async function insertClient(key, value ) {
    try {
        let getIdInter = await allAnswer("SELECT idcevigas FROM clients WHERE 1 ORDER BY id DESC LIMIT 1");
        getIdInter = getIdInter.length>0 ? parseInt(getIdInter[0]["idcevigas"])+1 : 1;
        await runAnswer(`INSERT INTO clients (${key},idcevigas)VALUES(${value},${getIdInter})`);
        return true
    } catch (error) {
        console.log(error.message);
    }
}
module.exports = {
    getDataClientSearchedForDni,
    getProvinces,
    getClientDataFromCilinderSaved,
    getNameTdm,
    updateClient,
    insertClient,
    getLocations
}