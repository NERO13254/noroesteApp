const {ipcRenderer} = require("electron"); 
const sqlite = require("sqlite3");
const db = new sqlite.Database("db/db.db");

const closeWindow =document.getElementById("closeWindow");
const typeCilindersContent= document.getElementById("typeCilindersContent");
const contentSearched = document.getElementById("contentSearched");
const chargeNweClilinder = document.getElementById("chargeNweClilinder");
// al apretar cerrar ventana
closeWindow.addEventListener("click", ()=>{
    window.close();
});
// añade todos los cilindros que encuentra de la db 
function addResultsToHtml(data ,appendDiv){
    appendDiv.innerHtml="";
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let div = document.createElement("div");
        div.className= "cilContainer";
        div.innerHTML=`
        <strong>${element["code"]}</strong>
        <strong>${element["brand"]}</strong>
        <strong>${element["capacity"]}</strong>
        <strong>${element["rules"]}</strong>
        <strong>${element["thikness"]}</strong>
        <strong>${element["coficent"]}</strong>
        <strong>${element["diametter"]}</strong>
        <strong>${element["width"]}</strong>
        <strong>${element["totalexpansion"]}</strong>
        <strong>${element["maxexpansion"]}</strong>
        <input type="checkbox" id="E${element["id"]}">
        `;
        appendDiv.append(div);
    }
}
// fucnion que comienza la busqueda del cilindro que es activada por el html
function startSearch(event){
    // selecciona el valor del input y si quiere buscar por codigo o por marca (er32 / improcil)
    var searchCilinder = event.srcElement.value.toUpperCase();
    var searchForId = document.getElementById("searchForId").value;
    let conditional = "brand";
    if(searchForId!=="brand"){ 
        conditional = "code";
    }
    let answer = `SELECT id, code , brand , capacity , rules , thikness , coficent , diametter , width, totalexpansion, maxexpansion FROM typecilinders WHERE ${conditional} LIKE '%' || ? || '%' `;
    db.all(answer , searchCilinder , (err ,row)=>{
        if(err){
            console.log(err.message);
        }else{
            contentSearched.innerHTML="";
            // añade los resultados al html
            addResultsToHtml(row , contentSearched ); 
        }
    });
}
// logica del boton agregar nuevo cilindro
chargeNweClilinder.addEventListener("click" ,()=>{
ipcRenderer.send("evenNewCil" , 33);
window.close();
});
typeCilindersContent.addEventListener("click" , (e)=>{
    var getId = e.target.id;
    if(getId.charAt(0) == "E"){
        var clearId = getId.slice(1);
        localStorage.setItem("idTypeCil", clearId);
        ipcRenderer.send("modifyTypeCil");
        window.close();
    }
});