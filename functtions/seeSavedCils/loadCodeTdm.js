const { answers } = require("./answers")

async function loadCodeTdm() {
    let tdmCode = await answers.readworkshopcodeTdm(localStorage.getItem("idWorkShop"));
    tdmCode = tdmCode.length>0 ? tdmCode[0]["workshop"] : "NE";

    document.getElementById("workshopCodePrint").append(tdmCode.toUpperCase());
}

module.exports = {
    loadCodeTdm
}