const { collectWafersForDate } = require("./answers");
const { insertWaferInHtml } = require("./insertWaferInHtml");

async function loadDayliWafers(date) {
    // obtiene el contenedor de obleas y lo  limpia
    let listWafer = document.getElementById("listWafer");
    listWafer.innerHTML =  "";

    // obtine todas las obleas del día y las que no fueron marcadas
    let collectDaylyWafers = await collectWafersForDate(date);
    if(collectDaylyWafers.length>0){
        document.getElementById("errorDateContent").innerHTML="",
        // limpia el contenedor de resultados de obleas
        document.getElementById("listWafer").innerHTML="";
        // recorre los elementos encontrados
        collectDaylyWafers.forEach(element => {
            // inserta los datos en el html
            insertWaferInHtml(element);
        });
    }else{
        let strong = document.createElement("strong");
        strong.innerHTML = `No hay obleas registradas del día ${date}`;
        document.getElementById("errorDateContent").append(strong);
    }

}

module.exports ={
    loadDayliWafers
}