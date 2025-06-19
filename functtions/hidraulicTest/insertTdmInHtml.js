const { answers } = require("./answers");

async function insertTdmInHtml() {
    // obtiene todos los tdm de db
    const getAllTdm = await answers.readAllTdm();
    console.log(getAllTdm)
    // recorre los tdm y los inserta en el HTML
    for (let i = 0; i < getAllTdm.length; i++) {
        const element = getAllTdm[i];

        divCreate = document.createElement("div");
        divCreate.className = "contentDiv";
        
        if(i%2==0){
            divCreate.style.background = "rgb(237, 237, 237)";
        }

        divCreate.innerHTML= `
        <strong>${element.id}</strong>
        <strong class="workNamees" id="workNamees">${element.workshop}</strong>
        <strong>${element["workshopcode"]}</strong>
        <input type="checkbox" name="" id="idUser" class="${element.id}">
        `;
        userListContent.append(divCreate); 
    };
}
module.exports = {
    insertTdmInHtml
}