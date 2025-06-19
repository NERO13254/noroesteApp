let db = require("../../db/dbRed");


const answers = {
    pecsTdm : (idTdm)=>{
        return db.allAnsWer(`
        SELECT pecs.pec
        FROM relacionatedpec
        JOIN pecs ON relacionatedpec.id_pecs = pecs.id
        WHERE relacionatedpec.id_tdm=${idTdm}`
        );
    },
    readPecSaved : (idCilinderSaved)=>{
        return db.allAnsWer(`SELECT pec FROM cilindersaved WHERE id='${idCilinderSaved}'`);
    }
}

async function getPec() {
    try {
        return db.allAnsWer(`SELECT pec FROM tdm WHERE id ='${localStorage.getItem("idWorkShop")}'`)
    } catch (error) {
        console.log(error.message)
    }
}
async function searchLikedCilinder(cilForSearch) {
    try {
        return db.allAnsWer(`SELECT * FROM typecilinders WHERE code LIKE '%' || '${cilForSearch}' || '%' LIMIT 1 `);
    } catch (error) {
        console.log(error.message);
    }
}

async function getCorrelativeNumbers() {
    try {
        return db.allAnsWer(`SELECT certificatenumber , insideid FROM cilindersaved WHERE 1 ORDER BY id DESC LIMIT 1`);
    } catch (error) {
        console.log(error.message);
    }
}

async function updateOrInsertCilinder(params) {
    try {
        return db.runAnswer(params);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getPec,
    searchLikedCilinder,
    getCorrelativeNumbers,
    updateOrInsertCilinder,
    answers
}