async function printVoucherProductsInHtml(voucherData) {
    // obtiene el contenido del remito desde DB y lo transforma a json
    let contentVoucher= voucherData;
    console.log(contentVoucher);



    // recorre el json evitando los ultimos 2 datos y lo imprime en el HTML
    for (let i = 0; i < contentVoucher.length-2; i++) {
        const element = contentVoucher[i];
        let serialContent = element["serialName"] ? element["serialName"] : "";
        let contentSerial = element["serialName"] ? '<strong id="ammounProd">1</strong>' : `<input type='number' value='${element["ammounProd"]}' id='ammounProd'>`
        let insideidProd  = element["insideid"] ? element["insideid"] : "";
        contentSerial = (!element["insideid"] || element["insideid"]=="") ? '<strong id="ammounProd">1</strong>' : contentSerial;
        let valueProdContent = (!element["insideid"] || element["insideid"]=="") ? parseInt(String(element["totalvalue"]).slice(1)).toLocaleString(): parseInt(element["valueProd"]).toLocaleString();
        let totalValueContent = (!element["totalvalue"] || element["totalvalue"]=="") ? valueProdContent : parseInt(String(element["totalvalue"]).slice(1)).toLocaleString();
    
        let div = document.createElement("div");
        div.className= "productContent";
        div.innerHTML = `
        <strong id='insideid'>${insideidProd}</strong>
        <strong id='nameProd'>${element["nameProd"]}</strong>
        ${contentSerial}
        <strong id='valueProd'>${valueProdContent}</strong>
        <strong id='totalvalue'>${totalValueContent}</strong>
        <strong id='serialName'>${serialContent}</strong>
        <input type='button' value='X' class='removeItemOfTheList'>
        `;
        document.getElementById("listProducts").append(div);
    }

    // inserta los valores de total y descuento
    document.getElementById("totalValueOfVoucher").textContent = parseInt(contentVoucher[parseInt(contentVoucher.length)-2]["finVal"]).toLocaleString();
    
    let lastValue = contentVoucher.length-1;
    document.getElementById("descountInput").value = contentVoucher[lastValue]["discount"];
}

module.exports = {
    printVoucherProductsInHtml
}