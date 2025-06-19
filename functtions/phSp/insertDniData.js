const { answers } = require("./answers");

async function insertDniData(e) {
    const searchContent = await answers.readLikeClient(e.target.value);
    console.log(searchContent);
    if(searchContent.length>0){
        // recorre todos los resultados y los inserta en el html
        let keysData =  Object.keys(searchContent[0]);
        keysData.forEach(element=>{
            
            // obtiene el input de cada elemento
            let getInput = document.getElementById(element);
            getInput = !getInput ? document.getElementsByName(element)[0] : getInput;
            if(getInput){
                if(element=="provincia" || element=="idtype"){
                    let txtOp = searchContent[0][element];
                    getInput.append(new Option(txtOp, txtOp, true, true));
                }else{
                    getInput.value =  searchContent[0][element];
                }
            }
        });
    }
}


module.exports = {
    insertDniData
}