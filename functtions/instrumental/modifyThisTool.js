const { toolSettingController } = require("./toolSettingController");

async function modifyThisTool(e) {
    // obtiene el contenedor general del elemento seleccionado
    let contentToolDiv  = e.target.parentNode;
    let iterator =0;
    // obtiene los valores
    let getAllDivs = contentToolDiv.querySelectorAll("strong");  
    document.getElementById("settingsOfToolLoaded").style.display='grid';
    let dataInputs = document.querySelectorAll("#settingsOfToolLoaded input");
    // recorre la lista de inputs e inserta los valores en cada campo
    dataInputs.forEach(element=>{
        element.value = getAllDivs[iterator].textContent;
        iterator ++ ;
    });

    // al presionar el boton guardar se actualiza el valors
    let saveChangesCloned = document.getElementById("saveChanges").cloneNode(true);
    document.getElementById("saveChanges").replaceWith(saveChangesCloned);
    
    saveChangesCloned.addEventListener("click" , async()=>{
        await toolSettingController("update" , contentToolDiv.id );
        let iterator = 0;
        // actualiza los valores en la lista de strongs
        getAllDivs.forEach(data =>{
            data.textContent = dataInputs[iterator].value;
            iterator++;
        });
        // oculta el controlador del remito
        document.getElementById("settingsOfToolLoaded").style.display='none';
    })
    
}

module.exports = {
    modifyThisTool
}