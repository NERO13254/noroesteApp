const { answers } = require("./answers");

async function saveChangesOfData(params) {
    let contentData = params.parentNode;
    let name = contentData.children[0].textContent
    let value = params.value;

    await answers.UpdateTablePosition(name,value);
    console.log("actualizada")

}

module.exports = {
    saveChangesOfData
}