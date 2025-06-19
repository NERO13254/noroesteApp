async function searchPec(param){
    let resultOfSearchContainer = document.getElementById("resultOfSearchContainer");
    resultOfSearchContainer.innerHTML = "";
    resultOfSearchContainer.style.display='block';
    
    document.querySelectorAll(".pecControllerContent").forEach(element=>{
        element.children[0].textContent.includes(param) ?  resultOfSearchContainer.append(element.cloneNode(true)) : "";
    });
}

module.exports = {
    searchPec
}