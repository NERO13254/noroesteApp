async function addRowController(rowsContent) {
    // clona el modulo de los inputs
    let newRow = document.querySelector("#rowsOfInputsContent .containerRow").cloneNode(true);
    // crea el boton  "-" y lo añade al modulo
    let btn = document.createElement("button");
    btn.textContent = "-";
    newRow.append(btn);
    // obtiene cada input y setea sus valores a nada 
    let getAllInputs =newRow.querySelectorAll("input");
    getAllInputs.forEach(element => {
        element.value="";
    });
    // añade el modulo reseteado al HTML
    rowsContent.append(newRow);
}

module.exports = {
    addRowController
}