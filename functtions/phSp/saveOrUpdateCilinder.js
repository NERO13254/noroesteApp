const { ipcRenderer } = require("electron");
const { answers } = require("./answers");
const { imgProcess } = require("./imgProcess");

async function saveOrUpdateCilinder(condenatedCilinder) {
    
    // si hay una imagen cargada la guarda en la carpeta compartida de imagenes
    document.getElementById("addImg").files.length>0 ? await imgProcess() : "";


    let values='' , keys ='' , completeData ='';
    let newDate = new Date();
    // obtiene el numero de certificad y de inerno
    let correlativeNumbers = await answers.getCorrelativeNumbers();
    let certficateContent   =correlativeNumbers.length>0 ? parseInt(correlativeNumbers[0]["certificatenumber"])+1  : 1;
    let insideIdContent     =correlativeNumbers.length>0 ? parseInt(correlativeNumbers[0]["insideid"])+1 : 1 ;
    let datefab= `'${document.getElementById("dateFab").value}/${document.getElementById("dateFabYear").value}'`;
    let lastcrpc= `'${document.getElementById("lastCrpc").value}/${document.getElementById("lastCrpcYear").value}' `;


    // obtiene los datos del cilindro
    getValuesOfCil = await answers.readLikeCilinder(document.getElementById("omologation").value.toUpperCase());

    // recolecta todos los inputs
    function generateAnswer(element , dataInput , type){
        dataInput.forEach(data=>{
            if(data.getAttribute("type")=="checkbox"||data.id=="dateFab"|| data.id=="thikness"||data.id=="maxexpansion" || data.id=="totalexpansion" ||data.id=="thikness9" || data.id=="thikness10" ||data.id=="addImg" || data.id=="dateFabYear" || data.id=="lastCrpc" || data.id=="lastCrpcYear" || data.id=="case"){
            }else{
                let value = type=="input" ? data.value : data.textContent;
                value = value.toUpperCase();
                let id = data.id;

                if (id === "coficent") {
                    id = "coeficent";
                } else if (id === "diametter") {
                    id = "diametronominal";
                } else if (id === "rules") {
                    id = "rulefab";
                }


                element ? completeData+=`${id}='${value}',` : keys+=`${id},` , values+=`'${value}',`;
            }
        });
    }

    // recolecta todos los elementos option selecionados
    function getOptions(element){
        document.querySelectorAll("select").forEach(data=>{
            if(data.id=='case'){}
            else{
                let optionContent = data.options[data.selectedIndex];
                optionContent = optionContent.textContent.toUpperCase();
                element ? completeData+=`${data.id}='${optionContent}',` : keys+=`${data.id},` , values+=`'${optionContent}',`;
            }
        });
    }


    // obtiene todos los datos  del cilindro
    let allInputs = document.querySelectorAll("input");
    let allStrongs = document.querySelectorAll("#sepecificDataCil .dataCil");
    // evalua si existe un cilindro guardado o no para actualizar o insertar
    if(localStorage.getItem("idCilinderSaved")){
        generateAnswer(true , allInputs , "input");
        generateAnswer(true , allStrongs , "strong");
        getOptions(true);
        completeData += `certificatenumber='${certficateContent}' , insideid='${insideIdContent}',volestimado='${document.getElementById("volmedido").value}',taramedido='${document.getElementById("taraestimado").value}',`;
        completeData+=`chekeddate='${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}',`;
        completeData+= `material='${getValuesOfCil[0]["material"] }' , workshopcode='${localStorage.getItem("idWorkShop")}', obs='${obs.value}',`
        completeData+= `datefab=${datefab} ,lastcrpc=${lastcrpc}`;
        await answers.updateCilinder(completeData , localStorage.getItem("idCilinderSaved"))


    }else{
        generateAnswer(false , allInputs , "input");
        generateAnswer(false , allStrongs , "strong");
        getOptions(false);
        keys += `certificatenumber,insideid,chekeddate,material , datefab, lastcrpc , workshopcode,volestimado, taramedido , obs`;
        values += `'${certficateContent}','${insideIdContent}','${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}','${getValuesOfCil.length>0 ? getValuesOfCil[0]["material"] : "NE"}',${datefab},${lastcrpc},'${localStorage.getItem("idWorkShop")}', '${document.getElementById("volmedido").value}', '${document.getElementById("taraestimado").value}','${obs.value}' `;

        await answers.createCilinder( keys, values);
    }

    if(condenatedCilinder){
        ipcRenderer.send("sentenceWindow")
        
    }else{
        if(!localStorage.getItem("idCilinderSaved")){
            ipcRenderer.send("payCilinder");
            localStorage.setItem("cilinderInfo"  , `${document.getElementById("omologation").value},${document.getElementById("serialnumber").value}`)
            
        }else{
            ipcRenderer.send("seeSavedCilinders");
            localStorage.removeItem("idCilinderSaved");
        }
    }
    window.close();
}

module.exports = {
    saveOrUpdateCilinder
}