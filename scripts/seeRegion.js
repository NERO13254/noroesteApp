const {ipcRenderer}     = require("electron");
const sqlite            = require("sqlite3");
const db                = new sqlite.Database("db/db.db");
const listRegionsLoaded = document.getElementById("listRegionsLoaded");
const newRegion         = document.getElementById("newRegion");
const closeWin          = document.getElementById("closeWin");
// obtiene todas las provincias de la base de datos 
db.all("SELECT id , name FROM provincia WHERE 1" , (error, row)=>{
    try {
        for (let i = 0; i < row.length; i++) {
            const e = row[i];
            let div = document.createElement("div");
            div.className = "regionContent";
            div.innerHTML = `
            <strong id="i${e["id"]}">${e["name"]}</strong>
            <input type="checkbox" class="F${e["id"]}">
            `;
            listRegionsLoaded.append(div);
        }
    } catch(err) {
        console.log(err.message);
    }
});
// al hacer click en la lista de provincias selecciona su id y el nombre y lo envia a la pestaña modificar 
listRegionsLoaded.addEventListener("click" , (e)=>{
    let getId = e.target.className;
    if(getId.charAt(0)=="F"){
        let clearId = getId.slice(1);
        let getName = document.getElementById("i"+clearId).textContent;
        let toArr   = [clearId , getName];
        localStorage.setItem("modifyRegion" , toArr);
        ipcRenderer.send("modifyRegion");
        window.close();
    }
});

newRegion.addEventListener("click" , ()=>{
    ipcRenderer.send("newRegion");
    window.close();
});
closeWin.addEventListener("click" , ()=>{
    window.close();
});