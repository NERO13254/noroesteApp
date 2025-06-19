async function nextWindowAutoFillActivate(){
    var nextWindow  = document.getElementById("finishButton");
    let watertemp   = localStorage.getItem("watertemp");
    let volF        = document.getElementById("vol");
    let taraF       = document.getElementById("tara");
    let material    = localStorage.getItem("material");

    nextWindow.addEventListener("click" , async()=>{
        // obtiene los datos de volumen y masa luego recolecta todos los datos en un objeto  
        let totalExpansion  = document.getElementById("totalExpansion");
        let maxExpansion    = document.getElementById("maxExpansion");

        collectDataToObjetct = {
            codeO : codeO.value,
            dateFab : dateFab.value,
            tara : taraF.value,
            vol : volF.value,
            lastCrpc : lastCrpc.value,
            serialNumber : serialNumber.value,
            caseCil : caseCil.value,
            brand : bandCilinder.value,
            capacity : capacity.value,
            diametter: diametter.value,
            width:widthCil.value,
            pec : pec.value,
            thikness : thikness.textContent,
            coficent : coeficent.textContent,
            rules : rules.textContent,
            maxexpansion: maxExpansion.textContent,
            totalexpansion:totalExpansion.textContent
        }
        // guarda ls datos recolectados en el localStorage
        stringObjet =  JSON.stringify(collectDataToObjetct);
        localStorage.setItem("cilinderData" , stringObjet);
        

        let dateContainer   = [];
        // funcion asincrona que obtinene los datos correlativos de los cilindros (cod interno+1 , id cevigas+1)
        await getCorrelativeNumbers.getCorrelativeNumbers(dateContainer);

        // corrobora si existe una imagen cargada , en tal caso copia la ruta en new path
        let newPath = "";
        let addImg  = document.getElementById("addImg");
        if(addImg.files.length > 0 ) {         
            var filePath=addImg.files[0].path;
            const imgFolder = path.join(__dirname , "../img");
            const imgName   = path.basename(filePath);
            newPath         = path.join(imgFolder , imgName);
            fs.copyFile(filePath, newPath, (err)=>{
                if(err){
                    console.log(err.message);
                }
            });
        }
        var dateCom = new Date();
        var thisDate= `${dateCom.getDate()}/${dateCom.getMonth()+1}/${dateCom.getFullYear()}`;

        // inserta el cilindro nuevo en la base de datos
        await insertCildb.insertCildb(dateContainer[0] ,watertemp,volF.value,taraF.value,dateContainer[1],material,newPath,thisDate);
                
        let saveCilData =  [codeO.value , serialNumber.value];
        localStorage.setItem("cilinderInfo",saveCilData); 

        if(nextWindow.className=="finishProcess"){
            ipcRenderer.send("payCilinder");
        }else{
            ipcRenderer.send("sentenceWindow");
        }
        localStorage.removeItem("getDataUser");
        window.close();
    });
}

module.exports = {
    nextWindowAutoFillActivate
}