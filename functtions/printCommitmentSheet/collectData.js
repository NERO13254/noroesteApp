async function collectData(){
    let getAllInputs    = document.querySelectorAll("input[type='text']");
    let getAllChecks    = document.querySelectorAll("input[type='checkbox']");

    let containerValues = [];
    // Obtiene todos los valores de los inputs y los almacena en un array de objetos
    getAllInputs.forEach(element => {
        if(element.value.length>0){
            let nameContent = "";
            if(element.id.length>0){
                nameContent = element.id
            }else{
                nameContent = element.name;
            }
            let objContent = {[nameContent] : element.value}
            containerValues.push(objContent);            
        }
    });

    // obtiene todos los elementos checked que esten cheeckados y los almacena en el array de objetos
    getAllChecks.forEach(element => {
        if(element.checked){
            let nameContent = "";
            if(element.name.length<=0){
                nameContent = element.id;
            }else{
                nameContent = element.name;
            }
            let objContent = {[nameContent] : "X"}
            containerValues.push(objContent);
        }
    });
    containerValues.push({"workshopName" : "Noroestecil SRL"})

    localStorage.setItem("waferDataSavedInObject" , JSON.stringify(containerValues))
    return new Promise((resolve, reject) => {
        resolve();
    })
    
    
}

module.exports = {
    collectData
}