const { succesAlert } = require("../succesAlert");
const { answers } = require("./answers");
const { desplegateDataWafer } = require("./desplegateDataWafer");
const { desplegateGeneralWafer } = require("./desplegateGeneralWafer");
const { modifyData } = require("./modifyData");

async function loadWafersInHtml() {
    // obtiene las obleas no exportadas y las imprime en el HTML de manera general
    await desplegateGeneralWafer();

    // evalua si se presiona el boton desplegable para mostrar la lista de datos
    wafersExporteds.addEventListener("click" , async(e)=>{

        // si se presiona la flecha para desplegar la info especifica , la hace visible en HTML
        if(e.target.className=="desplegateOptions" && e.target.tagName=='BUTTON' ||  e.target.className=='desplegateOptions rotate' && e.target.tagName=='BUTTON'){
            e.target.parentNode.parentNode.parentNode.children[1].classList.toggle('grid');
            e.target.classList.toggle("rotate");
        }

        // si se selecciona alguna tabla de datos , despliega sus datos en el HTML
        if(e.target.className=='sectionInfo' && e.target.tagName=='BUTTON'){
            await desplegateDataWafer(e);
        }
    });


    // si se modifica algún dato de la tabla seleccionada
    wafersExporteds.addEventListener("keyup" ,async(e)=>{
        await modifyData(e);
    });

}

module.exports = {
    loadWafersInHtml
}