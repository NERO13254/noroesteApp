const db = require("../../db/dbRed");

async function voucherData(optionSelected , searchContent) {
    try {
        return db.allAnsWer(`SELECT vouchernum , insideid , value , ammount , serialnumber FROM merchsold WHERE ${optionSelected} LIKE '%' || '${searchContent}' || '%' ORDER BY id DESC`);
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    voucherData
}