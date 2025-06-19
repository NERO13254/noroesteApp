const db = require("../../db/dbRed");

const answers = {
    readLikeCilinders : ()=>{
        return db.allAnsWer(`SELECT id, code, brand, matricula,modelo FROM typecilinders WHERE 1 ORDER BY id DESC `);
    },
    readOnlyCil : (code)=>{
        return db.allAnsWer(`SELECT * FROM typecilinders WHERE code ='${code}' `);
    },
    updateCilinder : (values , id ) =>{
        return db.runAnswer(`UPDATE typecilinders SET ${values} WHERE id ='${id}'`);
    },
    delteCilinder : (id) =>{
        return db.runAnswer(`DELETE FROM typecilinders  WHERE id='${id}' `);
    }
}

module.exports = {
    answers
}