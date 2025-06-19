const { answers } = require("../functtions/wafersController/answers");
const { completeDataInputs } = require("../functtions/wafersController/completeDataInputs");
const { exportWafersTxt } = require("../functtions/wafersController/exportWafersTxt");
const { loadWafersInHtml } = require("../functtions/wafersController/loadWafersInHtml");
const { saveChangesOfData } = require("../functtions/wafersController/saveChangesOfData");
var sectionSelected = "";

window.onload = async()=>{

    // al presionar el boton de "modificar" una tabla obtiene los valores de esta
    document.getElementById("modifyOrder").addEventListener("click", async()=>{
        document.getElementById("sectionModifyOrderTxt").style.display='block';
        let getTable = document.getElementById("tableSelected");
        document.getElementById("nameTable").textContent = getTable.options[getTable.selectedIndex].text;
       
        await completeDataInputs(getTable.value);
    });
    
    // al presionar enter en alguno de los inputs de modificacion
    document.getElementById("dataContent").addEventListener("keyup" , async(e)=>{
        if(e.target.tagName=='INPUT' && e.key=="Enter"){
            await saveChangesOfData(e.target);
        }
    });
    
    // al presionar "cancelar" en el menú de modificación del txt
    document.getElementById("closeSettingsTxt").addEventListener("click" , ()=>{
        document.getElementById("sectionModifyOrderTxt").style.display='none';
    });

    // al presionar el boton de reciclado en obleas exportadas
    document.getElementById("wafersExporteds").addEventListener("click" , async(e)=>{
        if(e.target.className=='reExportCilinder' && e.target.tagName=="BUTTON"){
            let oldWafer = e.target.parentNode.parentNode.children[0].textContent.trim();
            let waferNoExported = await answers.cllectSpecificWafer(oldWafer);
            await exportWafersTxt(waferNoExported);
        }
    });

    // al presionar el boton "exportar"
    document.getElementById("exportWafers").addEventListener("click" , async()=>{
        let dateListName = "", insideidContent = '';
        // carga las obleas por exportar en el HTML
        await loadWafersInHtml();

        // obtiene los datos y crea el txt de cada elemento
        //  luego finaliza con una alerta de cuantas obleas se exportaron
        let waferNoExported = await answers.collectNoExportedWafers();
        //await exportWafersTxt(waferNoExported);
    });
}