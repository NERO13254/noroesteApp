const { answers } = require("./answers");
const { calculateTotal } = require("./calculateTotal");

async function searchKits(params) {
    // recorre todos eos elementos almacenados en los kit y crea un div con los datos de cada uno  para poder
    // ser seleccionados
    let kits = await answers.readAllKits();
    let kitContainerResults = document.getElementById("kitContainerResults");
    kits.forEach(element => {
        let div = document.createElement("div");
        div.className='kitContent'
        div.innerHTML=`
        <strong>${element["id"]}</strong>
        <strong>${element["name"]}</strong>
        <strong>NE</strong>
        <strong>${parseInt(element["salevalue"]).toLocaleString()}</strong>
        <strong>1</strong>
        <input type='checkbox' >
        `
        kitContainerResults.append(div);
    });

    kitContainerResults.addEventListener("click" , (e)=>{
        let data = e.target.parentNode.cloneNode(true);
        data.children[5].remove();
        console.log(data)
        data.className = "contentProduct"

        let ammount = document.createElement("strong");
        ammount.textContent = "$ "+data.children[3].textContent
        data.append(ammount);

        let btn = document.createElement("button");
        btn.textContent = "x";

        data.append(btn);
        document.getElementById("listProdContent").append(data);
        document.getElementsByClassName("kitContainer")[0].classList.toggle("show");

        calculateTotal();
    })
}

module.exports = {
    searchKits
}