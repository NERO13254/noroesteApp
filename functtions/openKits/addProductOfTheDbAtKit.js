async function addProductOfTheDbAtKit(data , appendContent ,getKitsData , divResults ,ifNewKit) {
    // clona el modulo del checkbox presionado
    let getParentNode   = data.parentNode;
    let nodeCloned      = getParentNode.cloneNode(true);
    let constContent    = parseInt(nodeCloned.children[3].textContent.slice(1)) ?parseInt(nodeCloned.children[3].textContent.slice(1)) : 0;
    let newProductKit   ={id:nodeCloned.children[0].textContent,name:nodeCloned.children[1].textContent, brand: nodeCloned.children[2].textContent , cost:constContent , ammount:1};
    // remueve el valor de costo
    nodeCloned.removeChild(nodeCloned.children[3]);
    // crea el input de cantidad y lo añade al modulo
    let ammountInput = document.createElement("input");
    ammountInput.className='ammountInput'
    ammountInput.type="number";
    ammountInput.value="1";

    nodeCloned.replaceChild(ammountInput, nodeCloned.children[4] );
    // crea el boton eliminar 
    let btn = document.createElement("button");
    btn.className  = nodeCloned.children[0].textContent;
    nodeCloned.append(btn);
    // añade el modulo modificado a la lista de productos
    console.log(appendContent);
    appendContent.append(nodeCloned);
    divResults.innerHtml="";
    divResults.style.display="none";

    if(!ifNewKit){
        // obtiene el contenido del kit
        let contentKit =[];
        getKitsData.forEach(element => {
            if(element["id"] == idKitSelected){
                contentKit = JSON.parse(element["content"]);
            }
        });
        contentKit.push(newProductKit);
        await runAnswer(`UPDATE kit SET content='${JSON.stringify(contentKit)}' WHERE id='${idKitSelected}'`);  
    }

}

module.exports = {
    addProductOfTheDbAtKit
}