const { adminInfo } = require("../../adminInfo");
const { answers } = require("./answers");
let {calcTotal} = require("./calcTotalFun");

const { loadPayOrDebitRegister } = require("./loadPayOrDebitRegister");


async function reloadHystoryList(){


    if(!localStorage.getItem("finalConsumer")){
        // obtiene todos los remitos de la cuenta seleccionada
        let getDataFromCtaCte = await answers.readAllVouchers(localStorage.getItem("idCtaCte"));
        document.getElementById("historyOperations").innerHTML="";


        for (let i = 0; i < getDataFromCtaCte.length; i++) {
            const element = getDataFromCtaCte[i];
            
            loadPayOrDebitRegister(element , i , i%2==0 ? 'rgb(223 223 223)' : "" , "append" )
        }

        // inserta el valor total
        calcTotal(document.getElementById("totalVal"));

    }else{
        // obtiene todos los remitos del consumidor final
        const getData = await answers.readAllDataFinalConsumer();

        for (let i = 0; i < getData.length; i++) {
            const element   = getData[i];
            let div         = document.createElement("div");
            div.className   ="inputHistoryContent";
            div.id          =i+"contInput";

            let getContent = JSON.parse(element["content"]);
            
            div.innerHTML   = `
            <strong>${element["date"]}</strong>
            <strong>RMTO ${element["insideid"]}</strong>
            <strong>--</strong>
            <strong>--</strong>
            <strong>${getContent[0]["totalvalue"]}</strong>
            `;
            historyOperations.append(div);
        }
    }
}
module.exports = {
    reloadHystoryList
}