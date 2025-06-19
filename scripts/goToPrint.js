const { insertDataInHtml } = require("../functtions/goToPrint/src/insertDataInHtml");

window.onload = async()=>{
    // inserta los datos en el html 
   await insertDataInHtml();
} 
// inserta la fecha
let allDate         = document.getElementById("allDate");
let hourDay         = document.getElementById("hourDay");
var dateComplete    = new Date();
allDate.innerHTML   = `${dateComplete.getDate()}/${dateComplete.getMonth()+1}/${dateComplete.getFullYear()}`;
hourDay.innerHTML   =`${dateComplete.getHours()}:${dateComplete.getMinutes()}`;

// funcion desplegada por el botoon imprimir (imrpime la ventana)
function printHtml(){
    window.print();
}