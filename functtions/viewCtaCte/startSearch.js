async function startSearch(params) {

    let contentSearchedCtaCte = document.getElementById("contentSearchedCtaCte");
    params.value.length<=0 ?
    contentSearchedCtaCte.style.display="none" :
    contentSearchedCtaCte.style.display = "block";
    contentSearchedCtaCte.innerHTML = "";

    let dataSearch = params.value.toLowerCase().trim();

    document.querySelectorAll(".optionContent").forEach(element=>{
        if(element.children[1].textContent.toLowerCase().includes(dataSearch)){
            let nodeClone = element.cloneNode(true);
            contentSearchedCtaCte.append(nodeClone);
        }
    });
}

module.exports = {
    startSearch
}