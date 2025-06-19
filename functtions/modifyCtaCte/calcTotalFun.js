// CALCULA EL TOTAL ENTRE PAGOS Y DEUDAS
function calcTotal(appendDiv){

    let getClearTotal = 0 ;

    if(historyOperations.children[0]== undefined){
        appendDiv.textContent= " : "+getClearTotal;
    }
    
    else{
        appendDiv.textContent = " : "+historyOperations.children[0].children[4].textContent;
        if(historyOperations.children[0].children[4].textContent != ""){
            console.log("hay dato" + historyOperations.children[0].children[4].textContent)
            
        }
        getClearTotal = parseInt(appendDiv.textContent.slice(2).replace(/\./g , ""));
    }

    if(getClearTotal > 0 ){
        appendDiv.parentNode.style.background = "red";
    }else{
        appendDiv.parentNode.style.background = "green";
    }
}

module.exports = {
    calcTotal
}