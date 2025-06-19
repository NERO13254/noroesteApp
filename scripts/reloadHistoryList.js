let calcTotal = require("./calcTotalFun");
async function reloadHystoryList(){
    // IMPRIME TODOS LOS REMITOS ASIGNADOS AL CLIENTE
    if(!localStorage.getItem("finalConsumer")){
        db.all("SELECT id , date , obs, debit , pay , total FROM payordebit WHERE owner = ? ORDER BY id DESC" , [idCtaCte],(err , vou)=>{
            if(err){
                console.log(err.message);
            }else{
                historyOperations.innerHTML="";
                for (let i = 0; i < vou.length; i++) {
                    const element = vou[i];
                    let div         = document.createElement("div");
                    div.className   ="inputHistoryContent";
                    div.id          =i+"contInput";
    
                    let obsContent = `<strong>${element["obs"]}</strong>`;
    
                    if(element["obs"].slice(0,2) == "pH"){
                        let onlyData = element["obs"].split(",");
                        obsContent = `
                        <div class="containerInfoPh">
                            <div class="contentInfoPh">
                                <p>${onlyData[1]}</p>
                                <p>${onlyData[2]}</p>
                                <p>${onlyData[3]}</p>
                            </div>
                        </div>
                        `;
                    }
                    div.innerHTML   = `
                    <strong>${element["date"]}</strong>
                    ${obsContent}
                    <strong>${element["debit"].toLocaleString()}</strong>
                    <strong>${element["pay"].toLocaleString()}</strong>
                    <strong>${element["total"].toLocaleString()}</strong>
                    `;
                    historyOperations.append(div);
                }
                // CREA UN BUCLE FOR PARA EL CUAL SUMA DE A 2 A I , OBTIENE EL ID DE LA LISTA  DE PRODUCTOS Y LOS PINTA DE 
                // OTRO  COLOR , GENERANDO QUE PINTE UNO SI Y UNO NO
                let getNumbers = parseInt(historyOperations.children.length)-1 ;
                for (let i = 1; i <= getNumbers ; i+= 2) {
                    document.getElementById(i+"contInput").style.background = "#ededed";
                }
                let totalContainer       = document.getElementById("totalVal");
                // inserta el valor total
                calcTotal.calcTotal(totalContainer);
            }
        });
    }else{
        let getVouchersAnswer = `SELECT insideid , content , date FROM remitos WHERE owner = '000' ORDER BY id DESC`;
        const getData         = await allAnswer(getVouchersAnswer);

        for (let i = 0; i < getData.length; i++) {
            const element   = getData[i];
            let div         = document.createElement("div");
            div.className   ="inputHistoryContent";
            div.id          =i+"contInput";

            let getContent = JSON.parse(element["content"]);

            div.innerHTML   = `
            <strong>${element["date"]}</strong>
            <strong>RMTO ${element["insideid"]}</strong>
            <strong>--</strong>
            <strong>--</strong>
            <strong>${getContent[0]["totalvalue"]}</strong>
            `;
            historyOperations.append(div);
        }
    }

}
module.exports = {
    reloadHystoryList
}