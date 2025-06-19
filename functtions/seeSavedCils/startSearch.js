const { answers } = require("./answers");
const { printCilindersInHtml } = require("./printCilindersInHtml");

async function startSearch(params) {
    let dataForSearch = params.target.value;
    let searchResults = document.getElementById("searchResults");
    searchResults.innerHTML ='';
    searchResults.style.display ='block';

    let searchCondition = false ;

    // obtine todos los resultados de la lista
    document.querySelectorAll("#cilinderListContent div").forEach(async(element)=>{
        if(element.children[1].textContent.includes(dataForSearch.toLowerCase())){
            let nodeCloned = element.cloneNode(true);
            searchResults.append(nodeCloned);

            searchCondition = true;
        }
    });


    // si no se enconraron resultados , los busca en db
    if(!searchCondition){

        let getData = await answers.readCilinderSearched(dataForSearch);
        for (let i = 0; i < getData.length; i++) {
            printCilindersInHtml(getData[i] , i , searchResults)
        }
        
    }
}

module.exports = {
    startSearch
}