const searchCilOnDb = require("./searchCilOnDb");
async function cilinderSavedFuncion(){
    // si es un cilindro incompleto le borra el "_" de adelante
    let storageContent = localStorage.getItem("idCilinderSaved");
    if(storageContent.slice(-1)=="_"){
        storageContent= storageContent.slice(0,-1);
    }
    const getDataCilinderSaved = await allAnswer(`SELECT *  FROM cilindersaved WHERE id = '${storageContent}' `);
    // SELECCIONA LOS DATOS DEL CILINDRO Y LO IMPRIME EN EL HTML 


    // reemplaza los valores vacios de los inputs por los de la base de datos
    codeO.value         = getDataCilinderSaved[0]["omologation"];
    dateFab.value       =  getDataCilinderSaved[0]["datefab"];
    lastCrpc.value      = getDataCilinderSaved[0]["lastcrpc"];
    serialNumber.value  = getDataCilinderSaved[0]["serialnumber"];
    tara.value          = getDataCilinderSaved[0]["taramedido"];
    vol.value           = getDataCilinderSaved[0]["volmedido"];
    // crea un div que contiene la imagen del cilindro si es que tiene una imagen
    let div             = document.createElement("div");
    div.className       = "imgContent";
    div.innerHTML       = `
        <img src="${getDataCilinderSaved[0]["img"]}" alt="">
    `;
    let addImg = document.getElementById("addImg"); 
    // reemplaza el div por defecto por el div que contiene la imagen
    addImg.parentNode.replaceChild(div , addImg); 

    // ELIMINA LOS BOTONES DE   AUTOFILL Y  AL SIGUIENTE LO CAMBIA PARA FINALIZAR LA VISTA 
    autoFillContent.style.display   = "none";
    let autoFillbtn = document.getElementById("autoFillbtn");
    let buttonController = document.getElementById("buttonController");
    buttonController.style.gridTemplateColumns= "1fr 1fr";
    autoFillbtn.textContent ="SIGUIENTE";
    // trae los datos del cilindro desde db typecilinders

    // busca los datos del cilindro en typecilinders , y los inserta en el html
    await searchCilOnDb.searchCilOnDb(codeO.value);

    // al darle click al boton siguiente
    autoFillbtn.addEventListener("click", async()=>{
        //
        await updateCilinder.updateCilinderData(getDataCilinderSaved);

        ipcRenderer.send("newWindowFromLoadCilinderData");
        window.close();
    });
        
}
module.exports = {
    cilinderSavedFuncion
}