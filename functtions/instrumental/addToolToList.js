async function addToolToList(object , pend) {
    // corroborar los valores del objeto que sean correctos

    let div = document.createElement("div");
    div.className = "toolContainer";
    div.id = object["id"];
    div.innerHTML = `
    <strong>${object["habilitationDate"]}</strong>
    <strong>${object["expiredDate"]}</strong>
    <strong>${object["toolName"]}</strong>
    <button class='modifyThisTool'></button>
    <button class='deleteThisTool'></button>
    `;
    // añade los elementos a la lista
    if(pend=="prepend"){
        toolList.prepend(div);
    }else{
        toolList.append(div);
    }
    
}

module.exports = {
    addToolToList
}