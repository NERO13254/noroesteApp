async function autoCompleteBrandInput(element) {
    let collectData2 = Array.from(resultsOfTheSearchBrand.querySelectorAll(".searchBrand"));
    // filtra los elementos coincidientes y los inserta en el input si es que los encuentra
    let filteredBrands = collectData2.filter(data=>parseInt(data.children[0].className) ==parseInt(element.className));
    if(filteredBrands.length>0){
        brandCar.value  = filteredBrands[0].textContent.toUpperCase();
    }
    // autocompleta el modelo de auto seleccionado
    modelCar.value  = element.textContent.toUpperCase();
}

module.exports = {
    autoCompleteBrandInput
}