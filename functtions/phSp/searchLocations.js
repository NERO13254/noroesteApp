const { answers } = require("./answers");
let resultsContent = document.getElementById("resultsContent");

async function searchLocations(e) {
    let searchResults ="";
    // obtiene los resultados similares de las localidades obtenidas de db 
    if(e.target.value.length>=3){
        resultsContent.style.display = "block";
        resultsContent.innerHTML='';
        searchResults = await answers.readLocationsLike(e.target.value);
        // recorre todos los resultados de la respuesta a db
        for (let i = 0; i < searchResults.length; i++) {
            var printedDta = searchResults[i];
            var div = document.createElement("div");
            div.className="contentResults";
            div.innerHTML = `
            <strong id="I${printedDta.id}" >${printedDta.name}</strong>
            <strong id="C${printedDta.id}">${printedDta.cp}</strong>
            <input type="checkbox" class="M${printedDta.id}">
            `;
            resultsContent.append(div); 
        }
    }else{
        resultsContent.innerHTML='';
    }
    // si la tecla presionada fue enter
    if(e.key== "Enter"){
        // si el valor ingresado es mayor a 2 procede a buscar la localidad  
        if(e.target.value.length>2){
            console.log("recopilando info")
            
            let getData = document.getElementById("resultsContent").children[0];
            document.getElementById("country").value = getData.children[0].textContent;
            document.getElementById("cp").value = getData.children[1].textContent;
            document.getElementById("resultsContent").innerHTML='';
        }
    }
}

module.exports = {
    searchLocations
}