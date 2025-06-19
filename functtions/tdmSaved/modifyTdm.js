async function modifyTdm(data) {
    // obtine el id de la cta cte seleccionada
    var getData = data.target.className.slice(1);
    // si se se selecciono uninput type checkbox de la cta cte 
    if(data.target.getAttribute("type")=="checkbox"){
        // envía los datos al localStorage y abre la ventana de modificación de la cta cte
        localStorage.setItem("idTdm" , getData);
        ipcRenderer.send("modifyTdm"  , "openModifyTdm");
    }
}

module.exports = {
    modifyTdm
}