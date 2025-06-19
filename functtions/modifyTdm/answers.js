const db = require("../../db/dbRed");

const answers = {
    
    createPec : (values)=>{
        return db.runAnswer(`INSERT INTO  relacionatedpec (id,id_tdm , id_pecs )VALUES(${values})`);
    },getPecs : (pec)=>{
        return db.allAnsWer(`
        SELECT relacionatedpec.id ,tdm.workshop , pecs.pec
        FROM relacionatedpec
        JOIN tdm ON relacionatedpec.id_tdm = tdm.id
        JOIN pecs ON relacionatedpec.id_pecs = pecs.id
        WHERE relacionatedpec.id_tdm=${pec}
        `);
    },
    readPec  : (pec)=>{
        return db.allAnsWer(`SELECT * FROM pecs WHERE pec LIKE '%' || ${pec} || '%'`);
    },
    readLastIdPec : ()=>{
        return db.allAnsWer(`SELECT id FROM relacionatedpec WHERE 1 ORDER BY id DESC LIMIT 1`);
    },
    deleteRelacionatedPec : (id)=>{
        return db.runAnswer(`DELETE FROM relacionatedpec WHERE id ='${id}' `);
    }

}

module.exports = {
    answers
}