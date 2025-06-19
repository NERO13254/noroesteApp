const { answers } = require("./answers");


// funcion que retorna todas las existencias
async function readExistences(insideid , ammount){
    let allSerials = await answers.readAllExistences(insideid);
    
    let existence   = allSerials.length>0? parseInt(allSerials[0]["existence"]) : 0;
    let billed      = allSerials.length>0? parseInt(allSerials[0]["billed"]) : 0
    
    existence = (billed>0 && billed-ammount>=0) ? existence : existence-ammount;
    billed = (billed>0 && billed-ammount>=0) ? billed-ammount : billed ;

    return [existence , billed]
}

async function refreshExistences() {
    var voucherNumber = await answers.readInsideIdVoucher();
    voucherNumber = voucherNumber.length>0 ? parseInt(voucherNumber[0]["insideid"])+1 : 0;

    let allData = document.querySelectorAll(".contentProduct");

    allData.forEach(async(element)=>{
        // recorre cada elemento de la lista y obtiene sus existencias facturado y no facturado
        let insideid = element.children[0].textContent;
        let ammount = element.children[4].tagName=="INPUT" ? element.children[4].value : 1;
        let existences = await readExistences(insideid , ammount );
        let existence   = existences[0];
        let billed      = existences[1];


        // evalua si es un kit y descuenta la cantidad de los productos que tiene incluidos el kit
        if(element.children[4].tagName=="STRONG" && element.children[4].textContent==1){
            let kitContent = await answers.readAllKits();
            kitContent = kitContent.length>0 ? Array.from(kitContent) : [{}];

            // filtra el kit por id y obtiene su contenido
            let kitSelected = kitContent.filter(data=> data["id"]==element.children[0].textContent);
            let contentKit = JSON.parse(kitSelected[0]["content"])

            // actualiza las existencias del kit
            contentKit.forEach(async(element) => {
                let insideid =element["id"];
                let ammount = element["ammount"];

                let allExistences = await readExistences(insideid , ammount);
               await answers.updateExistences(allExistences[1],allExistences[0] , insideid);
            });
        }

        // actualiza las existencias
        await answers.updateExistences(billed,existence , insideid);
    });
}

module.exports = {
    refreshExistences
}