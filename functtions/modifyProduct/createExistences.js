const { updateExistences } = require("./answers");

async function createExistences(billedNumber,noBilledNumber) {
    let poductsBilledSection            = document.getElementById("poductsBilledSection");
    poductsBilledSection.style.display  = "flex";

    // obtiene los valores de facturado y no facturado
    let billed  = parseInt(noBilledNumber) ? parseInt(noBilledNumber) :0;
    let noBilled= parseInt(billedNumber) ? parseInt(billedNumber) :0

    // completa los campos de facturado y no facturado
    document.getElementById("noBilled").value = billed;
    document.getElementById("billed").value = noBilled;

}

module.exports = {
    createExistences
}