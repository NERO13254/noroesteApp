async function desplegateProductsOfTheKit(e) {
    nameKit.value= e.target.parentNode.children[0].textContent;
    let productsContainerOfTheKit   = document.getElementById("productsContainerOfTheKit");
    let answerContent = "";
    productsContainerOfTheKit.innerHTML='';
    let getNameTarget = e.target.className;
    let getContainerKit = document.getElementById(getNameTarget);
    valueKit.classList.toggle("show");

    buytContent.value = parseInt(getContainerKit.children[1].textContent.slice(1).replace(/\./g , "")).toLocaleString();
    // GUARDA EL ID  DEL KIT EN EL LOCALSTORAGE PARA MAS ADELANTE MODIFICARLO EN LA SIGUIENTE VENTANA
    localStorage.setItem("kitSelected" , getNameTarget.slice(1));
    // obtiene el contenido del kit 
    let getKitContent = await allAnswer(`SELECT content FROM kit WHERE id = '${getNameTarget}'`);
    let toObjet = JSON.parse(getKitContent[0]["content"]);
    for (let i = 0; i < Object.keys(toObjet).length; i++){
        const element = toObjet[i];
        let div         = document.createElement("div");
        div.className   = "productContainer";
        div.id          = "I"+element["id"];
        div.innerHTML   =`
        <strong>${element["id"]}</strong>
        <strong>${element["name"]}</strong>
        <strong>${element["brand"]}</strong>
        <strong id='cost_${element["id"]}'></strong>
        <strong id='sale_${element["id"]}'></strong>
        <input type='number' class='ammountInput'id='ammount_${element["id"]}' value='${element["ammount"]}'>
        <button class="${element["id"]}"></button>
        `;
        let numberPar = i/2;
        if(numberPar%1==0){
            div.style.background='#676767';
        }
        productsContainerOfTheKit.append(div);
        answerContent+=`'${element["id"]}',`;
    }
    let finalCostValue = 0;
    //Obtiene los costos y valores de venta de los productos
    let getValues = await allAnswer(`SELECT insideid , finalvalue , buyvalue FROM products WHERE insideid IN(${answerContent.slice(0,-1)})`);
    getValues.forEach(element => {
        document.getElementById("cost_"+element["insideid"]).textContent = element["buyvalue"];
        document.getElementById("sale_"+element["insideid"]).textContent = element["finalvalue"];
        let getAmmount = parseInt(document.getElementById("ammount_"+element["insideid"]).value);
        getAmmount = getAmmount * parseInt(element["buyvalue"]);
        finalCostValue+= getAmmount
    });
    costContent.value = finalCostValue.toLocaleString();
}

module.exports = {
    desplegateProductsOfTheKit
}