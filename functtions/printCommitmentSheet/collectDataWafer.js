const { getWorkShopCode } = require("./answers");

async function collectDataWafer(getWaferData) {
    // deselecciona todos los inputs checkbox
    document.querySelectorAll("input[type='checkbox']").forEach(element=>{element.checked=false;});
    // obtiene todas las claves y las recorre
    let getKeys         = Object.keys(getWaferData[0]);
    for (let i = 0; i < getKeys.length; i++) {
        // intenta seleccionar el elemento HTML con el id coincidiente con la clave  del objeto 
        let dataHtml = document.getElementById(getKeys[i]);
        if(dataHtml){
            let vals =getWaferData[0][getKeys[i]];
            // evalua si es un checkbox o un input normal para insertar los datos
            if(dataHtml.getAttribute("type")=="checkbox" && vals=="X"){
                dataHtml.checked=true;
            }else{
                
                dataHtml.value = vals;
                if(dataHtml.name.slice(0,-1)=="cil" && dataHtml.id.slice(0,-1)=="serialnumber" && vals && vals.length>0){
                    let numCil =dataHtml.name.slice(-1);
                    waferCilinderDataObjContent[`cil${numCil}`]=`${vals}`;
                }
                // almacena los datos de la valvula en un objeto
                if(dataHtml.id.slice(0,-1)=='serialValve' &&  vals && vals.length>0){
                    waferValveDataSaved[`serialValve${dataHtml.id.slice(-1)}`]=vals;
                }
            }
           
        }   // el unico valor que no coincide con los valores de db es el numero de oblea
        else if(getKeys[i]=="oldOblea"){
            document.getElementById("wafer").value = getWaferData[0]["oldOblea"];
        }
        else{
            if(getKeys[i]=="dni"){
                document.getElementById("dniUser").value = getWaferData[0]["dni"];
            }
        }
    }
}

module.exports ={
    collectDataWafer
}