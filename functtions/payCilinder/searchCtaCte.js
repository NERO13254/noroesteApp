async function searchCtaCte(dataTxt) {
    // obtiene todos los divs que contienen la informacion de la cta cte y los convierte en un array
    let getAllDivsCtaCtes = Array.from(document.querySelectorAll(".containerClients"));
    // recorre el array y filtra los datos por inclusion y los clona a los modulos para añadirlos al div
    let number = 0;

    getAllDivsCtaCtes.map(data=>{
        if(data.children[0].textContent.toLocaleLowerCase().includes(dataTxt)){
            let nodeCloned = data.cloneNode(true);
            number+=1;
            number = 2/number
            if(number.toString().charAt(0)=="0"){
                nodeCloned.style.backgroundColor='rgb(97 97 97)';
            }else{
                nodeCloned.style.backgroundColor='rgb(77 77 77)';
            }
            nodeCloned.style.border="none";
            searchResultsContainer.prepend(nodeCloned);
        }
    })
}
module.exports = {
    searchCtaCte
}