async function printResultsInHtml(getProductDataDb) {
    // IMPRIME LOS VALORES SIMILARES EN PANTALLA 
    for (let i = 0; i < getProductDataDb.length; i++) {
        const element   = getProductDataDb[i];
        let div         = document.createElement("div");
        div.className   = "divProd";
        div.id          = "div"+i;
        div.innerHTML   = `
        <strong>${element["vouchernum"]}    </strong>
        <strong>${element["insideid"]}      </strong>
        <strong>$${element["value"]}        </strong>
        <strong>${element["ammount"]}       </strong>
        <strong>${element["serialnumber"]}  </strong>
        `;
        document.getElementById("listContent").append(div);
    }
    let productsList = document.querySelectorAll(".divProd");
    for (let i = 0; i < productsList.length; i+=2) {
        element = document.getElementById("div"+i);
        element.style.background="rgb(237, 237, 237)";
    }
}

module.exports = {
    printResultsInHtml
}