let seachResults = document.getElementById("seachResults");

async function searchProvince(params) {

    if(params.length<=0){
        seachResults.innerHTML='';
        seachResults.style.display='none';
    }else{

        let data = document.querySelectorAll("#listRegionsLoaded .provinceContent");
        seachResults.innerHTML='';
        seachResults.style.display='block';

        data.forEach(element=>{
            if(element.children[0].textContent.toUpperCase().includes(params)){
                let nodeCloned = element.cloneNode(true);
                seachResults.append(nodeCloned);
            }
        });
    }
}

module.exports = {
    searchProvince
}