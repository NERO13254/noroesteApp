const {ipcRenderer} = require("electron");
const sqlite3       = require("sqlite3");
const db            =  new sqlite3.Database("db/db.db");
const alertFun      = require("../functtions/alertFun");
const nameNewRegion = document.getElementById("nameNewRegion");
const saveNewRegion = document.getElementById("saveNewRegion");
const alertContent  = document.getElementById("alertContent");
const cancelProcess = document.getElementById("cancelProcess");

// al hacer click en guardar corrobora que haya algo en el input sino despliega la alerta
saveNewRegion.addEventListener("click" , ()=>{
    if(nameNewRegion.value.length <=0){
        alertFun.alertFun("DEBE INGRESAR UN VALOR PARA LA PROVINCIA" , alertContent);
    }else{
        // al corroborar que no esta vacio inserta los datos en db y vuelve a ver las regiones guardadas
        db.run("INSERT INTO provincia (name)VALUES(?)", [nameNewRegion.value] , ()=>{
            try {
                ipcRenderer.send("seeRegion");
                window.close();
            } catch (error) {
                console.log(error.message);
            }
        });
    }
});
// al darle cancelar vuelve a ver las regiones
cancelProcess.addEventListener("click" , ()=>{
    ipcRenderer.send("seeRegion");
    window.close();
});

