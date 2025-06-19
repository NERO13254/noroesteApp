const { answers } = require("./answers");

async function desplegateListCtaCtes() {
    // hace visible el div que contendrá la lista de cta ctes
    let containerAllResults = document.getElementsByClassName("searchCtaCteContent")[0];
    containerAllResults.classList.toggle("show");
    // obtiene el contenedor para almacenar todos los resultados
    let getCtaCteData = await answers.readAllCtaCtes();
    let number = 0
    // recorre la consulta y imrpirme los resultados en el html
    getCtaCteData.forEach(element => {
        let newNumber = number/2;
        let div = document.createElement("div");
        div.className = 'ctaCteResult';
        if(newNumber%1==0){
            div.style.backgroundColor='#333';
        }else{
            div.style.backgroundColor='#515151';
        }
        div.innerHTML = `
            <strong>${element["name"]}</strong>
            <input type='checkbox' class='${element["valorph"]}' id='${element["id"]}'>
        `;
        allResults.append(div);
        number++;
    });
}

module.exports = {
    desplegateListCtaCtes
}