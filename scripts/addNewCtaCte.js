const { ipcRenderer }   = require("electron");
const dbRed             = require("../db/dbRed");
const db                = dbRed.getDb(__dirname);
const querys            = require("../functtions/addNewCtaCte/querys");
const reportStatus      = require("../functtions/reportStatus");
window.onload = ()=>{
    document.getElementById("saveCtaCte").addEventListener("click" , async()=>{
        // almacena los datos de los inputs en un objeto
        let getData = getDataFunc();
        // corrobora que los valores sean validos
        let dataNode = validateData(getData); 
        // si hay un campo con caracteres especiales o no aceptados
        if(dataNode.length>0){
            reportStatus.reportStatus("Error" , "Valor ingresado invalido" , `Los valores de los campos ${dataNode.join(" ,")}  deben corroborarse`  , 1 , ["Aceptar"] , ["canelProcess"] , document.getElementById("alertPrintedContent"))
        }else{
            // realiza la consulta a db y evalua si se efectuó o no 
            try {
                // si la consulta se realiza satisfactoriamente 
                await querys.queryAnswer.insertCtaCte(getData);
                ipcRenderer.send("backViewCtaCte");
                window.close();
            } catch (error) {
                // si ocurre un error en la base de datos 
                reportStatus.reportStatus("Error" , "Fallo en el guardado de datos", "No se pudo almacenar la cuneta corriente en la base debido a un inconveniente en esta" ,1 ,["Aceptar"], ["canelProcess"], document.getElementById("alertPrintedContent"))
            }
        }
    });
    // BOTON PARA CERRAR LA VENTANA
    document.getElementById("quiteCtaCte").addEventListener("click", ()=>{
        ipcRenderer.send("backViewCtaCte");
        window.close();
    });
    function getDataFunc(){
        // recorre todos los inputs con sus valores y crea un objeto con su id como key y valor 
        return Array.from(document.querySelectorAll(".fomContent input")).reduce((data, input) => {
            data[input.id] = input.value.trim();
            return data;
        } , {});
    }
    function validateData(formData) {
        return Object.entries(formData)
            .filter(([key, value]) => !value || /[^A-Za-z0-9.]/.test(value))
            .map(([key]) => key);
    }
}