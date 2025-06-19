const { answers } = require("./answers");

async function insertCtateInDb() {
    // obtiene los datos de la cta cte
    let keys = '' , values = '';
    document.querySelectorAll("#sectionModify input").forEach(element=>{
        keys += `${element.id},`;
        values += `'${element.value.toUpperCase()}',`;
    });

    // inserta la cta cte en db
    await answers.createCtaCte(keys.slice(0,-1), values.slice(0,-1));
}

module.exports = {
    insertCtateInDb
}