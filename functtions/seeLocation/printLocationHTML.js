function printLocationHTML(getInfo , divInsertInfo , bgColor) {

    var div = document.createElement("div");
    div.className="contentDataPrinted";
    div.innerHTML = `
    <strong>${getInfo.name.toUpperCase()}</strong>
    <strong>${getInfo.cp}</strong>
    <input type="checkbox"  class="${getInfo.id}" id="checkPut">
    `; 
    divInsertInfo.append(div);

    bgColor ? div.style.background=bgColor : "";
    
}

module.exports = {
    printLocationHTML
}
