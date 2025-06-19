const {ipcRenderer}     = require("electron");
const dbRed             = require("../db/dbRed");
const db                = dbRed.getDb(__dirname);
const kitName           = document.getElementById("nameKit");
const listProducts      = document.getElementById("listProducts");
const addProd           = document.getElementById("addProd");
const containerSearch   = document.getElementById("containerSearch");
const alertContent      = document.getElementById("alertContent");
const saveKit           = document.getElementById("saveKit");
const deleteKit         = document.getElementById("deleteKit");
const valueKit          = document.getElementById("valueKit");

async function allAnswer(answer){
    return new Promise((resolve, reject) => {
        db.all(answer , (err, row)=>{
            if(err){console.log(err.message);}else{
                resolve(row);
            }
        })
    })
}
async function runAnswer(answer){
    return new Promise((resolve, reject) => {
        db.run(answer , (err,)=>{
            if(err){console.log(err.message);}else{
                resolve();
            }
        })
    })
}

// OBTIENE EL ID DEL LOCALSTORAGE ,realiza la consulta y imprime los datos en html
let getIdKitStorage = localStorage.getItem("kitSelected");

window.onload=async()=>{
    let getDataKit      = await allAnswer(`SELECT content , name, salevalue FROM kit WHERE id ='${getIdKitStorage}'`);
    let toObjet = JSON.parse(getDataKit[0]["content"]);
    listProducts.innerHTML="";
    kitName.value = getDataKit[0]["name"];
    valueKit.value= getDataKit[0]["salevalue"];
    for (let i = 0; i < Object.keys(toObjet).length; i++) {
        const element = toObjet[i];
        let div = document.createElement("div");
        div.id = "D"+ element["id"];
        div.className = "contentProduct";
        div.innerHTML= `
            <strong>${element["id"]}</strong>
            <strong>${element["name"]}</strong>
            <strong>${element["brand"]}</strong>
            <strong>${element["cost"]}</strong>
            <input type="number" value="${element["ammount"]}">
            <div class="containerInput">
                <p>X</p>
                <input type="checkbox" class="F${element["id"]}">
            </div>
        `;
        listProducts.append(div);
    }
}


  



// AÑADE EL EVENTO CLICK PARA ELIMINAR UN PRODUCTO SELECCIONADO DE LA LISTA
listProducts.addEventListener("click" , (e)=>{
    let getIdTaget = e.target.className;
    if(getIdTaget.charAt(0)=="F"){
        let getDiv = document.getElementById("D"+getIdTaget.slice(1));
        getDiv.remove();
    }
});

// AL PRESIONAR AÑADIR SE CREA UN BUSCADOR PARA SELECCIONAR UN NUEVO PRODUCTO Y QUE SE AÑADA A LA LISTA DE LOS PRODUCTOS
addProd.addEventListener("click" , ()=>{
    containerSearch.innerHTML="";
    let div         = document.createElement("div");
    div.className   = "searcherContent";
    div.innerHTML   = `
    <div class="contentSearch">
        <input type="text" id="searchInput" placeholder="BUSCAR . . . " onkeyup="startSeach()">
    </div>
    <div class="resultsContainer" id="resultsContainer">

    </div>
    `;
    containerSearch.append(div);

    // AÑADE EL LISTENER PARA EL DIV DONDE SE UBICAN LOS PRODUCTOS Y AL CLICKEARLO SE AÑADE EN LA LISTA DE GUARDADOS
    let resultsContainer= document.getElementById("resultsContainer");
    resultsContainer.addEventListener("click" , (e)=>{
        let getIdTarget = e.target.className;
        if(getIdTarget.charAt(0)=="A"){
            
            let getDivSelected = document.getElementById("Z"+getIdTarget.slice(1));
            let div = document.createElement("div");

            if(document.querySelector("#D"+getDivSelected.children[0].textContent)){
                alertContent.innerHTML="";
                let div = document.createElement("div");
                div.className="alert";
                div.innerHTML=`
                <strong>PRODUCTO YA EN LISTA</strong>
                `;
                alertContent.append(div);
            }else{
                alertContent.innerHTML="";
                div.id  ="D"+getDivSelected.children[0].textContent;
                div.innerHTML=`
                <strong>${getDivSelected.children[0].textContent}</strong>
                <strong>${getDivSelected.children[1].textContent}</strong>
                <strong>${getDivSelected.children[2].textContent}</strong>
                <strong>${getDivSelected.children[3].textContent}</strong>
                <input type="checkbox" class="F${getDivSelected.children[0].textContent}">
                `;
                listProducts.append(div);
            }

        }
    });
});

// FUNCION PARA BUSCAR LOS PRODUCTOS
async function startSeach(e){
    let searchData      = document.getElementById("searchInput").value;
    let resultsContainer= document.getElementById("resultsContainer");
    
    resultsContainer.innerHTML="";
    let getProductCoincideence= await allAnswer(`SELECT insideid , name  , brand , buyvalue, finalvalue FROM products WHERE name LIKE '%'|| '${searchData}' || '%' LIMIT 25 `);
    getProductCoincideence.forEach(element => {
        let divs = document.createElement("div");
        divs.id= "Z"+element["insideid"];
        divs.className="searchContent";
        divs.innerHTML = `
        <strong>${element["insideid"]}</strong>
        <strong>${element["name"]}</strong>
        <strong>${element["brand"]}</strong>
        <strong>${element["buyvalue"]}</strong>
        <strong>${element["finalvalue"]}</strong>
        <input type="checkbox"class="A${element["insideid"]}">
        `;
        resultsContainer.append(divs);
    }); 
}
// EVENTO CLICK PARA GUARDAR LOS CAMBIOS DEL KIT EN LA BASE DE DATOS Y VOVLER A LA PESTAÑA ANTERIOR
var savedOb = []; 
saveKit.addEventListener("click"  , async()=>{
    for (let i = 0; i < listProducts.children.length; i++) {
        const element   = listProducts.children[i];
        let insideid    = element.children[0].textContent;
        let name        = element.children[1].textContent;
        let brand       = element.children[2].textContent;
        let value       = element.children[3].textContent;
        let ammount     = element.children[4].value;

        console.log(ammount);
        let newObj ={
            id      : insideid  ,
            name    : name      ,
            brand   : brand     ,
            cost    : value     ,
            ammount : ammount
        }
        savedOb.push(newObj);

    }
    await runAnswer(`UPDATE kit SET name = '${kitName.value}' ,  content = '${JSON.stringify(savedOb)}'  , salevalue = '${valueKit.value}' WHERE id = '${getIdKitStorage}'`);
    ipcRenderer.send("openKits");
    window.close();
});

deleteKit.addEventListener("click" , async()=>{
    await runAnswer(`DELETE FROM kit WHERE id = '${getIdKitStorage}'`);
    window.close();
});