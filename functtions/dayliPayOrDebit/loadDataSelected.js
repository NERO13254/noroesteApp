const { answersContent } = require("./answers");
const dbRed                 = require("../../db/dbRed");
const { createEelement } = require("./createElement");
const db                    = dbRed.getDb(__dirname);

async function loadDataSelected(params) {
    document.getElementById("payDefault").innerHTML='';
    document.getElementById("egressDefault").innerHTML='';
    // obtiene los datos del día establecido
    db.run("BEGIN TRANSACTION");
        let defaultPay = await answersContent.collectData(params);
        let defaultEgress = await answersContent.defaultEgress(params);
    db.run("COMMIT");
    
    // inserta los datos de pago en el HTML
    if(defaultPay.length>0){
        
        defaultPay.forEach(element => {
            createEelement(element , document.getElementById("payDefault"))
        });
    }else{
        document.getElementById("payDefault").innerHTML='<strong class="noRegisters">No hay registros coincidientes del día '+params+'</strong>';
    }
    // inserta los pagos de debito en el HTML
    if(defaultEgress.length>0){
        defaultEgress.forEach(element=>{
            createEelement(element , document.getElementById("egressDefault"));
        });
    }else{
        document.getElementById("egressDefault").innerHTML='<strong class="noRegisters">No hay registros coincidientes del día '+params+'</strong>';
    }
}

module.exports = {
    loadDataSelected
}