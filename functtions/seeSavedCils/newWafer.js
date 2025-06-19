async function newWafer(params) {
    reportStatus.reportStatus("Aviso","¿La oblea va a ser exportada?","¿desea solo imprimir la ficha tecnica o exportar la oblea a energas ?",2,["Imprimir" , "Exportar a energas"] , ["soloPrint","exportToEnergas"],document.getElementById("alertContent"));

    document.getElementById("soloPrint").addEventListener("click" , ()=>{
        document.getElementById("alertContent").innerHTML='';
        localStorage.removeItem("idWaferSaved");
        ipcRenderer.send("printCommitmentSheet");
    })

    document.getElementById("exportToEnergas").addEventListener("click",()=>{
        document.getElementById("alertContent").innerHTML='';
        localStorage.setItem("exportWaferToEnergas" , "true");
        localStorage.removeItem("idWaferSaved");
        localStorage.removeItem("idCilinderSaved");
        localStorage.removeItem("waferDataSavedInObject");
        ipcRenderer.send("printCommitmentSheet");
    });
}

module.exports = {
    newWafer
}