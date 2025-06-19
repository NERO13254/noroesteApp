async function collectDataController() {
        // al seleccinar un elemento de los modelos se selecciona la clase de este  
    // y se autocomplta el input de marca y modelo
    document.getElementById("contentSearchSelected").addEventListener("click" , (e)=>{
        if(e.target.id!= "addNewCarToList"){
            autoCompleteBrandInput.autoCompleteBrandInput(e.target);
            document.getElementById("contentSearchSelected").style.display="none";
            document.getElementById("contentSearchSelectedBrands").style.display="none";
        }
    });
    // al seleccionar una marca se autocompleta el campo de esta 
    document.getElementById("contentSearchSelectedBrands").addEventListener("click" , (e)=>{
        brandCar.value = e.target.textContent;
        document.getElementById("contentSearchSelectedBrands").style.display="none";
    })
    // al presionar enter o Escape en el campo de "modelo" , los campos de seleccion se ocultan
    modelCar.addEventListener("keyup" , (e)=>{
        if(e.key == "Enter" || e.key=="Escape"){
            document.getElementById("contentSearchSelected").style.display="none";
            document.getElementById("contentSearchSelectedBrands").style.display="none";
        }
    });
    // al presionar "añadir marca" se despliega la alerta para corroborar si se quiere agrear la marca
    addNewCarToList.addEventListener("click" , ()=>{
        reportStatus("Aviso", "¿Desea Agregar un nuevo modelo?" , `Estás por agregar un ${brandCar.value} ${modelCar.value} a la lista de vehículos `, 2 , ["Cancelar" , "Agregar"] , ["canelProcess" , "addNewCarButton"] , document.getElementById("reportStatus"));
        document.getElementById("addNewCarButton").addEventListener("click" , ()=>{
            addNewModelCar.addNewModelCar();
        });
    });
}

module.exports = {
    collectDataController
}