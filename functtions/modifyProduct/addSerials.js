const { addRowController } = require("./addRowController");
const { addSerialController } = require("./addSerialController");
const { addSerialProcess } = require("./addSerialProcess");
const { addSerialsInArray } = require("./addSerialsInArray");
const { alertInfo } = require("./alertInfo");
const { deleteSerial } = require("./deleteSerial");
const { orderAndInsertSerialsInHtml } = require("./orderAndInsertSerialsInHtml");


async function addSerials(){
    let serialsArray = [];

    // crea la interfaz de las series html
    await addSerialController();

    // inserta las series en el array "serialsArray"
    await addSerialsInArray(serialsArray);

    // una vez que se insertaron las series en el array lo ordena y lo inserta en html
    await orderAndInsertSerialsInHtml(serialsArray);
    let rowsContent = document.getElementById("rowsOfInputsContent");
    
    // al presionar el boton "+" de la interfaz agrega una fila de codigo y serie
    document.getElementById("addRowControllers").addEventListener("click" , ()=>{
        // agrega la fila de inputs extra
        addRowController(rowsContent);
    });
    // al presionar el boton "-" se elimina el modulo seleccionado
    rowsContent.addEventListener("click" , (e)=>{
        if(e.target.parentNode.className=="containerRow" &&  e.target.tagName=="BUTTON"){
            e.target.parentNode.remove();
        }
    })
    // al presinar i en multiple 
    document.getElementById("infoMultiple").addEventListener("click" , ()=>{
        let message =  `
        <strong>Ingreso Correlativo de Series</strong> <br>
        Esta herramienta permite añadir múltiples series de manera automática en una sola acción. <br>

        <strong> Campo Inicial:</strong> Ingresa el número con el que deseas iniciar la serie.<br>
        <strong> Campo Final: </strong> Ingresa el número con el que deseas finalizar la serie.<br>
        <strong> ejemplo: </strong> <br>
        Si el valor base es <strong>"30" </strong>, y defines en el Campo Inicial el número <strong> 1 </strong> y en el Campo Final el número <strong>5</strong>, se agregarán las series: <strong> 301, 302, 303, 304, 305. </strong> <br>
        `;
        // añade la informacion al html
        alertInfo(message ,document.getElementById("listContainer"));
    });
    // al presionar "añadir" se agrega la serie a db de manera ordenada y se actualiza el HTML
    document.getElementById("addSerials").addEventListener("click", async()=>{
       await addSerialProcess(serialsArray);
    });

    // al presionar alguno de los botones de checkbox se elimina la serie presionada
    document.getElementById("allSerials").addEventListener("click" , async(e)=>{
        // corrobora que se haya presinado el checkbox
        if(e.target.tagName=="INPUT" && e.target.getAttribute("type")=="checkbox"){
            await deleteSerial(e.target );
            // elimina la serie del array para que no se vuelva a agregar a la lista si se agrega otra serie
            serialsArray = serialsArray.filter(data=> data!= e.target.parentNode.children[0].textContent );
        }
    });

    // al presionar el boton  "cancelar" se cierra la ventana emergente
    document.getElementById("cancelProcess").addEventListener("click" , ()=>{
        serialWindowEmergentContent.innerHTML='';
    });
}
module.exports ={
    addSerials
}