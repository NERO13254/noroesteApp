async function searchSerial(value) {
    let resultOfSearch = document.getElementById("resultOfSearch");

    if(value.length>1){
        resultOfSearch.innerHTML ='';
        let serial = value.toUpperCase().trim();
        resultOfSearch.style.display='block';
        // obtiene todas las series y añade las coincidientes al HTML
        document.querySelectorAll("#listSerial .serialContent").forEach(element=>{
            if(element.children[0].textContent.toUpperCase().includes(serial)){
                let nodeCloned = element.cloneNode(true);
                resultOfSearch.append(nodeCloned);
            }
        })
    }else{
        resultOfSearch.innerHTML ='';
        resultOfSearch.style.display='none';
    }
}

module.exports = {
    searchSerial
}