const {ipcRenderer} = require("electron");
const sqlite3       = require("sqlite3");
const db            = new sqlite3.Database("db/db.db");
const searchResuts  = document.getElementById("searchResuts");
const alertHtml     = document.getElementById("alert");
const saveKit       = document.getElementById("saveKit");
const kitList       = document.getElementById("kitList");
const finalValue    = document.getElementById("finalValue");
const nameKit       = document.getElementById("nameKit");
const searchProdFor = document.getElementById("searchProdFor");
const backToKits    = document.getElementById("backToKits");
var   cost          = parseInt(document.getElementById("cost").textContent);
var   saleValue     = document.getElementById("saleValue");

function printInHtml(id , nameId , brand , costVal , finval  , conditionalVar){
    let div = document.createElement("div");
    div.className   = "productsContent";
    div.id          = id;
    
    div.innerHTML= `
    <strong id="I${id}" class="${id}">${id}</strong>
    <strong id="N${id}">${nameId}</strong>
    <strong id="B${id}">${brand}</strong>
    <strong id="C${id}">$${costVal}</strong>
    <strong id="F${id}">$${finval}</strong>
    <input type="checkbox" class="S${id}" ">
    `;

    if(conditionalVar == "listSaved"){
        console.log(div);
        let inpt = document.createElement("input");
        inpt.type="number";
        inpt.value=1;
        div.append(inpt);
    }
    searchResuts.append(div);
}
function alerts(message){
    
    alertHtml.innerHTML="";
    let alert = document.createElement("div");
    alert.className="alertProd";
    alert.innerHTML=`
        <strong>${message}</strong>
    `;
    alertHtml.append(alert);
}
// ESTA FUNCION RESTA  LOS VALORES CUANDO LOS PRODUCTOS SON ELIMINADOS
function clearVals(data , ammnt , total ,inner){
    let costV   = document.getElementById(data).textContent.slice(1);
    let clearCst= parseInt(total) - parseInt(costV*ammnt);
    inner.textContent = "$"+ clearCst ;
}
// ESTA FUNCION BUSCA LOS PRODUCTOS DE LA BASE DE DATOS Y LOS IMPRIME EN PANTALLA
var number = 0;

function startSearch(){

    
    if(searchProdFor.value == "name"){
        conditional = "name";
    }else{
        conditional = "insideid";
    }
    let searchProducts = document.getElementById("searchProducts").value;

    let answer = `SELECT id, insideid,  name , brand, buyvalue, finalvalue FROM products WHERE ${conditional} LIKE '%'|| ? || '%' LIMIT 15`

    db.all(answer , [searchProducts.toUpperCase()] , (err , row)=>{
        if(err){
            console.log(err.message);
        }else{
            searchResuts.innerHTML="";
            for (let i = 0; i < row.length; i++) {
                // IMPRIME LOS DATOS EN EL HTML
                const element = row[i];
                let nme = element["finalvalue"];
                printInHtml(element["insideid"], element["name"],element["brand"] ,element["buyvalue"] ,element["finalvalue"] , ""  );    

            }
        }
    });
}
function seletedFun(){
    console.log("hola");
}
// OBTIENE LOS VALORES DE LA LISTA IMPRESA ANTERIORMENTE Y LOS IMPRIME EN LA LISTA DE PRODUCTOS SELECCIONADOS 
searchResuts.addEventListener("click" , (e)=>{
    let getNameTarget = e.target.className;
    console.log(getNameTarget);
    if(getNameTarget.charAt(0)=="S"){
        // CORROBORA QUE EL PRODUCTO NO ESTÈ EN LA LISTA PARA AGREGARLO
        if(kitList.querySelector("#"+getNameTarget.slice(1))){
            alerts("YA EN LISTA");
        }else{
            // OBTIENE EL PRODUCTO SELECCIONADO 
            let getProduct  = document.getElementById(getNameTarget.slice(1));
            // LO CLONA DE LA LISTA DE BUSQUEDA Y LE AÑADE UN BOTON , UN INPUT Y ELIMINA EL CHECBOX QUE TRAÌA
            let cloneProd   = getProduct.cloneNode(true);
            let ammountVal  = document.createElement("input");
            ammountVal.type = "number";
            ammountVal.value= 1;
            ammountVal.id   = "a"+getNameTarget.slice(1);
            let createBtn   = document.createElement("button");
            createBtn.innerHTML = "X";
            createBtn.id    = "X"+getNameTarget.slice(1);
            let getLastChild=  cloneProd.lastElementChild;
            cloneProd.replaceChild(ammountVal , getLastChild);
            cloneProd.append(createBtn);
            kitList.append(cloneProd);
            // OBTIENE LOS VALORES DE COSTO Y VENTA DEL PRODUCTO PARA SUMARLO
            let costVal     = cloneProd.children[3].textContent.slice(1);
            let saleVal    = cloneProd.children[4].textContent.slice(1);
            alertHtml.innerHTML="";
            // SUMA TODOS LOS VALORES DE COSTO Y LOS IMPRIME EN EL TOTAL COSTO
            number          = cost + number + parseInt(costVal);
            console.log(saleVal);
            document.getElementById("cost").textContent = "$"+number;
            saleValue.textContent                       = "$"+parseInt(saleValue.textContent + saleVal);
            // LISTENER PARA OBTENER LOS VALORES ANTERIORES DE CANIDAD ,COSTO Y VENTA
            ammountVal.addEventListener("focus" , (e)=>{
                let getId       = e.target.id;
                let getCost     = document.getElementById("C"+getId.slice(1)).textContent.slice(1);
                let getSaleVal  = document.getElementById("F"+getId.slice(1)).textContent.slice(1);
                let oldAmmount  = document.getElementById("a"+getId.slice(1)).value;
                // VALORES DE COSTO Y VENTA A LOS CUALES SE LE RESTA EL VALOR ANTERIOR OBTENIDO
                let printOldCst = oldAmmount* getCost - costVal;
                let printOldSle = oldAmmount* getSaleVal - saleVal;
                
                // OBTIENE LOS NUEVOS VALORES DEL INPUT Y GENERA LOS NUEVOS VALORES DE COSTO Y VENTA
                ammountVal.addEventListener("keyup", (f)=>{
                    let newAmmount  = parseInt(document.getElementById("a"+getId.slice(1)).value);
                    // CORROBORAR SI EL INPU ESTÀ VACIO O NO
                    if(isNaN(newAmmount)){
                        console.log("NO ES UN NUMERO");
                    }else{
                        // OBTIENE LOS NUEVOS VALORES
                        let newCost     = newAmmount * getCost + printOldCst;
                        let newSale     = newAmmount * saleVal + printOldSle;
                        // IMPRIME EN EL HTML LOS NUEVOS VALORES
                        let cost = document.getElementById("cost");
                        cost.textContent        = "$"+newCost;
                        saleValue.textContent   = "$"+newSale;
                    }
                    
                });
            });
        }
    }
});

// AÑADE EL EVENTO CLICK A LA LISTA DE PRODUCTOS AGREGADOS Y  REMUEVE EL  PRODUCTO CLICKEADO
kitList.addEventListener("click" , (e)=>{
    let getId           = e.target.id;
    if(getId.charAt(0)=="X"){
        // VALORES DE 1)CANTIDAD 2)COSTO 3)VENTA
        
        let ammnt   = document.getElementById("a"+getId.slice(1)).value;
        let cost    = document.getElementById("cost");
        let sale    = document.getElementById("saleValue");
        // ELIMINA EL VALOR DE COSTO
        clearVals("C"+getId.slice(1) , ammnt ,parseInt(cost.textContent.slice(1)) , cost );
        // ELIMINA EL VALOR DE VENTA
        clearVals("F"+getId.slice(1) , ammnt ,parseInt(sale.textContent.slice(1)) , sale );
        kitList.querySelector("#"+getId.slice(1)).remove();
    }

});

// RECOGE TODOS LOS ELEMENTOS DE LA LISTA Y LOS AÑADE AL ARRAY DE OBJETOS
var obKit= [];
saveKit.addEventListener("click" , ()=>{
    if(kitList.children.length ==0){
        alerts("NO HAY PRODUCTOS EN LA LISTA");
    }else{
        if(finalValue.value.length==0){
            alerts("NO SE ESPECIFICO EL VALOR DE VENTA");
        }else{
            for (let i = 0; i < kitList.children.length; i++) {
                const element   = kitList.children[i];
                let insideId    = element.children[0].textContent;
                let nameProod   = element.children[1].textContent;
                let brandProd   = element.children[2].textContent;
                let costProd    = element.children[3].textContent.slice(1);
                let ammount   = element.children[5].value;
                console.log(ammount);
           
                let createObj = {
                    id      : insideId  ,
                    name    : nameProod ,
                    brand   : brandProd ,
                    cost    : costProd  ,
                    ammount : ammount
                }
                obKit.push(createObj);
            }
            let cost = document.getElementById("cost").textContent.slice(1);
            db.run("INSERT INTO kit (name , costvalue , content ,salevalue )VALUES(?,?,?,?) ", [nameKit.value , cost , JSON.stringify(obKit) , finalValue.value] , 
            (err)=>{
                if(err){
                    console.log(err.message);
                }else{
                    ipcRenderer.send("openKits");
                    window.close();
                }
            }
        )
        }
    }
});

backToKits.addEventListener("click" , ()=>{
    ipcRenderer.send("openKits");
    window.close();
});

