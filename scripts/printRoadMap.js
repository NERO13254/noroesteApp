const { ipcRenderer } = require("electron");
const { stat } = require("fs");
const sqlite        = require("sqlite3");
const db            = new sqlite.Database("db/db.db");
var insideId        = document.getElementById("insideId");
var omologationCode = document.getElementById("omologationCode");
var brand           = document.getElementById("brand");
var serialNumber    = document.getElementById("serialNumber");
var dateFab         = document.getElementById("dateFab");
var lastCrpc        = document.getElementById("lastCrpc");
var rules           = document.getElementById("rules");
var pressPh         = document.getElementById("pressPh");
var waterTemp       = document.getElementById("waterTemp");
var totalExp        = document.getElementById("totalExp");
var perExp          = document.getElementById("perExp");
var idCilinderSaved = localStorage.getItem("idCilinderSaved");
var statusContent   = document.getElementById("status");
var printRoadMap    = document.getElementById("printRoadMap");
var imgContent      = document.getElementById("imgContent");
var obsContent      = document.getElementById("obsContent");
var data            = document.getElementById("data");
var volCil          = document.getElementById("volCil");
var taraCil         = document.getElementById("taraCil");


function printValues(classSelect , arrayValues){
    // selecciona todos elementos que coincidan 
    let getElements = document.querySelectorAll(classSelect);
    // los recorre en bucle 
    for (let i = 0; i < getElements.length; i++) {
        const element = getElements[i];
        // le asigna el valor a cada elemento del html con un input de la misma cantidad de elementos
        element.innerHTML= arrayValues[i];
    }
}

db.all("SELECT insideid , omologation , brand , serialnumber , datefab , lastcrpc , rulefab , diametro1,diametro2, diametro3 ,diametro4,diametro5,diametro6,diametro7,ojiva1,ojiva2,ojiva3,ojiva4,ojiva5,ojiva6,fondo1,fondo2,fondo3,fondo4,fondo5,fondo6,diam1,diam2,diam3,diam4,diam5,diam6,watertemperature,expansiontotal,expansionpermanente, img , obs, chekeddate,volmedido,taramedido , status FROM cilindersaved WHERE id = ?", [idCilinderSaved],(err,row)=>{
    if(err){
        console.log(err.message);
    }else{
        insideId.textContent        = row[0]["insideid"];
        omologationCode.textContent = row[0]["omologation"];
        brand.textContent           = row[0]["brand"];
        serialNumber.textContent    = row[0]["serialnumber"];
        dateFab.textContent         = row[0]["datefab"];
        lastCrpc.textContent        = row[0]["lastcrpc"];
        rules.textContent           = row[0]["rulefab"];
        waterTemp.textContent       = row[0]["watertemperature"];
        totalExp.textContent        = row[0]["expansiontotal"];
        perExp.textContent          = row[0]["expansionpermanente"];
        volCil.textContent          = row[0]["volmedido"];
        taraCil.textContent         = row[0]["taramedido"];
        var status = "";
         
        console.log(row[0]["status"]);
        if(parseInt(row[0]["status"]) ==0){
            status = "APROBADO";
        }else{
            status = "CONDENADO";
        }

        statusContent.textContent = status;
        var divs    = document.createElement("img");
        divs.src    =  row[0]["img"];

        if(row[0]["img"] == null){
            imgContent.style.display="none";
        }else{
            imgContent.append(divs);
        }
        obsContent.innerHTML = row[0]["observaciones"];
        data.innerHTML= row[0]["chekeddate"];

        // array que se usa  para la siguiente funcion (debe tener la misma cantidad de valores que elementos html  7)
        let getDiametters = [row[0]["diametro1"],row[0]["diametro2"],row[0]["diametro3"],row[0]["diametro4"],row[0]["diametro5"],row[0]["diametro6"],row[0]["diametro7"]];
        // imprime todos los espesores en el html usando el array 
        printValues(".espessor" , getDiametters);

        let getOjive = [row[0]["ojiva1"],row[0]["ojiva2"],row[0]["ojiva3"],row[0]["ojiva4"],row[0]["ojiva5"],row[0]["ojiva6"]];
        printValues(".ojvie" , getOjive);

        let getUnder = [row[0]["fondo1"],row[0]["fondo2"],row[0]["fondo3"],row[0]["fondo4"],row[0]["fondo5"],row[0]["fondo6"]];
        printValues(".under" , getUnder);


        let getOvalation = [row[0]["diam1"], row[0]["diam2"],row[0]["diam3"],row[0]["diam4"],row[0]["diam5"],row[0]["diam6"],];
        printValues(".ov" , getOvalation);

        document.getElementById("obsContent").textContent = row[0]["obs"];
    }
});

printRoadMap.addEventListener("click", ()=>{
    window.print();
    ipcRenderer.send("seeSavedCilinders");
    window.close();
});
