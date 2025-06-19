let content = document.getElementById("listRegionsLoaded");

async function insertDataInHtml(element , bgColor) {
    let div = document.createElement("div"); 
    div.className='provinceContent';
    div.innerHTML = `
        <strong>${element["name"]}</strong>
        <input type='checkbox' id='${element["id"]}'>
    `;

    bgColor ? div.style.background=bgColor : "";

    content.append(div);
}

module.exports = {
    insertDataInHtml
}