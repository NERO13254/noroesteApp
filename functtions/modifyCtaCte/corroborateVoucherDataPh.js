
async function corroborateVoucherDataPh(getTarget) {
    // obtiene el elemento a corroborar
    let voucherDescription = obs.value.split(" ");

    let getNewVal = parseInt(pay.value.replace(/\./g,""))!=0?parseInt(pay.value.replace(/\./g,"")) : parseInt(debit.value.replace(/\./g,"")*-1)

    
    let getOldTotal = parseInt(getTarget.parentNode.nextElementSibling.children[4].textContent.replace(/\./g,"")) ;

    // obtiene el valor total 
    getOldTotal = getOldTotal + getNewVal;

    if(voucherDescription.length>1){

        let corroborateSerialAndCertificate = voucherDescription.slice(0, 2);
        let corroborateSerial = voucherDescription[1].replace(/[a-z,A-Z]/g ,"").length
        let getName = document.getElementById("name").textContent.split(" ");
        //obtiene el nombre de la cta cte y el nombre de cta cte de settings 
        let newName = getName.slice(1).join(" ");
        let getOwnerValue = owner.value;
        let idVoucherSaved= 0;

        if(newName == getOwnerValue){
            idVoucherSaved = getTarget.id;
        }else{
            idVoucherSaved = idNewOwner.textContent;
        }

        // sicumple con las codiciones ej: "ER32 5050 JARBO S.A"se rearma el campo
        if(corroborateSerial>0&&voucherDescription.length>=3 && corroborateSerialAndCertificate[0].length<=4 && isNaN(parseInt(voucherDescription[0])) ){
            console.log("solo va aca si es una ph con requisitos minimos");
            
            let reformulateTdm      = voucherDescription.slice(2).join(" ");
            let completeDesc        = `pH,${voucherDescription[0]} ,${voucherDescription[1]}, ${reformulateTdm}`;
            let answerContent       = "";
            
            // obtiene todos los inputs que se encuentren onlyInputSection
            let collectData = document.getElementsByClassName("intputContainer")[0].querySelectorAll(".onlyInputSection input");
            // si el nombre de la cta cte coincide con el nombre de settings entonces solo se recolctan los datos
            
            for (let i = 0; i < collectData.length-1; i++) {
                const element = collectData[i];
                if(element.id == "obs"){
                    answerContent+= `${element.id}='${completeDesc}',`;
                }else{
                    if(element.id == "debit" || element.id == "pay" || element.id == "total" ){}
                    answerContent+= `${element.id}='${element.value.replace(/\./g,"")}',`;
                }
            }
            answerContent+= `owner='${document.getElementById("name").textContent.split(" ")[0]}'`;

            // idVoucherSaved es el contenedor del id del remito seleccionado para modificar
            await runAnswer(`UPDATE payordebit SET ${answerContent}, total='${getOldTotal}' WHERE id='${idVoucherSaved}'`);
            document.getElementsByClassName("intputContainer")[0].style.display='none';

        }else if(typeVoucher.textContent.length==0){
            // si es un remito 
            console.log("solo va aca cuadno es solo un prducto");
            // obtiene todos los inputs con sus valores
            let collectDataVoucher = Array.from(firstData.querySelectorAll("input")).slice(0,-1);
            let answerContent       ="";
            collectDataVoucher.forEach(element => {
                if(element.id=="pay"){
                    answerContent += `${element.id}='${element.value.replace(/\./g,"")}',`;
                }else{
                    answerContent += `${element.id}='${element.value.replace(/\./g,"")}',`;
                }
            });

            await runAnswer(`UPDATE payordebit SET ${answerContent.slice(0,-1)}, total='${getOldTotal}' WHERE id='${idVoucherSaved}'`);
            await refreshHistoryVucherList.refreshHistoryVucherList(getTarget, parseInt(document.getElementById("total").value.replace(/\./g,"")));
        }else{
            reportStatus.reportStatus("Error" , "El nombre / descripción ingresado es invalido ","asegurese de ingresar los valores separados por un solo espacio como el siguiente ejemplo:<br> ER32 505005 JARBO S.A. " , 1 , ["Aceptar"], ["canelProcess"] , alertContent)
        }
    }else{
        alert("nombre invalido ");
    }

}

module.exports = {
    corroborateVoucherDataPh
}