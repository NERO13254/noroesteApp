const db = require("../../db/dbRed");

const answers = {
    createCilinder :(keys ,values)=>{
        return db.runAnswer(`INSERT INTO cilindersaved (${keys})VALUES(${values})`);
    },
    createClient : (keys , values)=>{
        return db.runAnswer(`INSERT INTO clients (${keys})VALUES(${values})`);
    },
    readLikeClient : (dni)=>{
        return db.allAnsWer(`SELECT * FROM clients WHERE dni='${dni}' `);
    },
    readLocationsLike : (data)=>{
        return db.allAnsWer(`SELECT name , cp FROM locations WHERE name LIKE '%' || '${data}' || '%' `);
    },
    readLikeCilinder : (data)=>{
        return db.allAnsWer(`SELECT * FROM typecilinders WHERE code LIKE '%' || '${data}' || '%' LIMIT 1 `);
    },
    readLikeDni : (dni)=>{
        return db.allAnsWer(`SELECT id FROM clients WHERE dni='${dni}'`);
    },
    readSpecificDataCilinder : (id) =>{
        return db.allAnsWer(`SELECT * FROM typecilinders WHERE code LIKE '%' || '${id}' || '%' LIMIT 1 `);
    },
    getCorrelativeNumbers : ()=>{
        return db.allAnsWer(`SELECT certificatenumber , insideid FROM cilindersaved WHERE 1 ORDER BY id DESC LIMIT 1`);
    },
    readCil : (id)=>{
        return db.allAnsWer(`SELECT * FROM cilindersaved WHERE id='${id}' `);
    },
    readCheckedDate : (id)=>{
        return db.allAnsWer(`SELECT chekeddate FROM cilindersaved WHERE id='${id}' `);
    },
    readTdm : (id)=>{
        return db.allAnsWer(`SELECT workshop,workshopcode,cuit FROM tdm WHERE id='${id}' `)
    } ,
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
    },
    updateCilinder : (data , id)=>{
        return db.runAnswer(`UPDATE cilindersaved SET ${data} WHERE id ='${id}' `);
    },
    updateClinet : (data , id)=>{
        return db.runAnswer(`UPDATE clients SET ${data} WHERE id='${id}'`);
    }
}

module.exports = {
    answers
}