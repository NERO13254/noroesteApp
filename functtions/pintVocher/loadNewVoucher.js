const { nameCtaCte, getLastVoucher } = require("./answers");
const runAndPrintContentVoucher = require("./runAndPrintContentVoucher");
async function loadNewVoucher(){
    // obtiene los datos del ultimo remito
    const getVoucherInfo        =  await getLastVoucher();
    // obtiene el nombre de la cuenta corriente    
    const getNameCtaCte         =  await nameCtaCte(localStorage.getItem("idCtaCte"));
    // inserta el nombre de la cta cte en HTML
    document.getElementById("clientNamedDb").textContent   =getNameCtaCte[0]["name"];
    // imrpime el nombre la fecha del cliente , el porcentaje de descuento y el valor final
    fullData.textContent = getVoucherInfo[0]["date"];
    // obtiene el descuento y  en caso de no haber lo setea a 0
    let discountVar = getVoucherInfo[0]["discount"]!="" ?  getVoucherInfo[0]["discount"] : 0 ; 
    // obtiene el ulimo numero de remito 
    let numberVoucherContent =getVoucherInfo.length>0 ? getVoucherInfo[0]["insideid"] : 1 ;
    // inserta el num de remito en el html
    idvoucher.textContent= numberVoucherContent;
    // obtiene el valor total
    let toObjectData = JSON.parse(getVoucherInfo[0]["content"]);
    let totalValue = toObjectData[toObjectData.length-2]["finVal"] ? toObjectData[toObjectData.length-2]["finVal"] : toObjectData[toObjectData.length-2]["totalvalue"] ;
    let totalContent = totalValue ? parseInt(totalValue) : 0;
    // inserta los valores de total y descuento en HTML
    discountContent.textContent = "%"+discountVar;
    document.getElementById("totalContent").textContent = "$"+totalContent.toLocaleString();

    //rellena el contenido del remito con los productos en caso de que no esté  vacio
    if(getVoucherInfo != 0) {
        runAndPrintContentVoucher.runAndPrintContentVoucher(getVoucherInfo);
    }
}

module.exports = {
    loadNewVoucher
}