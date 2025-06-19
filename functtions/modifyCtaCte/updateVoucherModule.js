const { corroborateVoucherDataPh } = require("./corroborateVoucherDataPh");
const { refreshHistoryVucherList } = require("./refreshHistoryVucherList");

async function updateVoucherModule() {
    // obtiene el valor base que fue modiicado ej : si se cambió 16.010 obtiene 16.000 (el valor original)
    let getNumber = 0;
    // evalua el pago por defecto
    if(parseInt(getTarget.parentNode.children[2].textContent)!=0){
        getNumber = parseInt(getTarget.parentNode.children[2].textContent.replace(/\./g,"")) *-1;
    }else{
        // evalua la deuda por defecto
        getNumber = parseInt(getTarget.parentNode.children[3].textContent.replace(/\./g,""));
    }
    // obtiene el valor total del remito modificado
    let getModifiedTotal = parseInt(document.getElementById("total").value.replace(/\./g,""));

    // actualiza el valor del remito en db y refresca la lista del historial de remitos
    await refreshHistoryVucherList(getTarget, getModifiedTotal);
}

module.exports = {
    updateVoucherModule
}