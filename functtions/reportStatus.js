function reportStatus(title , affair , detailsPrint , ammountBtn , nameBtn , idBtn ,alertConainer ){
    // limpia el contenedor de alertas
    alertConainer.innerHTML="";

    // crea la alerta y hace un bucle for agregando la cantidad de botones deseada suponiendo que los datos vengan en array
    let div = document.createElement("div");
    div.className = "deleteOrtherProductAlert";
    div.innerHTML =`
    <strong class="alertTitleContainer">${title}</strong>
    <strong class="confirmMessageAlert">${affair}</strong>
    <p>${detailsPrint}</p>
    
    <div class="buttonCntrollerContainer" id="buttonCntrollerContainer">

    </div>
    `;
    alertConainer.append(div);
    // for que recorre los datos del boton para añadirlos al  html
    let buttonCntrollerContainer = document.getElementById("buttonCntrollerContainer");
    for (let i = 0; i < ammountBtn; i++) {
        let buttons = document.createElement("button");
        buttons.textContent = nameBtn[i];
        buttons.id          = idBtn[i];
        buttonCntrollerContainer.append(buttons);
    }
    // corrobora si existe el boton para cerrar la ventana y si existe añade la funcion 
    if(document.getElementById("canelProcess")){
        document.getElementById("canelProcess").addEventListener("click", ()=>{
            div.style.display="none";
        })
    }
}
module.exports = {
    reportStatus
}