const { adminInfo } = require("../../adminInfo");


function corroborateAdmin() {
    // evalua si es administrador
    let dataClient = localStorage.getItem("userAdmin").split(",");
    let sentence = false;
    if(adminInfo[0]==dataClient[0] && adminInfo[1]==dataClient[1]){
        sentence = true;
    }else{
        document.getElementById("addPay").style.display='none';
    }


    return sentence;
}

module.exports = {
    corroborateAdmin
}