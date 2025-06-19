async function addNewCar() {
    // despliega el controlador de autos y limpia los inputs
    document.getElementById("addCarController").classList.toggle("show");
    modelCarInput.value='';
    brandCar.value      ="";
}

module.exports = {
    addNewCar
}