const { answers } = require("./answers");

async function loadFinalClient(){
    const dataFinalClient = await answers.readFinalConsumer();
    

    var div = document.createElement("div");
    div.className = "optionContent";
    div.id        = "000optionContent";
    div.innerHTML = ` 
        <strong>${dataFinalClient[0]["id"]}</strong>
        <strong>${dataFinalClient[0]["name"]}</strong>
        <input type="checkbox" id="000">
    `;
    listCtaCte.prepend(div);
}

module.exports = {
    loadFinalClient
}