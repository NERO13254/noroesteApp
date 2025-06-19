async function payProcessWafer(e){
    // obtiene el contenedor de los checkboxs y selecciona el primer elemento chekeado
    let controllerContainer = document.getElementById("controllerContainer");
    let getCheckedInputs    = controllerContainer.querySelector("input[type='checkbox']:checked");
    if(getCheckedInputs){
        // obteiene el input completo y recolecta los datos necesarios para cobrarlo
        let getCompleteDiv      = getCheckedInputs.parentNode.parentNode;
    
        let typeOperation           = getCheckedInputs.name;
        let getValueTypeOperation   = parseInt(getCompleteDiv.children[1].children[1].value);
        // obtiene el saldo final de la ctacte y le suma el valor de la operacion
        const getFinalValueCtaCte   = await allAnswer(`SELECT total FROM payordebit WHERE owner='${e.target.className.slice(1)}' ORDER BY id DESC LIMIT 1`);
        // corrobora si se encuentra el total y lo suma o resta segun sea el caso para actualizar el total
        let oldTotal = 0;
        if(getFinalValueCtaCte.length>0){
            oldTotal = parseInt(getFinalValueCtaCte[0]["total"]);
            if(oldTotal>0){
                oldTotal = oldTotal+getValueTypeOperation;
            }else{
                oldTotal = oldTotal-getValueTypeOperation;
            }
        }else{
            oldTotal = getValueTypeOperation;
        }
        let getNameWorkShop = await allAnswer(`SELECT workshop FROM tdm WHERE id ='${localStorage.getItem("idWorkShop")}' `);
        let getOrderNum    = await allAnswer(`SELECT ordernum FROM payordebit WHERE 1 ORDER BY id DESC LIMIT 1`);
        let obs = `${typeOperation},${localStorage.getItem("exportWaferToEnergas")},${getNameWorkShop[0]["workshop"]}`;
        let newDate = new Date();
        let dateNow = `${newDate.getMinutes()}:${newDate.getHours()} ${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}`;
        let insertInPayOrDebitAnswer = `INSERT INTO payordebit (date, obs , debit , pay,total, owner , ordernum)VALUES('${dateNow}','${obs}',0,'${getValueTypeOperation}','${oldTotal}','${e.target.className.slice(1)}' , '${getOrderNum[0]["ordernum"]+1}')`;
        await runAnswer(insertInPayOrDebitAnswer);

        return new Promise((resolve, reject) => {
            resolve();
        })
    }else{
        // desplegar alerta
    }

}

module.exports = {
    payProcessWafer
}