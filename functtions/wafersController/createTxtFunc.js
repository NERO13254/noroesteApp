const fs = require("fs");
const { orderFirstFiveData } = require("./orderFirstFiveData");

async function createTxtFunc(obj , append, firstPart) {
    var txt = "";
    let objKey = Object.keys(obj).slice(2);

    // si encuentra el contenedor del os primeros 5 valores lo agrega
    if(firstPart){
        txt += await orderFirstFiveData(firstPart);
    }

    // inserta los valores en el txt
    objKey.forEach(element => {
        txt+= `${obj[element]};`;
    });

    // inserta una A; por si hay otro dato
    txt+="A;\n";

    try {

        fs.appendFileSync(append , txt , "utf-8");
        
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = {
    createTxtFunc
}