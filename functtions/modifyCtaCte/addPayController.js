const {savePay} = require("./savePay");
const {reportStatus}=require("../reportStatus");

async function addPayController() {
    let alertBox = document.getElementsByClassName("containerBox")[0];
    alertBox.style.display='block';

    // cierra la ventana
    document.getElementById("cancelOperation").addEventListener("click", ()=>{
        alertBox.style.display="none";
    });
}   

module.exports = {
    addPayController
}