function buttonController(){
    // si se le da doble click se desactiva el boton de auto completado
    autoFill.addEventListener("dblclick" , ()=>{
        var nextWindow= document.getElementById("finishButton");
        localStorage.setItem("autoFil", "autoFilDesactivate");
        autoFillContent.style.background="#ccc";
        autoFillContent.style.color="black";
        faceBtn.innerHTML = ":I";
    
        nextWindow.className = "notFin";
        nextWindow.textContent = "SIGUIENTE";
    });
    // con un solo click se activa 
    autoFill.addEventListener("click" , ()=>{
        var nextWindow= document.getElementById("finishButton");
        localStorage.setItem("autoFil", "autoFilActivate");
        autoFillContent.style.background="green";
        autoFillContent.style.color="white";
        faceBtn.innerHTML = ":D";
    
        nextWindow.className = "finishProcess";
        nextWindow.textContent = "GUARDAR";
    });
    // y por ultimo esta la funcion de volver atras
    quitLoadCil.addEventListener("click" , ()=>{
        ipcRenderer.send("returnToChargeCilinders", "return");
        window.close();
    });
}

module.exports = {
    buttonController
}