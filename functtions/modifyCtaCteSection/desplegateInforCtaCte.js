const { answers } = require("./answers");

async function desplegateInforCtaCte(target) {


    document.getElementById("saveOperation").style.display='block';
    document.getElementById("deleteCtaCte").style.display='block';
    
    document.getElementById("createCtaCte").style.display='none';

    // obtiene todos los datos de la cuenta corriente
    let getId = target.parentNode.children[0].textContent.trim();
    let allData = await answers.readAllDataFromOnlyCtaCte(getId);

    document.getElementById("id").textContent = getId;
    // rellena los campos con la información seleccionada
    let keys = Object.keys(allData[0] );
    for (let i = 0; i < keys.length; i++) {
        const element = keys[i];
        let value = allData[0][element] ? allData[0][element] : 0
        document.getElementById(element) ?  document.getElementById(element).value = value : "";
    }

    document.getElementById("sectionModify").style.display='block';
}


module.exports = {
    desplegateInforCtaCte
}