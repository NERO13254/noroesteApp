function insertWaferInHtml(element , pending){
    // crea el div HTML con lainfromación de la oblea
    let div = document.createElement("div");
    let dateContent = "";
    if(pending){
        dateContent =`<input type="text" name="date" value="${element["date"]}">`
    }
    div.className = "rowOfWafer";
    div.innerHTML = `
        <input type="text" name="tdm" value="${element["tdm"]}">
        <input type="text" name="domain" value="${element["domain"]}">
        <input type="text" name="car" value="${element["car"]}">
        <input type="text" name="branded" value="${element["branded"] ? element["branded"] : "" }">
        <input type="text" name="workshop" value="${element["workshop"]}">
        <input type="text" name="value" value="${element["value"]}">
        ${dateContent}
        <button id="modifyRowWafer" name='${element["id"]}'></button>
        <button id="deleteRowWafer" name='${element["id"]}'></button>
    `;
    if(pending){
        div.style.gridTemplateColumns='17% 14% 15% 5% 15% 1fr 12% 5% 5%';
    }
    // pinta el div de color rojo en caso de que no haya datos en "branded" sino será blanco
    let bgColor =  (!element["branded"] || element["branded"]=="") ? "wafersNotBranded" : "show";
    div.querySelectorAll("input").forEach(element=>element.classList.toggle(bgColor));
    // inserta el div en el html
    document.getElementById("listWafer").prepend(div);
    // limpia  los divs para ingresar un a nueva oblea
    let getDivs = Array.from(document.querySelectorAll(".addWaferController input")).slice(1);
    getDivs.forEach(element=>{
        element.value="";
    })
}

module.exports = {
    insertWaferInHtml
}