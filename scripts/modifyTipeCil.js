const {ipcRenderer} = require("electron");
const sqlite = require("sqlite3");

db = new sqlite.Database("db/db.db");

var codecil         = document.getElementById("code");
var brand           = document.getElementById("brand");
var capacity        = document.getElementById("capacity");
var rulescil        = document.getElementById("rules");
var thikness        = document.getElementById("thikness");
var coficent        = document.getElementById("coficent");
var diameter        = document.getElementById("diametter");
var maxexpansion    = document.getElementById("maxexpansion");
var totalexpansion  = document.getElementById("totalexpansion");
var material        = document.getElementById("material");

var updateTypeCil = document.getElementById("updateTypeCil");
var quitModifyTypeCil = document.getElementById("quitModifyTypeCil");
window.onload = ()=>{
    var getIdCil = localStorage.getItem("idTypeCil");
    db.all("SELECT * FROM typecilinders WHERE id = ?" , [getIdCil]  , (err, row)=>{
        if(err){
            console.log(err.message);
        }
        else{
            var getOb = row[0];

            codecil.value           = getOb.code;
            brand.value             = getOb.brand;
            capacity.value          = getOb.capacity;
            rulescil.value          = getOb.rules;
            thikness.value          = getOb.thikness;
            coficent.value          = getOb.coficent;
            diameter.value          = getOb.diametter;
            maxexpansion.value      = getOb.maxexpansion;
            totalexpansion.value    = getOb.totalexpansion;
            material.value          = getOb.material;
        }
    });
}

updateTypeCil.addEventListener("click" , ()=>{
    var getIdCil = localStorage.getItem("idTypeCil");
    db.all("UPDATE typecilinders SET code = ?, brand = ?, capacity = ?, rules = ? , thikness = ? , coficent = ? , diametter = ? , maxexpansion = ? , totalexpansion = ? , material = ? WHERE id = ?",
    [codecil.value , brand.value, capacity.value, rulescil.value , thikness.value , coficent.value , diameter.value,maxexpansion.value, totalexpansion.value ,material.value ,getIdCil],
    (err)=>{
        if(err){
            console.log(err.message);
        }
        else{
            let autoFilStatus   = localStorage.getItem("autoFil");
            let userAdmin       = localStorage.getItem("userAdmin");
            localStorage.clear();
            localStorage.setItem("autoFil" , autoFilStatus); 
            localStorage.setItem("userAdmin" , userAdmin);
            ipcRenderer.send("returnToViewCilinders");
            window.close();
        }
    }
    );
});
quitModifyTypeCil.addEventListener("click" , ()=>{
    
    let autoFilStatus   = localStorage.getItem("autoFil");
    let userAdmin       = localStorage.getItem("userAdmin");
    localStorage.clear();
    localStorage.setItem("autoFil" , autoFilStatus); 
    localStorage.setItem("userAdmin" , userAdmin);


    ipcRenderer.send("returnToViewCilinders");
    window.close();
});