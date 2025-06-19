const { updateVoucherForOtherClient } = require("./updateVoucherForOtherClient");
const { updateVoucherModule } = require("./updateVoucherModule");

async function updateAllFinalValues(insideIdVoucher) {
    let getName = document.getElementById("nameContent").textContent.split(" ");

    // si el dueño del remito es el mismo
    if(getName.slice(1).join(" ")==  owner.value){
        await updateVoucherModule();
    }else{
        await updateVoucherForOtherClient(getTarget , getName[0], insideIdVoucher );
    }
}

module.exports = {
    updateAllFinalValues
}
