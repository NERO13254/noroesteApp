const { saveModifyVocuherFunc } = require("./saveModifyVocuherFunc");

async function saveVoucherModified(insideid) {
    // captura los datos del remito y lo actaliza en db

    await saveModifyVocuherFunc(insideid);

    // obtiene el valor total del remito anterior ej:($2.401.658) y le suma el nuevo valor total del remito
    let newValue = parseInt(document.getElementById("totalValueOfVoucher").textContent.replace(/\./g,""));
    let oldValue = parseInt(getTarget.parentNode.nextElementSibling.children[4].textContent.replace(/\./g,""));
    
    // obtiene el nuevo valor total final ej:(2.401.658+ 501695 = $2.903.353)
    let finalValue = oldValue + newValue;

    // // inserta el nuevo total en la sección de "total" de modificar remito
    document.getElementById("total").value = finalValue.toLocaleString();

    // // inserta el valor del remito en pago o debito segun corresponda
    document.getElementById("pay").value = newValue>0 ? newValue.toLocaleString() : 0;
    document.getElementById("debit").value = newValue<=0 ? Math.abs(newValue).toLocaleString() :0;
    enterKeyPress = true;

    // cierra la ventana de modificacion
    document.getElementById("modifyVoucherSaved").style.display="none";
}
module.exports = {
    saveVoucherModified
}