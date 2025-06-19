const updateCilinder    = require("./updateCil");
const generateValuesForCil  = require("./generateValuesForCil");
const { ipcRenderer } = require("electron");
function updateSaveData(){

    const myAsyncFunction = async () => {
        // Simula una tarea asíncrona que toma tiempo en completarse
        await new Promise(resolve => setTimeout(async () => {
          // Llama a tus funciones una por una, esperando a que cada una se complete antes de continuar
          await searchCilInDb();
          await generateValuesForCil.generateValuesForCil();
          resolve(); // Asegúrate de resolver la promesa después de que todas las tareas asíncronas estén completas
        }, 2000));
        return 'Tarea completada!';
    };

    let storageContainer = localStorage.getItem("idCilinderSaved");
    if(storageContainer.slice(-1)=="_"){
        storageContainer = storageContainer.slice(0,-1);
    }
    db.all("SELECT omologation , datefab, serialnumber , lastcrpc ,taramedido, volmedido , img  FROM cilindersaved WHERE id = ? " , [storageContainer] ,
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

            myAsyncFunction().then(result=>{
                console.log(result);
            }).catch(error=>{
                console.log(error.message);
            })


            async function containerUpadteCil(row){
               await
               new Promise((resolve, reject) => {
                setTimeout(() => {
                    updateCilinder.updateCilinderData(row)
                    console.log("aca ser resuelvede vedad");
                    resolve();
                }, 3500);
                })
            }

            //generateValuesForCil.generateValuesForCil();
            // al darle click al boton siguiente
            autoFillbtn.addEventListener("click", ()=>{
            //llama a la funcion updateCilinder que recibe el row de la anteriro consulta y actualiza los datos
            // y está dentro de una promesa para asegurar que los  datos se actualizen , luego se cierra ventana 
                let collectData = [
                    {"datefab": dateFab.value} ,
                    {"lastcrpc": lastCrpc.value},
                    {"omologation":codeO.value},
                    {"serialnumber": serialNumber.value},
                    {"taramedido":tara.value},
                    {"volmedido": vol.value}
                ]
                console.log(collectData);

            containerUpadteCil(collectData).then(resolve=>{
                ipcRenderer.send("newWindowFromLoadCilinderData")
                window.close();
            }).catch(err=>{
                console.log(err.message);
            })
            
            });
        }
    });
}

module.exports = {
    updateSaveData
}