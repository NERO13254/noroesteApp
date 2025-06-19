async function dataValve(firstFiveDataTxt , element, valvePath){
    let valveText = "";

    for (let i = 0; i < 4; i++) {
        let codeValve           = element["codeValve"+i]            || "-";
        let serialValve         = element["serialValve"+i]          || "-";
        let typeOperationValve  = element["typeOperationValve"+i]   || "-";
        let codeCil             = element["codeCil"+i]              || "-";
        let serialCil           = element["serialCil"+i]            || "-";
        if(codeValve != "-" && serialValve != "-" && typeOperationValve!= "-" && codeCil!="-" && serialCil!="-"){
            valveText= `${firstFiveDataTxt}${codeValve};${serialValve};${typeOperationValve};${element["firstDateClient"]};${codeCil};${serialCil};A;`+"\n";

            fs.appendFileSync(valvePath , valveText , (err)=>{
                if(err){
                    console.log(err.message);
                }
            });
        }
    }

    return new Promise((resolve, reject) => {
        resolve();
    })
}

module.exports = {
    dataValve
}