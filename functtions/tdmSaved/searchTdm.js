async function searchTdm(e) {
    // si el input de busqueda tiene mas de 2 letras ingresadas despliega el buscador
    if(e.target.value.length>2){
        searcherResults.innerHTML= "";
        searcherResults.style.display="block";
        // obtiene el valor de busqueda y todos los TDM
        var inputVal    = e.target.value;
        let getInputs   =Array.from(document.querySelectorAll(".contentInfo"));
        // mapea todos los TDM y los que contengan similitudes con el nobmre ingresado los clona y  
        // los agrega a la lista de resultados 
        getInputs.map(obj=>{
          if(obj.children[1].textContent.toLocaleLowerCase().includes(inputVal.toLocaleLowerCase())){
            let nodeCloned = obj.cloneNode(true);
            searcherResults.append(nodeCloned);
          }  
        })
    }else{
        searcherResults.innerHTML= "";
        searcherResults.style.display="none";
    }
}

module.exports ={
    searchTdm
}