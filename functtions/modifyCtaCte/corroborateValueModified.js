const { reportStatus } = require("../reportStatus");

async function corroborateValueModified(getTarget) {
    // obtiene el valor de pago por defecto y el modificado
    let pagoDefault    = parseInt(getTarget.parentNode.children[2].textContent.replace(/\./g, ""));
    let pagoMoficado = parseInt(debit.value.replace(/\./g,""));
    // obtiene el valor de deuda por defecto y el modificado
    let deudaDefault  = parseInt(getTarget.parentNode.children[3].textContent.replace(/\./g, ""));
    let deudaModificada = parseInt(pay.value.replace(/\./g,""));

    let deuda = (deudaModificada!=0 && pagoMoficado==0  || deudaModificada!=0 && pagoMoficado==pagoDefault) ? true : false;
    let paga  = (pagoMoficado!=0 && deudaModificada==0  || pagoMoficado!=0 && deudaModificada==deudaDefault) ? true : false;
    
    if(deuda){
        debit.value = 0;
        getInputValueContent = deudaModificada;
    }else if(paga){
        pay.value = 0;
        getInputValueContent =pagoMoficado *-1;
    }else{
        finishSentence = false;
        reportStatus("Error" , "No se puede actualizar la información", "los valores ingresados son invalidos , corrobore que alguno de los dos campos de pagos y debitos esté en 0 , que el valor que se intenta modificar no sea igual al anterior para poder actualizar correctamente la información",1,["Aceptar"],["canelProcess"], alertContent)
    }

}

module.exports = {
    corroborateValueModified
}