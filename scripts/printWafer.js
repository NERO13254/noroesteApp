const { ipcRenderer }       = require("electron");
const dbRed                 = require("../db/dbRed");
const path                  = require("path");
const fs                    = require("fs");
const db                    = dbRed.getDb(__dirname);
const saveChanges           = document.getElementById("saveChanges");
const printSheet            = document.getElementById("printSheet");

const elementsContainer = document.getElementById("elementsContainer");
// obtiene los datos del storage que desean ser impresos
let getDataWafer = JSON.parse(localStorage.getItem("waferDataSavedInObject"));
// se añaden todos los elementos al html
getDataWafer.forEach(element => {
    let valuesElement   = element[`${Object.keys(element)}`];
    let keysElement     =  Object.keys(element);

    let div = document.createElement("strong");
    div.id = keysElement;
    div.className = "pMove";
    div.textContent = valuesElement.toUpperCase();
    elementsContainer.append(div);
});
async function getReadData(){
    return new Promise((resolve, reject) => {
        fs.readFile("C:\\Users\\Usuario\\Desktop\\electron\\2\\ubicaciones.txt" ,'utf8' ,(err , row)=>{
            if(err){
                console.log(err);
            }else{
                resolve(row);
            }
        });
    })
}

window.onload = async()=>{
    // // realiza la lectura del archivo txt y retorna el valor mediante resolve

    // almacena el valor retornado en una constante para realizar un for para buscar el valor ddesdeado
    const getData = await getReadData();
    let onlyDataObj = getData.split("\n");
    for (let i = 0; i < onlyDataObj.length; i++) {
        const element = onlyDataObj[i];
        let getData =element.split(":");
        let getElement = document.getElementById(getData[0]);
        if(getElement){
           getElement.style.left = `${getData[1].split(",")[0]}`;
           getElement.style.top = `${getData[1].split(",")[1]}`;
        }
    }
}

saveChanges.addEventListener("click" , ()=>{
    let getAllElements = document.querySelectorAll(".pMove");
    let getAllPositions = "";
    getAllElements.forEach(element => {

        let createObj = `${element.id}:${window.getComputedStyle(element).getPropertyValue("left")},${window.getComputedStyle(element).getPropertyValue("top")}`;
        getAllPositions+=createObj+ '\n';
    });

    fs.writeFile("C:\\Users\\Usuario\\Desktop\\electron\\2\\ubicaciones.txt" , getAllPositions , (err)=>{
        if(err){
            console.log("error de escritura" + err);
        }
    })
});

let ofsetX , ofsetY ;
let isDragging          = false;
let elementContainer    = "";
let txtDirName          = path.join(__dirname,"ubicaciones.txt");
let X                   = "";
let Y                   = "";
// al hacer click en un elemento del contenedor principal se captura la posición del cursor y la del div
elementsContainer.addEventListener("mousedown" , (e)=>{
    if(e.target.className == "pMove"){
        isDragging = true;
        ofsetX= e.clientX - e.target.getBoundingClientRect().left;
        ofsetY = e.clientY - e.target.getBoundingClientRect().top;

        elementContainer = e.target;
    }
});

document.addEventListener("mousemove" , (e)=>{
    if(isDragging){
        X = e.clientX -ofsetX;
        Y = e.clientY -ofsetY;

        elementContainer.style.left = `${X}px`;
        elementContainer.style.top = `${Y}px`;
    }
});

document.addEventListener("mouseup" , async()=>{
    isDragging = false;
    elementContainer = "";
    X = "";
    Y = "";
});

printSheet.addEventListener("click" , ()=>{
    window.print();
    window.close();
});

window.addEventListener("beforeunload" , ()=>{
    ipcRenderer.send("seeSavedCilinders");
    window.close();
});