function openOptionCompromisSheet(){
    // si tiene datos del cilindro lo imrpime sino despliega la alerta
    if(localStorage.getItem("idCilinderSaved")){
        ipcRenderer.send("printCompromisSheet");
        window.close();
    }else{
        reportStatus.reportStatus("Falta de información" , "No ha seleccionado ningun dato" , "Debe seleccionar algún cilindro de la lista para poder imprimirlo , puede seleccionarlo haciendo click izquierdo en cualquier cilindro guardado previamente " , 1 , ["Aceptar"] , ["canelProcess"] , alertContent);
    }

}

module.exports = {
    openOptionCompromisSheet
}