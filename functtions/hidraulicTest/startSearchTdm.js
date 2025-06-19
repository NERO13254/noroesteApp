async function startSearchTdm(target) {
    let searchData = target.value.toLowerCase().trim();

    let searcherContentInfo = document.getElementById("searcherContentInfo");
    searcherContentInfo.innerHTML = '';
    searcherContentInfo.style.display = searchData.length>0 ? "block" : "none" ;

    // obtiene todos los elementos que conteien la información de los tdm 
    document.querySelectorAll(".contentDiv").forEach(element => {
        if(element.children[1].textContent.toLowerCase().includes(searchData)){
            let nodeCloned = element.cloneNode(true);
            searcherContentInfo.append(nodeCloned);
        }
    });
}

module.exports = {
    startSearchTdm
}