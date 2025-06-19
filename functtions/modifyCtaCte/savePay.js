const { reportStatus } = require("../reportStatus");
const { answers } = require("./answers");
const { calcTotal } = require("./calcTotalFun");
const { loadPayOrDebitRegister } = require("./loadPayOrDebitRegister");

async function savePay() {
    let pay = 0 , debit=0 , value = parseInt(document.getElementById("payInput").value);
    let obs = document.getElementById("obsTextarea").value;

    if(!isNaN(value)){
        // evalua si es un pago positivo o negativo y lo almacena en la variable correspondiente
        pay     = value>0 ? value : 0 
        debit   = value<0 ? value : 0
        
        // obtiene el valor total del ultimo remito gestionado
        let owner = document.getElementById("nameContent").textContent.split(" ")[0];
        let oldTotal = await answers.collectPreviousVoucher(owner);
        oldTotal = oldTotal.length>0 ? oldTotal[0]["total"] : 0 

        // calcula el nuevo valor total con el pago contemplado
        oldTotal = oldTotal + (Math.abs(debit)-pay)

        // inserta el pago
        //date,obs,debit,pay,total,owner,ordernum
        let date = new Date();
        date = `${date.getHours()}:${date.getMinutes()} ${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

        let values = `'${date}','${obs}','${Math.abs(pay)}','${Math.abs(debit)}','${oldTotal}','${owner}',1`;
        await answers.createPay(values);
        
        // corrobora si el final es positivo o negativo , actualiza el valor y cambia el color segun sea + o -
        document.getElementById("totalContainer").style.backgroundColor =  oldTotal>0 ? "red" : "green";
        //inserta el nuevo modulo en el html

        let element = {"date":date,
        "obs": obs, 
        "debit":Math.abs(pay ),
        "pay":Math.abs(debit),
        "total":oldTotal,
        "owner":owner,
        "orernum":0}

        loadPayOrDebitRegister(element,0 , "white" , "prepend");
        calcTotal(document.getElementById("totalVal"));

        document.getElementsByClassName("containerBox")[0].style.display='none';
    }else{
        reportStatus("Error" , "Valor invalido", "el valor ingresado en el campo de valor es invalido , asegurese de ingresar solo valores numericos" ,1 , ["Aceptar"] ,["canelProcess"], document.getElementById("alertContent") )
    }
}

module.exports = {
    savePay
}