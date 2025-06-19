async function insertPecInList(params) {
    const element = params;
    let div = document.createElement("div");
    div.className = 'onlyPecContent';
    div.innerHTML = `
        <strong class='${element["id"]}'>${element["pec"]}</strong>
        <button>x</button>
    `;
    pecContent.append(div);
}

module.exports = {
    insertPecInList
}