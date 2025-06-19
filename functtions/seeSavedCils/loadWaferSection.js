const { answers } = require("./answers");

async function loadWaferSection(e) {
    let cilinderListContent = document.getElementById("cilinderListContent");
    e.target.style.backgroundColor='white';
    seeCilinders.style.backgroundColor='#F0F0F0';
    document.getElementById("cilinderGuideContent").style.display='none';
    document.getElementById("waferGuideContent").style.display='grid'

    document.getElementsByClassName("buttonWaferContent")[0].style.display="block";
    document.getElementsByClassName("buttonContent")[0].style.display="none";


    let workshopCode = await answers.readworkshopcodeTdm(localStorage.getItem("idWorkShop"));
    if(workshopCode.length>0){
        // obtiene las obleas pasadas por el tdm seleccionado
        workshopCode = workshopCode[0]["workshopcode"];
        let waferSaved = await answers.readDataWafers(workshopCode);

        // inserta las obleas resultantes en el HTML
        cilinderListContent.innerHTML ="";
        waferSaved.forEach((element , index) => {
            let div = document.createElement("div");
            div.className = "contentInputWafer";
            div.innerHTML = `
            <strong>${element["id"]}</strong>
            <strong>${element["oldOblea"] ?element["oldOblea"] : "NO"}</strong>
            <strong>${element["domain"]}</strong>
            <strong>${filterTypeOperation(element)}</strong>
            <input type='checkbox' id=${element["id"]}>
            `;
            if(index%2 == 0){
                div.style.background='rgb(245, 245, 245)';
            }
            cilinderListContent.append(div);
        });
    }
}

// funcion que filtra el tipo de operación
function filterTypeOperation(object){
    let typeOperation = "";
    Object.keys(object).slice(3).forEach(element => {
        typeOperation = object[element] ? element.slice(-1) : typeOperation
    });

    return typeOperation
}

module.exports = {
    loadWaferSection
}