function runAndPrintContentVoucher(getData){
    // transforma el contenido del remito a JSON
    let getContentVoucher = JSON.parse(getData[0]["content"]);

    // variable que contiene el valor total sin porcentaje aplicado
    let totalValue = 0;
    getContentVoucher.forEach(element => {
        // aplica el if para filtrar los productos de el valor final y descuento    
        if(Object.keys(element).length>=3){
            // obtiene el valor del producto (si es un kit obtiene el valor final  pq no tiene
            // valueProd y le quita el "$" )
            let valueProd = element["valueProd"] ? element["valueProd"] : element["totalvalue"].slice(1);
            // lo mismo con la cantidad
            let ammounProd =  element["ammounProd"] ? element["ammounProd"] : 1;

            let onlyFinalTotal = parseInt(valueProd) * parseInt(ammounProd);
            totalValue+= onlyFinalTotal;

            let ammountOrSerial = element["serialName"] ? element["serialName"] : parseInt(ammounProd)
            let div = document.createElement("div");
            div.className = "contentProduct";
            div.innerHTML = `
            <strong></strong>
            <strong>${element["nameProd"]}</strong>
            <strong>$${parseInt(valueProd).toLocaleString()}</strong>
            <strong>${ammountOrSerial}</strong>
            <strong>$${onlyFinalTotal.toLocaleString()}</strong>
            `;
            productContent.append(div);
        }
    });

    document.getElementById("finalNotPercent").textContent = "$"+totalValue.toLocaleString();

}

module.exports = {
    runAndPrintContentVoucher
}