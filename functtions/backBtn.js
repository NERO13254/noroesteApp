const { ipcRenderer } = require("electron");

function backBtn(addDivTInput , backTo){
    // crea el elemento P y lo añade al Div especificado
    let pContent            = document.createElement("p");
    pContent.className      = "pBackTo";        
    pContent.innerHTML      =` <img src="../img/backIcon.png" alt="">`
    addDivTInput.append(pContent);
    // si no se recibe renderer , cierra la ventana , sino , envía el renderer y cierra la ventana
    addDivTInput.addEventListener("click" , ()=>{
        if(backTo==undefined || backTo==""){
            window.close();
        }
        else{
            ipcRenderer.send(backTo);
            window.close();
        }
    })


}
module.exports = {
    backBtn
}