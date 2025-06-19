const db = require("../../db/dbRed");

const answers = {
    readCtaCtes : ()=>{
        return db.allAnsWer("SELECT id , name FROM cuentascorrientes WHERE 1 ORDER BY clickcount DESC ");
    },
    readTotal : (id)=>{
        return db.allAnsWer(`SELECT total FROM payordebit WHERE owner='${id}' ORDER BY id DESC limit 1`);
    },
    readFinalConsumer : ()=>{
        return db.allAnsWer("SELECT id , name , ammountpercent FROM finalconsumer WHERE 1")
    },
    readClickCount  : (id)=>{
        return db.allAnsWer(`SELECT clickcount FROM cuentascorrientes  WHERE id ='${id}'`)
    },
    updateClickerCount : (click, id)=>{
        return db.runAnswer(`UPDATE cuentascorrientes SET clickcount='${click}' WHERE id='${id}'`)
    }
}

module.exports = {
    answers
}