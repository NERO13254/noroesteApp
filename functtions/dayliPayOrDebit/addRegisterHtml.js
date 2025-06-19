const { answersContent } = require("./answers");
const { createEelement } = require("./createElement");

async function addRegisterHtml(e,generalDate) {
    // obtiene la fecha ingresada 
    let date = `${generalDate[0].value}/${generalDate[1].value}/${generalDate[2].value}`;
    if(e.target.tagName=='BUTTON'){
        // obtiene las keys y valores de los inputs HTML
        let generalContainer = e.target.parentNode;
        let keys = `${generalContainer.children[0].id},${generalContainer.children[1].id},date`;
        let values=`'${generalContainer.children[0].value}','${generalContainer.children[1].value}','${date}'`;
        // inserta los datos en db y obtiene el ultimo id de la tabla
        await answersContent.insertData(keys,values, e.target.getAttribute("name"));
        
        // inserta el nuevo registro en el HTML
        let data = e.target.id=="addDayliPay"?"payDefault":"egressDefault";
        let lastId = await answersContent.lastId(e.target.getAttribute("name"));
        console.log();
        let objData = {
        "id":lastId[0]["id"],
        "creditor" : generalContainer.children[0].value,
        "value": generalContainer.children[1].value
        }
        
        createEelement(objData , document.getElementById(data));
    }
}

module.exports = {
    addRegisterHtml
}