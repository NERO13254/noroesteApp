const path = require("path");

function getDb(site){
    const path = require("path");
    const sqlite = require("sqlite3");
    let getRoute = path.resolve(site, "\\\\SANDRA\\db\\db.db");
    return new sqlite.Database('db/db.db');
}

const dbPath = path.resolve(__dirname , "2\\db\\db.db");
const db = getDb(dbPath);

async function allAnsWer(answer) {
    return new Promise((resolve, reject) => {
        db.all(answer , (err , row)=>{
            if(err){
                reject(err.message)
                console.log(answer)
            }else{
                resolve(row);
            }
        });
    })
}

async function runAnswer(answer) {
    return new Promise((resolve, reject) => {
        db.run(answer , (err)=>{
            if(err){
                reject(err);
                console.log(answer)
            }else{
                resolve();
            }
        });
    })
}



module.exports = {
    getDb,
    allAnsWer,
    runAnswer
}