function addPecToHtml(element ,append){
    let div =  document.createElement("div");
    div.className = 'pecControllerContent';
    div.innerHTML = `
    <strong>${element["pec"]}</strong>
    <button id='${element["id"]}'>x</button>
    `;
    append.append(div);
}

module.exports = {
    addPecToHtml
}