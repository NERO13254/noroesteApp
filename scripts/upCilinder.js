const sqlite = require("sqlite3");
const {ipcRenderer} = require("electron");
const db = new sqlite.Database("db/db.db");

var quitNewCilinder = document.getElementById("quitNewCilinder");
var addNweCil = document.getElementById("addNweCil");

addNweCil.addEventListener("click", ()=>{
    var code = document.getElementById("code").value;
    var capacity    = document.getElementById("capacity").value;
    var brand       = document.getElementById("brand").value;
    var rules       = document.getElementById("rules").value;
    var thikness    = document.getElementById("thikness").value;
    var coefficient = document.getElementById("coefficient").value;
    var diametter   = document.getElementById("diametter").value;
    var expTotal    = document.getElementById("expTotal").value;
    var expPer      = document.getElementById("expPer").value;   
    var material    = document.getElementById("material").value;
    if(expTotal == "" || expTotal == null){
        var autoPer = Math.floor(Math.random()* 3) + 1;
        
         db.run("INSERT INTO typecilinders (code, brand , capacity , rules , thikness , coficent, diametter , totalexpansion, maxexpansion,material) VALUES (?,?,?,?,?,?,?,?,?,?) ",[code, brand, capacity, rules, thikness, coefficient, diametter, expPer ,autoPer,material ] , (err)=>{
             if(err){
                 console.log(err.message);
             }
             else{
                 window.close();
             }
         });
    }
    else{
        db.run("INSERT INTO typecilinders (code, brand , capacity , rules , thikness , coficent, diametter , maxexpansion , totalexpansion,material) VALUES (?,?,?,?,?,?,?,?,?,?) ",[code, brand, capacity, rules, thikness, coefficient, diametter ,expPer ,expTotal,material  ] , (err)=>{
            if(err){
                console.log(err.message);
            }
            else{
                window.close();
            }
        });
    }
});

quitNewCilinder.addEventListener("click", ()=>{
    ipcRenderer.send("backToviewCilinders" , "back");
    window.close();
});