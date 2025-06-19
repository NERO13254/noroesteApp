const {reportStatus} = require("../reportStatus");
const { answers } = require("./answers");

async function deleteCtaCte() {
    let IdCtaCte= document.getElementById("id").textContent;
    
    reportStatus("Aviso" , "Estás por eliminar una cuenta corriente ", 
    `Si eliminas la cuneta corriente  , junto con ella se eliminarán
    los registros de pagos y debitos de esta ¿desea proseguir?`,
    2 , ["Cancelar" , "Eliminar"],["caelProcess" , "procedeToDeleteCtaCte" ] ,
    document.getElementById("reportStatus"));

    document.getElementById("procedeToDeleteCtaCte").addEventListener("click" , async()=>{
       await answers.deleteCtaCte(IdCtaCte);
       await answers.deletePayOrDebit(IdCtaCte);
       window.close();
    });
}

module.exports = {
    deleteCtaCte
}