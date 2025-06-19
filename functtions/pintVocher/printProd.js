// recibe el objeto guardado de la base  de datos remitos 
function getAndPrintProducts(data , discount){
    // convierte el dato en Json
    let toObjectData    = JSON.parse(data);
    let fialValue       = toObjectData[0]["totalvalue"];
    finalNotPercent.textContent = fialValue.toLocaleString();
   
    // imprime el valor total sin aplicar el descuento
    finalNotPercent.textContent = "$"+ fialValue.toLocaleString();
    // si existe descuento lo calcula y lo aplica
    if(discount!==""|| discount!= 0|| discount != null || discount != undefined){
        fialValue  = Math.round(fialValue - fialValue*discount/100);
    } 
    if(discount===""){
        // si no hay descuento lo toma como 0
        discount = 0;
    }
    // inserta el valor de descuento en el html
    discountContent.textContent= "-"+discount;


    // bucle for para recorrer el json
    for (let i = 0; i < toObjectData.length; i++) {
        const element = toObjectData[i];
        // crea un div con strong adentro que contienen los datos y los añade al html
        let div = document.createElement("div");
        // identiica si es una serie o no , en caso de que lo sea reemplaza la cantidad *1
        div.className = "contentProduct";
        let ammuntOrSerial = "";
        let totalVal       = 0;
        let onlyAmmount    = 1;
        if(element["ammounProd"].charAt(0)=="|"){
            ammuntOrSerial = element["ammounProd"].slice(1);
            totalVal =  Math.round(element["valueProd"] * 1);
        }else{
            // si no es una serie no toca la cantidad y multiplica por la cantidad correcta
            onlyAmmount  = element["ammounProd"];
            ammuntOrSerial =  element["ammounProd"];
            totalVal =  Math.round(element["valueProd"] * element["ammounProd"]);
        }
        // añade el producto al html
        div.innerHTML = `
        <strong>${element["insideid"]}</strong>
        <strong>${element["nameProd"]}</strong>
        <strong>${parseInt(element["valueProd"]).toLocaleString()}</strong>
        <strong>${ammuntOrSerial}</strong>
        <strong>${totalVal.toLocaleString()}</strong>
        `;
        productContent.append(div);
    }


    // inserta el valo total con el descuento aplicado
    totalContent.textContent = "$"+ fialValue.toLocaleString();
}
module.exports = {
    getAndPrintProducts
}