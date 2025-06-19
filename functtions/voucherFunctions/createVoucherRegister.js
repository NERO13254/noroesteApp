const { answers } = require("./answers");

async function createVoucherRegister(completeDate) {
    // obtiene todos los productos y los almacena en un array de objetos
    let objData = [];
    let collectData = document.querySelectorAll(".contentProduct");
    collectData.forEach(element=>{
        let ammount = element.children[4];
        ammount = ammount.tagName=="INPUT"? ammount.value : ammount.textContent;
        ammount = element.id=="serialProduct" ? 1 : ammount;
        
        let obj = {
            insideid    : element.children[0].textContent,
            nameProd    : element.children[1].textContent,
            valueProd   : element.children[3].textContent.replace(/\./g,""),
            ammounProd  : ammount
        }

        if(element.id=="serialProduct"){
            obj["serialName"]=element.children[4].textContent;
        }

        objData.push(obj);
    });

    // inserta el valor final y el descuento
    objData.push(
        {finVal : document.getElementById("totalValue").textContent.replace(/\./g,"")},
        {discount: document.getElementById("discount").value}
    )

    // obtiene el cdigo de interno del remito 
    let insideid = await answers.readInsideIdVoucher();
    insideid = insideid.length>0 ? parseInt(insideid[0]["insideid"])+1 : 0;

    let owner = localStorage.getItem("idCtaCte");
    let discount = document.getElementById("discount").value;
    
    // inserta el remito 
    await answers.createVoucherRegister(`'${insideid}','${JSON.stringify(objData)}', '${owner}','${discount}' , '${completeDate}'`);
}

module.exports = {
    createVoucherRegister
}