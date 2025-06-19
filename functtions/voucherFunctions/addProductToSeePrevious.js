const { answers } = require("./answers");

async function addProductToSeePrevious(params) {
    let divPrduct = params.target.parentNode;
    // obteine el contenedor de las series y lo limpia
    let listSerial = document.getElementById("listSerial");
    listSerial.innerHTML ='';

    // si tiene series , las busca en db y las imprime en el HTML
    if(params.target.name == "SI"){
        let insideidProduct    = divPrduct.children[0].textContent;
        let nameProduct        =  divPrduct.children[1].textContent;
        document.getElementById("addProdList").style.display='none';
        let allSerials = await answers.readSerials(insideidProduct , nameProduct );
        allSerials.forEach(element => {
            let div = document.createElement("div");
            div.className='serialContent';
            div.innerHTML= `
            <strong>${element["serial"].toUpperCase()}</strong>
            <input type='checkbox' id='${element["id"]}'>
            `;
            listSerial.append(div);
        });

        document.querySelector(".generalSerials").style.display='block';
    }else{
        document.getElementById("addProdList").style.display='block';
        document.querySelector(".generalSerials").style.display='none';
    }

    document.querySelector(".selectedProductContent").style.display='grid';
    document.getElementById("contentProducts").style.display='none';
   
    document.getElementById("ammount").value='1';
    // inserta las especificaciones del producto 
    document.querySelectorAll(".selectedProductContent strong").forEach((element , index)=>{
        element.textContent = divPrduct.children[index].textContent;
    });
}

module.exports = {
    addProductToSeePrevious
}