async function chargeCtaCteDefault() {
    // hace focus en el buscador 
    document.getElementById("searchClient").focus();
    listAllClients.innerHTML = "";
    const getDataCtaCte = await allAnswer("SELECT id, name , valorph FROM cuentascorrientes WHERE 1");
    for (let i = 0; i < getDataCtaCte.length; i++) {
        const element = getDataCtaCte[i];
        let number = i/2;
        let div = document.createElement("div");
        div.className = "containerClients";
        div.innerHTML = `
            <strong>${element["name"]}</strong>
            <strong id="V${element["id"]}">${element["valorph"]}</strong>
            <input type="checkbox" class = "B${element["id"]}">
        `;
        listAllClients.append(div);
        div.style.background="red !important"

        if(number%1==0){
            console.log("por aca");
            div.style.backgroundColor="#eee";
        }
    };
}
module.exports = {
    chargeCtaCteDefault
}