const { ipcRenderer } = require("electron");
const sqlite3           = require("sqlite3");
const db                = new sqlite3.Database("db/db.db");
const getDataFromLocal  = localStorage.getItem("printTechnicalFile");
const getData           = getDataFromLocal.split(",");
console.log(getData);
const idCilinderSaved   = localStorage.getItem("idCilinderSaved");


const obleaAnterior     = document.getElementById("obleaAnterior");
const brand             = document.getElementById("brand");
const model             = document.getElementById("model");
const year              = document.getElementById("year");
const domain            = document.getElementById("domain");
const inyeccionYes      = document.getElementById("inyeccion"); 
const inyeccionNo       = document.getElementById("inyeccionNo");
const nameAndSurname    = document.getElementById("nameAndSurname");
const street            = document.getElementById("street");
const numberStreet      = document.getElementById("numberStreet");
const cp                = document.getElementById("cp");
const locality          = document.getElementById("locality");
const province          = document.getElementById("province");
const dni               = document.getElementById("dni");
const regCode1          = document.getElementById("regCode1");
const regSerial1        = document.getElementById("regSerial1");
const regCode2          = document.getElementById("regCode2");
const regSerial2        = document.getElementById("regSerial2");
const regCode3          = document.getElementById("regCode3");
const regSerial3        = document.getElementById("regSerial3");
const codeCil1          = document.getElementById("codeCil1");
const serialNumCil1     = document.getElementById("serialNumCil1");
const printData         = document.getElementById("printTechnicalFile");
// OBTENER LOS DATOS PRINCIPALES DEL CILINDRO Y CLIENTE
db.all("SELECT insideid , omologation , country , cp , direccion , dni , nameandsurname , provincia FROM cilindersaved WHERE id = ? " , [idCilinderSaved] , (err , row)=>{
    if(err){
        console.log(err.message);
    }else{
        let getData         = row[0];
        cp.textContent              = getData["cp"];
        street.textContent          = getData["direccion"].toUpperCase();
        dni.textContent             = getData["dni"];
        nameAndSurname.textContent  = getData["nameandsurname"].toUpperCase();
        province.textContent        = getData["provincia"].toUpperCase();
        codeCil1.textContent        = getData["omologation"].toUpperCase();
        serialNumCil1.textContent   = getData["insideid"];
    }
});

obleaAnterior.textContent   = getData[0];
brand.textContent           = getData[1].toUpperCase();
model.textContent           = getData[2].toUpperCase();
year.textContent            = getData[3];
domain.textContent          = getData[4].toUpperCase();
// SI ES YES SIGNIFICA QUE ES INYECCIN
if(getData[5]=="yes"){
    inyeccionNo.textContent = "";
}
if(getData[5]=="no"){
    inyeccionYes.textContent = "";
}
//  SI TIENE UN REGULADOR NUEVO 
if(getData[11]!= "" && getData[12] !=""){
    regCode1.textContent    = getData[11];
    regSerial1.textContent  = getData[12];

    regCode2.textContent    = getData[9];
    regSerial2.textContent  = getData[10];

    regCode3.textContent    = "";
    regSerial3.textContent  = "";
}
// Y SI NO TIENE REGULADOR NUEVO
if(getData[11]=="" && getData[12]==""){
    regCode1.textContent    = getData[9];
    regSerial1.textContent  = getData[10];

    regCode2.textContent    = "";
    regSerial2.textContent  = "";

    regCode3.textContent    = "";
    regSerial3.textContent  = "";
}
// FILTRA TODOS LOS ELEMENTOS CILINDRO Y HACE UN BUCLE FOR PARA IMPRIMIRLOS POR PANTALLA SEGUN LA CANTIDAD DE CILINDROS
let filteredData = getData.filter(data => data.charAt(0) == "C" );
console.log(filteredData);
let filterInsideIds= getData.filter(data =>data.charAt(0) == "c");

document.getElementById("containerDivisCils").innerHTML="";
for (let i = 1; i <= filteredData.length ; i++) {
    
    let div = document.createElement("strong");
    let str = document.createElement("strong");
    str.style.marginBottom= "10px";
    str.innerHTML = filterInsideIds[i-1].slice(1).toUpperCase();
    div.innerHTML=filteredData[i-1].slice(1).toUpperCase();

    document.getElementById("containerDivisCils").append(div);
    document.getElementById("containerDivisCils").append(str);
}

let filterVal = getData.filter(data => data.charAt(0) == "V");
let filterVal2 = getData.filter(data => data.charAt(0) == "v");
document.getElementById("valvsContainerAll").innerHTML="";
for (let i = 1; i <= filterVal.length; i++) {
    let  div = document.createElement("div");
    div.className="valvContainer";
    div.innerHTML=`
        <strong>${filterVal[i-1].slice(1)}</strong>
        <strong>${filterVal2[i-1].slice(1)}</strong>
    `;
    document.getElementById("valvsContainerAll").append(div);
    
}

printData.addEventListener("click" , ()=>{
    ipcRenderer.send("printHtml" , "IMPRIMIR HOJA DE RUTA");
    //ipcRenderer.send("seeSavedCilinders");
    //window.close();
});
