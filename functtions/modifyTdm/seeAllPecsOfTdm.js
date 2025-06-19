const { answers } = require("./answers");
const { insertPecInList } = require("./insertPecInList");

async function seeAllPecsOfTdm(pec) {
    let allPecs =  await answers.getPecs(pec);
    let pecContent = document.getElementById("pecContent");
    pecContent.innerHTML = '';
    document.getElementById("pecController").classList.toggle("showGrid");

    for (let i = 0; i < allPecs.length; i++) {
        // inserta los pec en la lista
        insertPecInList(allPecs[i]);
    }
}

module.exports = {
    seeAllPecsOfTdm
}