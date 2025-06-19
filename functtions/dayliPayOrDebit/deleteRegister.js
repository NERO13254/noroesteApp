const { reportStatus } = require("../reportStatus");
const { answersContent } = require("./answers");

async function deleteRegister(e) {
    let nameTable = e.target.parentNode.parentNode.id=="payDefault"?"dailyPay":"dailyegress";
    if(e.target.className=='modifyElement'){
        // actualiza los datos
        let collectData = e.target.parentNode.querySelectorAll("input");
        let answerContent = `
            creditor='${collectData[0].value.trim()}',
            value='${collectData[1].value.trim().slice(1).replace(/\./g,"")}'
        `;
        try {
            await answersContent.updateRegister(nameTable,answerContent,e.target.name);
            e.target.parentNode.classList.toggle("succesData");
        } catch (error) {
            e.target.parentNode.classList.toggle("dangerData");
            alert("algo salió mal");
        }
    }else{
        // elimina el registro
        reportStatus("Aviso","¿Desea Eliminar El Registro?","¿Está seguro que desea eliminar el registro seleccionado? <br> En caso de proceder , el registró se borrará definitivamente y no se podrá revertir la acción", 2 , ["canelar" , "Aceptar"] , ["canelProcess" , "procedeToDeleteRegister"], document.getElementById("reportStatus"));
        document.getElementById("procedeToDeleteRegister").addEventListener("click" , ()=>{
            answersContent.deleteRegister(nameTable,e.target.name );
            e.target.parentNode.remove();
            document.getElementById("reportStatus").innerHTML='';
        });
    }
}

module.exports = {
    deleteRegister
}