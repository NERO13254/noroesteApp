const db = require("../../db/dbRed");

const answers = {
    readPec : (id)=>{
        return db.allAnsWer(`SELECT pec FROM tdm WHERE id='${id}'`);
    },
    readDataClient : (data , idCilinder)=>{
        return db.allAnsWer(`SELECT ${data},chekeddate FROM cilindersaved  WHERE id = '${idCilinder}'`);
    },
    readProvinces : ()=>{
        return db.allAnsWer(`SELECT name FROM provincia WHERE 1 `);
    },
    readPairCilinders : (dni ,domain,date)=>{
        return db.allAnsWer(`SELECT serialnumber,omologation, volmedido, taramedido FROM cilindersaved WHERE dni='${dni}' AND domain='${domain}' AND chekeddate='${date}'`)
    },
    readLocation: (location)=>{
        return db.allAnsWer(`SELECT cp, name FROM locations WHERE name LIKE '%'||'${location}'||'%'`);
    }
}

module.exports = {
    answers
}