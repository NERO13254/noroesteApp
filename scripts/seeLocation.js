const sqlite = require("sqlite3");
const {ipcRenderer}  = require("electron");

const db = new sqlite.Database("db/db.db");
var quitSeeLocations = document.getElementById("quitSeeLocations");
var addLocation = document.getElementById("addLocation");
var locationsContent = document.getElementById("locationsContent");
var resultsContentSeach = document.getElementById("resultsContentSeach");

function pintInfo(divInsertInfo , getInfo){
    var div = document.createElement("div");
    div.className="contentDataPrinted";
    div.innerHTML = `
    <strong>${getInfo.name}</strong>
    <strong>${getInfo.cp}</strong>
    <input type="checkBox"  class="D${getInfo.id}" id="checkPut">
    `; 
    divInsertInfo.append(div);
}

function nextWindow(data){
    var getIdRows= data.target.className;
    if(getIdRows.charAt(0) == "D"){
         var clearVal = getIdRows.slice(1);
         localStorage.setItem("idLocation" , clearVal);
         ipcRenderer.send("modifyLocation");
         window.close();
    }
}

window.onload = ()=> {
    resultsContentSeach.style.display= "none";
    db.all("SELECT * FROM locations WHERE 1 " , (err, row)=>{
        if(err){
            console.log(err.message);
        }
        else{
            for (let i = 0; i < row.length; i++) {
                pintInfo(locationsContent , row[i]);
            }
        }
    });
}

addLocation.addEventListener("click" , ()=>{
    ipcRenderer.send("addNewLocation");
    window.close();
});
quitSeeLocations.addEventListener("click" , ()=>{
    window.close();
});
locationsContent.addEventListener("click" ,(e)=>{
    nextWindow(e);
});
resultsContentSeach.addEventListener("click" , (e)=>{
    nextWindow(e);
});

function searchLocations() {
    var searchText = document.getElementById("searchLocations").value;
    
    if(searchText.length > 3 ){
        resultsContentSeach.style.display= "block";


        db.all("SELECT id , name , cp FROM locations WHERE name LIKE '%' || ? || '%' ",[searchText],(err, row)=>{
            if(row.length <=0){
                resultsContentSeach.innerHTML = "";
            }else{
            var contentResults = row[0];
            resultsContentSeach.innerHTML = "";
            pintInfo(resultsContentSeach , contentResults);
            }
        });
    }
    else {
        if(searchText.length < 3 ){
            resultsContentSeach.style.display= "none";
        }
    }
}



