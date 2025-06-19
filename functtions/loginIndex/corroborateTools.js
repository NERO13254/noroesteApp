const { getToolsInfo } = require("./answers")

async function corroborateTools() {
    // obtiene la fecha de vencimiento y el nombre de las herramientas
    let getDataTools = await getToolsInfo();
    
    let newDate = new Date();
    let dateNow = `${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}`;

    // recorre los resultados y evalua si estan por vencerse o ya lo están
    for (let i = 0; i < getDataTools.length; i++) {
        const element = getDataTools[i];
        let toolDate = compatibleDate(element["expiredDate"]);
        let nowDate = compatibleDate(dateNow);

        let timeDifrence = toolDate - nowDate;
        timeDifrence = Math.floor(timeDifrence / (1000*60*60*24));

        if(timeDifrence<=30){
            let div = document.createElement("div");
            div.className="expiredAlert";
            div.innerHTML = `
            <p>la herramienta <strong>${element["toolName"]}</strong>
            está pronta a revisión debido a que en
            ${timeDifrence} días finalizará el certificado de revisión
            </p>

            <button>Aceptar</button>
            `;
            document.getElementById("toolAlertExpired").append(div)
        }
    }

    function compatibleDate(date){
        const [dia , mes , anio] = date.split("/").map(num=> parseInt(num,10));
        return new Date([anio, mes-1 , dia]);
    }

    document.getElementById("toolAlertExpired").addEventListener("click" , (e)=>{
        if(e.target.tagName=="BUTTON"){
            e.target.parentNode.remove();
        }
    })
}

module.exports = {
    corroborateTools
}