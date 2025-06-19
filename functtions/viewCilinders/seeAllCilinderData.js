const { answers } = require("./answers");

async function seeAllCilinderData(params) {
    let data = params.parentNode.children[0].textContent;
    let collectData = await answers.readOnlyCil(data);
    let inputContent = document.getElementById("inputContent");
    inputContent.innerHTML ='';
    document.getElementById("specificDataCilinder").style.display='grid';
    let keys = Object.keys(collectData[0]);
    
    let guide = ["id", "codigo de homologado", "Marca" , "matricula" , "modelo", "capacidad" , "reglamentación","Espesor", "Coeficiente" , "Diametro" , "Expansion permanente" , "Expansion total", "material" , "dureza" , "largo"];

    keys.forEach((element,index) => {
        let div = document.createElement("div");
        div.className = "speciicInputContent";
        div.innerHTML = `
            <label for='${element}'>${guide[index]}</label>
            <input type='text' id='${element}' value='${collectData[0][element]?collectData[0][element] : ""}'>
        `;
        inputContent.append(div);
    });
}

module.exports = {
    seeAllCilinderData
}