const { answers } = require("./answers");
const { printLocationHTML } = require("./printLocationHTML");

async function loadDefaultResults() {
    // obtiene todas las localidades y las imprime en el html
    let locations = await answers.readLocations();
    let contentResults = document.getElementById("locationsContent");
    
    if(locations.length>0){
        
        for (let i = 0; i < locations.length; i++) {
            const element = locations[i];
            let bgColor = i%2==0 ? "#f7f7f7" : "white";
            printLocationHTML(element , contentResults , bgColor );
        }
    }
}

module.exports = {
    loadDefaultResults
}