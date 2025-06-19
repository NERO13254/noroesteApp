const { answers } = require("./answers");
const { insertDataInHtml } = require("./insertDataInHtml");

async function loadDefaultProvince() {
    // obtiene todas las provinias de db y las inseta n el HTML
    let allProvinces = await answers.readAllProvinces();
    document.getElementById("listRegionsLoaded").innerHTML='';
    for (let i = 0; i < allProvinces.length; i++) {
        const element = allProvinces[i];
        let bgColor  = i%2==0 ? "rgb(245, 245, 245)" : "white";
        insertDataInHtml(element,bgColor);
    }
}

module.exports = {
    loadDefaultProvince
}