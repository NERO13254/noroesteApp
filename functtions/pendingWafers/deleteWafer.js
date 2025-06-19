const { deleteWaferAnswer } = require("./answers")

async function deleteWafer(id, data) {
    data.style.borderRight="3px solid red"
    // obtiene el div de la lista general
    let getTarget = document.querySelector(`#listWafer button[name='${id}']`).parentNode;
    // elimina el div de la lista
    getTarget.remove();
    // borra la oblea de db
    await deleteWaferAnswer(id);
    
}

module.exports = {
    deleteWafer
}