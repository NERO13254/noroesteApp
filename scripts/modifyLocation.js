const sqlite = require("sqlite3");
const {ipcRenderer} = require("electron");
const db = new sqlite.Database("db/db.db");

var nameLocation = document.getElementById("nameLocation");
var cpLocation   = document.getElementById("cpLocation");
var saveAndExit  = document.getElementById("saveAndExit"); 
var getId = localStorage.getItem("idLocation");
var quitModifyLocation = document.getElementById("quitModifyLocation");


window.onload = ()=>{

    db.all("SELECT id , name , cp FROM locations WHERE id = ?", [getId] , (err, row)=>{
        var rowContnet = row[0];
        nameLocation.value = rowContnet.name;
        cpLocation.value = rowContnet.cp;

        localStorage.setItem("nameGet" , rowContnet["name"]);
        localStorage.setItem("cpGet" , rowContnet["cp"]);
    });
}

saveAndExit.addEventListener("click" , ()=>{
    
    var nameGet = localStorage.getItem("nameGet");
    var cpGet = localStorage.getItem("cpGet");
    
    db.run("UPDATE locations SET name = ? , cp = ?  WHERE id = ? " , [nameLocation.value , cpLocation.value , getId] ,  (err)=>{
        if(err){
            console.log(err.message);
        }
        else {
            
        }
    });

    let autoFilStatus   = localStorage.getItem("autoFil");
    let userAdmin       = localStorage.getItem("userAdmin");
    localStorage.clear();
    localStorage.setItem("autoFil" , autoFilStatus); 
    localStorage.setItem("userAdmin" , userAdmin);
    ipcRenderer.send("quitModifyLocation");
    window.close();
});

quitModifyLocation.addEventListener("click" , ()=>{
    let autoFilStatus   = localStorage.getItem("autoFil");
    let userAdmin       = localStorage.getItem("userAdmin");
    localStorage.clear();
    localStorage.setItem("autoFil" , autoFilStatus); 
    localStorage.setItem("userAdmin" , userAdmin);
    
    ipcRenderer.send("quitModifyLocation");
    window.close();
});