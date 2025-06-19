const { getNameCtaCte, getOrders } = require("../answers");

async function insertDataInHtml() {
    // obtiene el nombre de la cuneta 
    let getNameCtaCteFunc =  await getNameCtaCte();
    // si se encuentran datos 
    if(getNameCtaCteFunc.length>0){
        //inserta en el HTML el nombre
        document.getElementById("clientCode").innerHTML = getNameCtaCteFunc[0]["name"];
    }
    // obtiene todos los movimientos de la cuenta corriente 
    let getOrdersFunc = await getOrders();
    // recorre los resultados 
    getOrdersFunc.forEach(element => {
        // crea un div 
        let div = document.createElement("div");
        div.className= "orderContainer";
        // evalua si el tramite es ph o no y cambia el formato
        let dateProd = element["obs"];
        if(dateProd.slice(0,2)=="pH"){
            let onlyData = dateProd.split(",");
            dateProd = `${onlyData[1]} , ${onlyData[2]} , ${onlyData[3]}`;
        }
        // agrega el movimiento al HTML
        div.innerHTML = `
        <p>${element["ordernum"]}</p>
        <p>${element["date"]}</p>
        <p class="obsP">${dateProd}</p>
        <p>$ ${parseInt(element["pay"]).toLocaleString()}</p>
        <p>$ ${parseInt(element["debit"]).toLocaleString()}</p>
        <p>$ ${(parseInt(element["total"])).toLocaleString()}</p>
        `;
        document.getElementById("rowContent").append(div);
    });

    // inserta el valor final 
    console.log();

    document.getElementById("totalAmount").innerHTML= parseInt(getOrdersFunc[0]["total"]).toLocaleString();
}

module.exports = {
    insertDataInHtml
}