const db = require("../../db/dbRed");

const answers = {
    createLocation : (data)=>{
        return db.runAnswer(`INSERT INTO locations(name,cp)VALUES(${data})`);
    },
    readLocations : ()=>{
        return db.allAnsWer("SELECT * FROM locations WHERE 1");
    },
    readLastLocation: ()=>{
        return db.allAnsWer("SELECT * FROM locations WHERE 1 ORDER BY id DESC LIMIT 1");
    },
    readDuplicateData: (cp)=>{
        return db.allAnsWer(`SELECT name FROM locations WHERE cp='${cp}' `);
    },
    updateLocation : (data , id)=>{
        return db.runAnswer(`UPDATE locations SET ${data} WHERE id='${id}' `);
    },
    deleteLocation : (id)=>{
        return db.runAnswer(`DELETE FROM locations WHERE id='${id}' `);
    }
}

module.exports = {
    answers
}