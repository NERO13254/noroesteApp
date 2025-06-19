const {ipcRenderer}         = require("electron");
const dbRed                 = require("../db/dbRed");
const db                    = dbRed.getDb(__dirname);
const saveDni               = require("../functtions/chargeCilinders/save-dni");
const insertDni             = require("../functtions/chargeCilinders/insertDni");
const {loadFirstClientData} = require("../functtions/chargeCilinders/loadFirstClientData");
const buttonsControllers    = require("../functtions/chargeCilinders/buttonsControllers");
const {enterFunction}         = require("../functtions/chargeCilinders/enterFunction");
const {nextForm}      = require("../functtions/chargeCilinders/nextForm");  
const {startSearchCountry}    = require("../functtions/chargeCilinders/startSearchCountry");
const { getWorkShopName, searchLocations } = require("../functtions/chargeCilinders/answers");


window.onload = async()=>{
    // controlador para los botones
    buttonsControllers.buttonsControllers();
    //carga todos los datos del usuario en caso de contenerlos y carga las provincias 
    await loadFirstClientData();

    document.getElementById("country").addEventListener("keyup", async(e)=>{
        let searchResults ="";
        // obtiene los resultados similares de las localidades obtenidas de db 
        if(e.target.value.length>=3){
            resultsContent.style.display = "block";
            resultsContent.innerHTML='';
            searchResults = await searchLocations(e.target.value);
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
               await startSearchCountry(e.target.value , searchResults);
            }
        }
    });

    // al seleccionar una localidad de la lista de resultados mediante click
    resultsContent.addEventListener("click", (e)=>{
        if(e.target.tagName=="INPUT" &&  e.target.getAttribute("type")=="checkbox"){            
            country.value   = e.target.parentNode.children[0].textContent;
            cp.value        = e.target.parentNode.children[1].textContent;
            resultsContent.style.display = "none"
        }
    });

    // obtiene el nombre del taller de db 
    let workshopName = await getWorkShopName(localStorage.getItem("idWorkShop"));
    // inserta el nombre del taller en el HTML
    document.getElementById("dataForUser").append ("TALLER SELECCIONADO :" + workshopName[0]["workshop"]);

    // al presionar enter en el dni
    document.getElementById("dni").addEventListener("keyup" , async(e)=>{
        if(e.key == "Enter"){
           await enterFunction(e);
        }
    });

    // al presionar el boton siguiente
    document.getElementById("nextForm").addEventListener("click" , async()=>{
        await nextForm();

        ipcRenderer.send("submiBtnForCilUser");
        window.close();
    });

    document.addEventListener("click" , (e)=>{
        if(e.target.className=='infoContent'){
            e.target.children[1].focus();
        }
    })
}