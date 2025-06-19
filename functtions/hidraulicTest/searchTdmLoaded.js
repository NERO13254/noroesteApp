async function searchTdmLoaded(e) {
    searcherContentInfo.style.display = "block";
    searcherContentInfo.innerHTML="";

    let contentDiv = Array.from(document.querySelectorAll(".contentDiv"));
    // filtra todos los divs que incluyan el valor de e
    let filteredTdm= contentDiv.filter(data=>data.children[1].textContent.toLowerCase().includes(e.toLowerCase()));
    // una vez filtrados los elementos se hace un bucle para clonar los modulos y los inserta en html
    let number = 0
    filteredTdm.forEach(element=>{
        number+=1
        let nodeCloned = element.cloneNode(true);
        let numberNew = number/2;
        if(numberNew%1==0){
            nodeCloned.style.backgroundColor='rgb(71 71 71)'; 
        }else{
            nodeCloned.style.backgroundColor='#333';
        }
        searcherContentInfo.append(nodeCloned);
    });
}
module.exports = {
    searchTdmLoaded
}