async function settingsLocation(params) {
    document.getElementsByClassName("settingsLocationContent")[0].style.display='grid';

    document.getElementById("insertLocation").style.display='none';
    document.getElementById("saveModifies").style.display='block';
    document.getElementById("deleteLocation").style.display='block';
    
    document.getElementById("idLocation").textContent= params.className;
    document.getElementById("name").value = params.parentNode.children[0].textContent
    document.getElementById("cp").value = params.parentNode.children[1].textContent
}

module.exports = {
    settingsLocation
}