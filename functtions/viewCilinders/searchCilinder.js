async function searchCilinder(dataUser) {
    let letter = dataUser.value.toUpperCase();
    let  contentSearched = document.getElementById("resultsOfSearch");
    contentSearched.style.display='block';
    contentSearched.innerHTML ='';
    

    console.log("buscando cilindro")
    document.querySelectorAll("#contentSearched .cilContainer ").forEach(data=>{
        let elementData = data.children[0].textContent.toUpperCase();

        if(elementData.includes(letter)){
            let nodeCloned = data.cloneNode(true);
            contentSearched.append(nodeCloned)
        }
    });
}

module.exports = {
    searchCilinder
}