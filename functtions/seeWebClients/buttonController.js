async function buttonController(e) {
    // se crea la alerta
    let getId = e.target.id;
    let div = document.createElement("strong");
    let alertContainer    = document.getElementById("alertContainer");
    let referenceAcces = document.getElementById("I"+getId.slice(1));
    div.className = "alertContent";
    alertContainer.innerHTML="";

    // envia la petición a la API 
    grantAccesClient.grantAccesClient(getId);
    
    e.target.className.length>2 ? referenceAcces.parentNode.style.display="none" : referenceAcces.innerHTML=e.target.className;
    // se le asigna el contenido a la alerta y se imprime en el html
    div.innerHTML = e.target.name;
    alertContainer.append(div);
}


module.exports = {
    buttonController
}