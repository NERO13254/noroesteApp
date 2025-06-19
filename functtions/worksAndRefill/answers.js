const dbRed                         = require("../../db/dbRed");
const db                            = dbRed.getDb(__dirname);

async function allAnswer(params) {
    return new Promise((resolve, reject) => {
        db.all(params , (err, row)=>{
            if(err){
                reject(err);
            }else{
                resolve(row);
            }
        })
    })
}
async function runAnswer(params) {
    return new Promise((resolve, reject) => {
        db.run(params, (err)=>{
            if(err){
                reject(err);
            }else{
                resolve();
            }
        })
    })
}
const answer = {
    createEelement : (keys,values)=>{
        return runAnswer(`INSERT INTO worksandrefills (${keys})VALUES(${values})`);
    },
    readElements : ()=>{
        return allAnswer("SELECT id,name , description , valuenew , valueused FROM worksandrefills WHERE 1");
    },
    updateElement: (data, id)=>{
        return runAnswer(`UPDATE worksandrefills SET ${data} WHERE id ='${id}' `);
    },
    deleteElement : (id)=>{
        return runAnswer(`DELETE FROM worksandrefills WHERE id='${id}'`);
    },
    getLastId : ()=>{
        return allAnswer("SELECT id FROM worksandrefills WHERE 1 ORDER BY id DESC LIMIT 1");
    }
}

module.exports = {
    answer
}