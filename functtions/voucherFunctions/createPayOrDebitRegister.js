const { answers } = require("./answers")

async function createPayOrDebitRegister(completeDate) {

    // obteine el ultimo numero de remito +1
    let voucherNumber = await answers.readInsideIdVoucher(); 
    
    voucherNumber = voucherNumber.length>0 ? parseInt(voucherNumber[0]["insideid"])+1 : 0;

    // obtiene el valor total del remito anterior
    let lastEndTotal = await answers.readLastVoucherCtaCte(localStorage.getItem("idCtaCte"));
    lastEndTotal = lastEndTotal.length>0 ? parseInt(lastEndTotal[0]["total"]) : 0;
    
    // obtiene el valor total y lo almacena en una variable pago o debito segun corresponda
    let totalValue = parseInt(document.getElementById("totalValue").textContent.replace(/\./g,""))

    let pay = 0 , debit=0;
    if(totalValue>0){
        pay = totalValue;
    }
    else{
        debit = totalValue;
    }
    
    // inserta el registro en pagos y debitos

    let obs = "RMTO "+ voucherNumber
    let owner = localStorage.getItem("idCtaCte");
    await answers.createPayOrDebitRegister(`'${completeDate}','${obs}','${debit}','${pay}','${totalValue+lastEndTotal}','${owner}'`);

}

module.exports = {
    createPayOrDebitRegister 
}