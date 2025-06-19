async function searchProductInTheList(searchText) {
    // obtiene los productos coincidientes dentro de la lista
    let getInputs   = Array.from(document.querySelectorAll(".productContainer"));
    // mapea los resultados , y accede al nombre de cada uno y corrobora si este coincide con lo que se busca
    let newInput    =getInputs.map(data=> data.children[1].textContent.toLowerCase().includes(searchText.toLowerCase()) ? data : "");
    // recorre el array , corroborando coincidencias , clona el input y lo añade a la lista del HTML
    newInput.forEach(element =>{
        if(element!==""){
            let nodeCloned = element.cloneNode(true);
            containerResultsOfTheList.append(nodeCloned);
        }
    });
}

module.exports = {
    searchProductInTheList
}