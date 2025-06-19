const puppeteer = require("puppeteer");
const { browserNavigator } = require("./browserNavigator");
const { ipcRenderer } = require("electron");
const { selectOperation } = require("./selectOperation");
const { completeInputs } = require("./completeInputs");
const { collectWebDataCilinder } = require("./collectWebDataCilinder");


async function scrappingNavigator(data) {
    // inicia el navegador
    let page = await browserNavigator();

    // selecciona el tipo de consulta , estableciendolo a "Cilindro"
    await selectOperation(page);

    // compelta los campos con la informacion brindada (data)
    await completeInputs(data , page);

    // obtiene el ultimo boton "+" que redirige a la pestaña de datos del registro
    const elements = await page.$$("tr .text-primary");
    const lastElement = elements[elements.length-1];

    if (lastElement){
        // obtiene los datos del cilindro 
       return  await collectWebDataCilinder(page  , lastElement);
    }
    else{
        return [];
    }
}


module.exports = {
    scrappingNavigator
}