function searchLocations(paramOfSearch) {
    
    let resultsContentSeach= document.getElementById("resultsContentSeach");

    if(paramOfSearch.length>0){
        // obtiene todas las localidades y filtra la coincidiente
        resultsContentSeach.innerHTML ='';
        resultsContentSeach.style.display='block';

        document.querySelectorAll(".contentDataPrinted").forEach(element=>{
            if(element.children[0].textContent.toLowerCase().includes(paramOfSearch.toLowerCase())){
                let nodeCloned = element.cloneNode(true);
                nodeCloned.style.backgroundColor='white';
                resultsContentSeach.append(nodeCloned);
            }
        });
    }
    else{
        resultsContentSeach.style.display='none';
    }
}

module.exports ={
    searchLocations
}