async function reloadKitList() {
    // si se encuentran kits los imprime en el html
    let getKitsData = await allAnswer("SELECT id,name , salevalue, content FROM kit WHERE 1");
    if(getKitsData.length>0){
        listKits.innerHTML = "";
        getKitsData.forEach(element => {
            let contentKit = JSON.parse(element["content"]);
            let constContent = 0;
            contentKit.forEach(element => {
                constContent += parseInt(element["cost"]) * parseInt(element["ammount"]);
            });

            let div = document.createElement("div");
            div.className="kitContent";
            div.id       = element["id"];
            div.innerHTML =`
            <strong>${element["name"]}</strong>
            <strong>$${element["salevalue"].toLocaleString()}</strong>
            <input type="checkbox" class="${element["id"]}">
            `;
            listKits.append(div);
        });
    }
}
module.exports = {
    reloadKitList
}