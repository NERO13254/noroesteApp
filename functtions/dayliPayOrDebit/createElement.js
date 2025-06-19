async function createEelement(element , append , all) {
    // funcion que crea los elementos HTML de las listas
    if(append.children.length>0 && append.children[0].tagName=="STRONG"){
        append.innerHTML='';
    }
    let dateContent = all!=null ? `<input type='text' value='${element["date"]}'>` : "";

    let div = document.createElement("div");
    div.className = "dataContent";
    div.innerHTML = `
    <input type='text' value='${element["creditor"]}'>
    <input type='text' value='$${parseInt(element["value"]).toLocaleString()}'>
    ${dateContent}
    <button class='modifyElement' name='${element["id"]}'></button>
    <button class='deleteElement' name='${element["id"]}'></button>
    `;
    append.prepend(div);
    if(all){
        div.style.gridTemplateColumns='45% 24% 21% 5% 5%';
    }
}
module.exports = {
    createEelement
}