const sqlite3       = require("sqlite3");
const db            = new sqlite3.Database("db/db.db");
const runAlert      = require("../functtions/alertFun");
const {ipcRenderer} = require("electron");
const modifyRegion  = localStorage.getItem("modifyRegion");
const regionContent = document.getElementById("regionContent");
const saveRegion    = document.getElementById("saveRegion");
const alertContent  = document.getElementById("alertContent");
const cancelProcess = document.getElementById("cancelProcess");

window.onload= ()=>{
    // obtiene los datos del storage y los divide en id y nombre , luego inserta el nombre en el input html
    let onlyData = modifyRegion.split(","); 
    console.log(onlyData);
    regionContent.value = onlyData[1];

    saveRegion.addEventListener("click" , ()=>{
        if(regionContent.value== 0 ){
            runAlert.alertFun("DEBE INGRESAR UN NOMBRE PARA LA PROVINCIA", alertContent);
        }else{
            db.run("UPDATE provincia SET name =? WHERE id=? " , [regionContent.value , onlyData[0]] , ()=>{
            try {
                localStorage.removeItem("modifyRegion");
                ipcRenderer.send("seeRegion");
                window.close();
            } catch (error) {
                console.log(error.message);
            }
            });
        }
        
    });
}
// al darle cancelar se eliminan los datos  del storage y vuelve a la pestaña de ver localidades
cancelProcess.addEventListener("click" , ()=>{
    localStorage.removeItem("modifyRegion");
    ipcRenderer.send("seeRegion");
    window.close();
});

