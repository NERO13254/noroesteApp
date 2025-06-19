const { answers } = require("./answers");

async function desplegateGeneralWafer() {
    let wafersNoExported = await answers.collectNoExportedWafers();

    let wafersExporteds = document.getElementById("wafersExporteds");
    // las recorre y las inserta en el HTML
    for (let i = 0; i < wafersNoExported.length; i++) {
        const element = wafersNoExported[i];
        let div = document.createElement("div");
        div.className = 'waferGeneralContent';
        div.innerHTML = `
        <div class='generalContent'>
            <strong>${element["oldWafer"]}</strong>
            <strong class='domainContent'>${element["domain"]}</strong>
            <div class='buttonContent'>
                <button class='desplegateOptions'></button>
                <button class='reExportCilinder'></button>
            </div>
        </div>

        <div class='desplegateInfo' id='${element["id"]}'>
            <button class='sectionInfo' name='waferSavedDetailed'>Regulador</button>
            <div class='sectionContent'></div>

            <button class='sectionInfo' name='waferSavedDetailedValve'>Valvula</button>
            <div class='sectionContent'></div>

            <button class='sectionInfo' name='waferSavedDetailedCilinder'>Cilindro</button> 
            <div class='sectionContent'></div>

            <button class='sectionInfo' name='waferSavedDetailedUser'>Usuario</button>
            <div class='sectionContent'></div>
        </div>
        `;
        wafersExporteds.append(div);
    }
}

module.exports = {
    desplegateGeneralWafer
}