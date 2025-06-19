const { deleteTool } = require("./answers");

async function deleteThisTool(params) {
    // obtiene el id de la herramienta
    let getId = params.target.parentNode.id ;
    params.target.parentNode.remove();

    // elimina la herramienta de db en  base a su  id
    await deleteTool(getId);
}


module.exports = {
    deleteThisTool
}