const { answers } = require("./answers");

async function removeSerial() {
    let data = document.querySelectorAll("#listProdContent #serialProduct");
    // obtiene el numero de remito actual
    let voucherNumber = await answers.readInsideIdVoucher();
    voucherNumber = voucherNumber.length>0 ? parseInt(voucherNumber[0]["insideid"])+1 : 0;

    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        
        let serial = element.children[4].textContent;

        await answers.deleteSerial(serial , element.children[4].textContent.trim());
    }
}

module.exports = {
    removeSerial
}