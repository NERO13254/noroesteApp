async function corroborateTrueCilinders() {
    // corrobora si existe o no el codigo de cilindro  ingresado
    let dataCil = Array.from(document.querySelectorAll(".infoSerialCils")).slice(1);
    arrData = [];
    number = 0;
    let answerContent = `SELECT id FROM typecilinders WHERE code =`;
    dataCil.map(data=>data.children[0].children[0].value.length>0 ? arrData.push(data.children[0].children[0].value) : "");

    
        if(arrData.length>0){
            let finalValue = ""

            for(let i = 0; i < arrData.length; i++) {
                const element = arrData[i];
                let getCilinderOfDb = await allAnswer(answerContent+`'${element.toUpperCase()}'`);
                number+= getCilinderOfDb.length>0 ? 1 : 0;
            }

            return new Promise((resolve, reject) => {
                finalValue = number == arrData.length ? true : false
                resolve(finalValue); 
            })
        }
    
}

module.exports = {
    corroborateTrueCilinders
}