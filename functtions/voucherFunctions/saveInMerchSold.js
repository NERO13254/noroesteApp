const { answers } = require("./answers")

async function saveInMerchSold(date) {
    // obtiene el numero de remito actual
    let voucherNumber = await answers.readInsideIdVoucher();
    voucherNumber = voucherNumber.length>0 ? parseInt(voucherNumber[0]["insideid"])+1 : 0;

    // recorre todos los productos y los inserta en mercaderia vendida
    let data = document.querySelectorAll("#listProdContent .contentProduct");

    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        console.log(i)
        let insideId    = element.children[0].textContent;
        let value       = element.children[3].textContent.replace(/\./g,"");
        let ammount     = element.children[4].tagName=="STRONG" ? 1 : element.children[4].value;
        let serial      =(element.children[4].tagName=="STRONG" && element.children[4].textContent.length>1) ? element.children[4].textContent : "NE"
        await answers.createMerchSold(`'${voucherNumber}','${insideId}','${value}','${ammount}','${serial}'`);
    }

}

module.exports = {
    saveInMerchSold
}