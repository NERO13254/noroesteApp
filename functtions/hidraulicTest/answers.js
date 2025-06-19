const db = require("../../db/dbRed");

const answers = {
    readAllTdm : ()=>{
        return db.allAnsWer("SELECT id , workshop , workshopcode FROM tdm WHERE 1 ORDER BY clickcount DESC");
    },
    readClickCount : (id)=>{
        return db.allAnsWer(`SELECT clickcount FROM tdm  WHERE id ='${id}'`);
    },
    readCilinder : (searchCil)=>{
        return db.allAnsWer(`SELECT id ,omologation , serialnumber ,paydate , workshopcode FROM cilindersaved WHERE serialnumber = '${searchCil}'`)
    },
    readNameOwnerCilinder : (owner)=>{
        return db.allAnsWer(`SELECT name FROM cuentascorrientes WHERE id='${owner}'`);
    },
    updateClickerCount : (click, id)=>{
        return db.runAnswer(`UPDATE tdm SET clickcount='${click}' WHERE id='${id}'`)
    }

}

module.exports = {
    answers
}