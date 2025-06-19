async function insertDataOfTheUserInHtml(answer) {
    // recorre todos los resultados y los inserta en el html
    let keysData =  Object.keys(answer[0]);
    keysData.forEach(element=>{
        // obtiene el input de cada elemento
        let getInput = document.getElementById(element);
        getInput = !getInput ? document.getElementsByName(element)[0] : getInput;
        if(getInput){
            // inserta el valor del usuario en el input
            getInput.value =  answer[0][element];
        }
    });
}

module.exports =  {
    insertDataOfTheUserInHtml
}