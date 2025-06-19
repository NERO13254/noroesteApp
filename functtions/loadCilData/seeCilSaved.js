function seeCilSaved(){
    // CORROBORA SI SE SELECCIONO UN CILINDRO PARA VER UN CIINDRO YA GUARDADO
if(localStorage.getItem("idCilinderSaved")){
    // SELECCIONA LOS DATOS DEL CILINDRO Y LO IMPRIME EN EL HTML 
    db.all("SELECT omologation , datefab, serialnumber , lastcrpc ,taramedido, volmedido , img  FROM cilindersaved WHERE id = ? " , [localStorage.getItem("idCilinderSaved")] ,
    (err, row)=>{
        if(err){
            console.log(err.message);
        }else{
            // reemplaza los valores vacios de los inputs por los de la base de datos
            codeO.value         = row[0]["omologation"];
            dateFab.value       =  row[0]["datefab"];
            lastCrpc.value      = row[0]["lastcrpc"];
            serialNumber.value  = row[0]["serialnumber"];
            tara.value          = row[0]["taramedido"];
            vol.value           = row[0]["volmedido"];
            // crea un div que contiene la imagen del cilindro si es que tiene una imagen
            let div             = document.createElement("div");
            div.className       = "imgContent";
            div.innerHTML       = `
                <img src="${row[0]["img"]}" alt="">
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
            searchCilInDb();
            // al darle click al boton siguiente
            autoFillbtn.addEventListener("click", ()=>{

            //llama a la funcion updateCilinder que recibe el row de la anteriro consulta y actualiza los datos
            // y está dentro de una promesa para asegurar que los  datos se actualizen , luego se cierra ventana 
            updateCilinder.updateCilinderData(row).then(()=>{
                ipcRenderer.send("newWindowFromLoadCilinderData");
                //window.close();
            }).catch(err=>{
                console.log(err.message);
            })
            });
        }
    });
}
}

module.exports = {
    seeCilSaved
}