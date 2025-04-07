const {ipcRenderer} = require("electron");
const sqlite = require("sqlite3");
const db = new sqlite.Database("db/db.db");

var saveNewLocation = document.getElementById("saveNewLocation");
var quitNewLocation = document.getElementById("quitNewLocation");


saveNewLocation.addEventListener("click", ()=>{

    var nameLocation = document.getElementById("nameLocation").value;
    var cpLocation = document.getElementById("cpLocation").value

    db.run("INSERT INTO locations (name , cp) VALUES  (?,?)" , [nameLocation, cpLocation] , (err)=>{
        if(err){
            console.log(err.message);
        }else{
            ipcRenderer.send("quitNewLocation" );
            window.close();
        }
    });
 
});

quitNewLocation.addEventListener("click", ()=>{
    ipcRenderer.send("quitNewLocation" );
    window.close();
});