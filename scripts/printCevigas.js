const {ipcRenderer}     = require("electron");
const getDb             = require("../db/dbRed");
const db                = getDb.getDb(__dirname);
const path              = require("path");
const fs                = require("fs");
const loadDataInHtml    = require("../functtions/printCevigas/loadDataInHtml");
const dinamycData       = document.getElementById("dinamycData");
let containerAll        = document.getElementById("containerAll");
let saveChanges         = document.getElementById("saveChanges");
let printButton         = document.getElementById("printButton");
async function allAnswer(answer){
    return new Promise((resolve, reject) => {
        db.all(answer , (err, row)=>{
            if(err){
                console.log(err.message);
            }else{
                resolve(row);
            }
        })
    })
}
async function runAnswer(answer){
    return new Promise((resolve, reject) => {
        db.run(answer , (err)=>{
            if(err){
                console.log(err.message);
            }else{
                resolve();
            }
        })
    })
}

window.onload = async()=>{

    // inserta los datos de forma dinamica en el html
    await loadDataInHtml.loadDataInHtml();

    // lee los datos del txt del cevigas
    async function getReadData(){
        return new Promise((resolve, reject) => {
            fs.readFile("C:\\Users\\Usuario\\Desktop\\electron\\2\\cevigas.txt" ,'utf8' ,(err , row)=>{
                if(err){
                    console.log(err);
                }else{
                    resolve(row);
                }
            });
        })
    }
    const getData = await getReadData();
    let onlyDataObj = getData.split("\n");
    for (let i = 0; i < onlyDataObj.length; i++) {
        const element = onlyDataObj[i];
        let getOnlyData =element.split(":");

        let getElement = document.getElementById(getOnlyData[0]);
        // corrobora si existe el div y completa el div con la informacion
        if(getElement){
            let calculateWidth  = getOnlyData[0]=='brand' && getElement.textContent.split(" ").length>0  ? "50px" : "auto";
            getElement.style.left = `${getOnlyData[1].split(",")[0]}`;
            getElement.style.top = `${getOnlyData[1].split(",")[1]}`;
            getElement.style.fontSize = `${getOnlyData[1].split(",")[2]}`;
            getElement.style.width = calculateWidth
        }
    }
}

// indicador para identificar que se está moviendo un elemento
let ofsetX , ofsetY ;
let isDragging= false;
let elementContainer    = "";
let X                   = "";
let Y                   = "";
// al hacer click en un elemento del html este se puede arrastrar para modificar su posicion
containerAll.addEventListener("mousedown" , (e)=>{
    isDragging = true;
    if(e.target.tagName.toLowerCase() == "strong"){
        ofsetX= e.clientX - e.target.getBoundingClientRect().left;
        ofsetY = e.clientY - e.target.getBoundingClientRect().top;

        elementContainer = e.target;
    }
});
// al arastrar el mouse con el click presionado la ubicación se guarda
containerAll.addEventListener("mousemove" , (e)=>{
    if(isDragging){
        X = e.clientX -ofsetX + window.scrollX;
        Y = e.clientY -ofsetY + window.scrollY;
        elementContainer.style.left = `${X}px`;
        elementContainer.style.top = `${Y}px`;
    }
});
// al soltar el boton finaliza el proceso
containerAll.addEventListener("mouseup" , async()=>{
    isDragging = false;
    elementContainer = "";
    X = "";
    Y = "";
});
// guarda los cambios en el txt
saveChanges.addEventListener("click" , ()=>{
    // obtiene todas las ubicaciones de los strongs
    let getAllStrongs = document.querySelectorAll("strong");
    let getAllPositions = "";
    getAllStrongs.forEach(element=>{
        let createObj = `${element.id}:${window.getComputedStyle(element).getPropertyValue("left")},${window.getComputedStyle(element).getPropertyValue("top")} , ${window.getComputedStyle(element).getPropertyValue("font-size")} `;
        getAllPositions+=createObj+ '\n';
    });

    fs.writeFile("C:\\Users\\Usuario\\Desktop\\electron\\2\\cevigas.txt" , getAllPositions , (err)=>{
        if(err){
            console.log("error de escritura" + err);
        }
    });
});
// modifica el valor de "font-size al presionar la letra Control + el scroll"
let scrolledEelement = false
let getElement      = "";
document.addEventListener("keydown" , (e)=>{
    if(e.key == "Control"){
        scrolledEelement = true
    }
});
document.addEventListener("wheel" , (e)=>{
    if(scrolledEelement){
        // obtiene las posiciones del cursor
        let getLeft     = e.target.getBoundingClientRect().left;
        let getTop      = e.target.getBoundingClientRect().top;
        // obtiene el elemento del html segun las cordenadas y obtiene el atributo font-size
        getElement  = document.elementFromPoint(getLeft, getTop);
        let getFontSizeElement = parseInt(window.getComputedStyle(getElement).fontSize.replace(/[a-z]/g , ""));
        if(e.deltaY>0){
            getElement.style.fontSize = getFontSizeElement-1+"px";
        }else{
            getElement.style.fontSize = getFontSizeElement+1+"px";
        }
    }
});
document.addEventListener("keyup" , (e)=>{
    if(e.key == "Control"){
        scrolledEelement = false
    }
});
printButton.addEventListener("click" , async()=>{
    window.print();
    ipcRenderer.send("seeSavedCilinders");
    window.close();
});
