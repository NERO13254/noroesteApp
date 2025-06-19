const { answers } = require("./answers");
const { printAllSpecificData } = require("./printAllSpecificData");
const { reportStatus} = require("../reportStatus");

async function desplegateDataWafer(e){
    let append = e.target.nextSibling.nextSibling;
    append.innerHTML='';
    insideidContent= e.target.parentNode.id;
    dateListName = e.target.name;
    let collectData = await answers.collectColumntData(e.target.name , e.target.parentNode.id);
    let keys = [];
    if(collectData.length>0){
        keys = Object.keys(collectData[0]);
    }else{
        reportStatus("Error" , "El elemento  seleccionado no contiene información","Al momento de cargar la oblea , se almacenó sin los datos suficientes." ,1 ,["Aceptar"],["canelProcess"],document.getElementById("reportStatus"));
    }
    
    if(collectData.length>1){
        append.classList.toggle("onlyColumn");
    }

    for (let i = 0; i < collectData.length; i++) {
        const element = collectData[i];

        if(collectData.length<=1){
            // imprime los datos especificos de cada columna de informacion en HTML
           await printAllSpecificData(keys , element , append);
        }else{
            let div = document.createElement("div");
            div.className = "onlyData";
            div.id = `${element["serialnumber"]}`;

            div.innerHTML =`
                <button>${e.target.textContent + " " +(i+1)}</button>
            `;
            let info = document.createElement("div");
            info.className='onlyDataContent';
            
            await printAllSpecificData(keys, element , info)
            div.append(info);
            append.append(div);
        }

    }
    append.classList.toggle("grid");
}

module.exports = {
    desplegateDataWafer
}