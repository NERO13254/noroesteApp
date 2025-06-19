const {ipcRenderer}     = require("electron");
const getDb             = require("../db/dbRed");
const db                = getDb.getDb(__dirname);
const axios             = require("axios");
const sendPostApi       = require("../functtions/API/updateProductApi");
const quitModifyProd    = document.getElementById("quitModifyProd");
const saveProduct       = document.getElementById("saveProduct");
const inputContent      = document.getElementById("inputContent");
const alertContainer    = document.getElementById("alertConainer");
let getData             =localStorage.getItem("productsValues");
const dataToObjet       = JSON.parse(getData);
// ALERTA
function runAlert(message){
    let div = document.createElement("div");
    div.className="alertContainer";
    div.innerHTML= `<strong>${message}<strong>`;
    alertContainer.append(div);
}
// FUNCION PARA ACTUAIZAR PRODUCTOS
function runUpdate(data1, data2, data3, data4,data5,dataSerial,data6){
    db.run("UPDATE products SET insideid =? , name=? , brand=? , finalvalue=? , existence=?, serial=? WHERE insideid=?",
    [data1, data2, data3, data4,data5,dataSerial,data6] , (err)=>{
        if(err){console.log(err.message)}else{
            console.log("acrualizado");
        }
    });
}
// BUCLE PARA AÑADIR INPUTS EN EL HTML
for (let i = 1; i <= 7; i++) {
    let div = document.createElement("div");
    div.className= "containerInput";
    console.log(dataToObjet[i-1][Object.keys(dataToObjet[i-1])]);
    if(dataToObjet[i-1][Object.keys(dataToObjet[i-1])].charAt(0)=="+"){
        div.innerHTML=`
        <label for='addImgButton'>AÑADIR IMAGEN</label>
        <button id='addImgButton'>+</button>
        `
    }else{
        div.innerHTML= `
        <label>${Object.keys(dataToObjet[i-1])}</label>
        <input type="text" id="data${i}" value="${dataToObjet[i-1][Object.keys(dataToObjet[i-1])]}" class="infoContent">
        `;
    }
    inputContent.append(div);
}
// AL DARLE CLICK EN AÑADIR IMG REDIRIGE A LA SECCION DE IMAGENES
let getButton = document.getElementById("addImgButton");
getButton.addEventListener("click" , ()=>{
    let insideId = document.getElementById("data5").value;
    localStorage.setItem("imgProductImg",insideId );
    ipcRenderer.send("addImgForProduct");
    window.close();
});

// SALIR DE LA VENTANA
quitModifyProd.addEventListener("click" , ()=>{
    ipcRenderer.send("backToListProducts");
    window.close();
});
// FUNCION PARA GUARDAR EL PRODUCTO
saveProduct.addEventListener("click" , ()=>{
    let getData = document.querySelectorAll(".infoContent");
    let toString = [];

    getData.forEach(data =>{
        toString.push(data.value); 
    });
    // CONVIERTE LOS DATOS EN JSON PARA ENVIARLOS A LA API DE LA WEB
    let dataToJson = {"insideid" : `${toString[4]}` , "name" : `${toString[0]}`, "brand": `${toString[1]}`, "finalvalue":`${toString[2]}`}
    if(toString[4] != dataToObjet[4]["codigo_interno"] ){
        db.all("SELECT insideid FROM products WHERE insideid=?" , [toString[4]] , (err , row)=>{
            if(err){console.log(err.message)}else{
                if(row.length==0){
                    alertContainer.innerHTML="";
                    runUpdate(toString[4] , toString[0] , toString[1] , toString[2] , toString[3], toString[5], dataToObjet[4]["codigo_interno"]);
                    console.log(toString);
                    console.log("de linea 54");
                    
                    // ENVIAR LOS DATOS A LA API E IMPRIME LO QUE LE ENVIAMOS 
                    //sendPostApi.sendPutApi(dataToJson);
                }else{
                    runAlert("EL CODIGO DE PRODUCTO YA EXISTE");
                }
            }
        });
    }else{
        alertContainer.innerHTML="";
        console.log(toString[4] , toString[0] , toString[1] , toString[2] , toString[3] , toString[5] );
        runUpdate(toString[4] , toString[0] , toString[1] , toString[2] , toString[3] , toString[5],dataToObjet[4]["codigo_interno"]);
        console.log(toString);
        console.log("de linea 67");
        
        // ENVIA LOS DATOS A LA API DE LA WEB
        sendPostApi.sendPutApi(dataToJson);
    }
});