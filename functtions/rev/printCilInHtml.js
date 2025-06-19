const { corroborateDomain } = require("./corroborateDomain");
const { corroborateOmologation }= require("./corroborateOmologation");

async function printCilInHtml(element , append) {
    // guia de los inputs para saber a que dato pertenece cada input
    let nameGuide = [{name:'pec'} , {name:"Tdm°"} , {name:"Nombre"} , {name:"Tipo de Documento"} , {name:"Numero de Documento"} , {name:"Direccion"} , {name:"Localidad"} , {name:"Provincia"} , {name:"Cp"} , {name:"Dominio"}, {name:"Cod.Homologado"},{ name:"Num.Serie"}, {name:"Fab."},{ name:"Condena"} , {name:"Material"} , {name:"Tara"} ,{ name:"Cod.Interno"} , {name:"Num.Certificado"} , {name:"Capacidad"}]

    // se crea el div que contiene la info resumida del cilindro  
    let div = document.createElement("div");
    div.className = "cilinderContent";
    div.innerHTML = `
    <div class='headerContentCil'>
        <div class='contentInputReloadExport'>
            <input type='checkbox' class='${element["serialnumber"]}'>
        </div>
        <strong>${element["omologation"]}</strong>
        <strong>${element["serialnumber"]}</strong>
        <button id='seeAllDataCil' class='${element["serialnumber"]}'> > </button>
    </div>
    `;
    // crea el contenedor de los detalles del cilindro
    const getKeys = Object.keys(element);
    let divData         = document.createElement("div");
    divData.id          = element["serialnumber"];
    divData.className   = "cilDetails";

    // corrobora que los datos ingresados del dominio sean correctos 
    await corroborateDomain(element["domain"]);

    for (let i = 0; i < Object.keys(element).length; i++) {
        let sentenceOmologation ="";
        if(getKeys[i]=="omologation"){
            // corrobora que el codigo de omologado sea correcto (ER32)
            sentenceOmologation = await corroborateOmologation(element[getKeys[i]]);
        }
        let divContent = document.createElement("div");
        divContent.className = "divContentData";
        divContent.innerHTML = `
        <strong>${nameGuide[i]["name"]}</strong>
        <input type='text' value='${element[getKeys[i]]}' id='${getKeys[i]}'/>
        `;
        // si hay un dato vacío o con error pinta de rojo el input
        if( !element[getKeys[i]] && element[getKeys[i]]!="0"|| !errorContainer &&  getKeys[i]== "domain" ||!sentenceOmologation && getKeys[i]=="omologation" ){
            if(getKeys[i]=="taramedido" || getKeys[i]=="capacity"){
                divContent.style.background = "#e1a536";
            }else{
                div.style.background = "#c15d5d";
                div.style.color = "white";
                divContent.style.background = "#c15d5d";
                divContent.style.color = "white";
                // variable global que cuenta cuantos cilndros se registraron con error
                failCilindersExported++;
            }
        }
        divData.append(divContent);
    }
    div.append(divData);
    append.append(div);
}
module.exports = {
    printCilInHtml
}