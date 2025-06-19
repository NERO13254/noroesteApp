const { addToolToList } = require("./addToolToList");
const { getToolsDefault } = require("./answers");

async function defaultLoadedTools() {
    // obtiene todos los valoes por defecto 
    let getDefaultData = await getToolsDefault();
    // limpia el contenedor de resultados
    toolList.innerHTML = "";
    //recorre todos los resultados encontrados
    for (let i = 0; i < getDefaultData.length; i++) {
        const element = getDefaultData[i];
        await addToolToList(element);
    }

}

module.exports = {
    defaultLoadedTools
}