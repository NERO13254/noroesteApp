async function startSearch(params, div) {
    let toolData = Array.from(document.querySelectorAll(".toolContainer"));
    let filteredTool = toolData.filter(data=>data.children[2].textContent.trim().toLowerCase().includes(params.trim().toLowerCase()));

    filteredTool.forEach(element=>{
        let nodeCloned = element.cloneNode(true);
        div.append(nodeCloned);
    });
}

module.exports = {
    startSearch
}