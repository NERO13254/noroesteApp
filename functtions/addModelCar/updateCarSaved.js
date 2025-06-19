async function updateCarSaved() {
    let corroborateModels = await allAnswer(`SELECT id FROM cars WHERE model='${modelCarInput.value.toLowerCase()}'`);

    if(corroborateModels.length>0 && idCarSelected != corroborateModels[0]["id"]){
        reportStatus.reportStatus("Error", "Modelo ya existente", "El modelo que intenta modificar ya se encuentra guardado , corrobore que haya escrito el nombre correctamente" , 1 , ["Aceptar"] , ["canelProcess"], document.getElementById("reportStatus"));
    }else{
        await runAnswer(`UPDATE cars SET model='${modelCarInput.value.toLowerCase()}' , brand='${brandCar.value.toUpperCase()}' WHERE id ='${idCarSelected}'`);
        console.log("actualizado");
    }
}

module.exports = { 
    updateCarSaved
}