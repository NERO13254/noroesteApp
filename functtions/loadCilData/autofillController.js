async function autofillController() {
    // modifica el boton siguiente o guardar
    if(localStorage.getItem("autoFil") && localStorage.getItem("autoFil")=='autoFilActivate' && !localStorage.getItem("idCilinderSaved")){
        autoFillbtn.textContent = 'Guardar';
        autoFillContent.style.backgroundColor='green';
        autoFillContent.style.color= "white";
    }else{
        autoFillbtn.textContent = 'Siguiente';
    }
    // modifica el autofill y el boton 
    document.getElementById("autoFill").addEventListener("click" , ()=>{
        localStorage.setItem("autoFil" , "autoFilActivate" );
        autoFillbtn.textContent = 'Guardar';
        autoFillContent.style.backgroundColor='green';
        autoFillContent.style.color= "white";
    });

    document.getElementById("autoFill").addEventListener("dblclick" , ()=>{
        localStorage.removeItem("autoFil");
        autoFillbtn.textContent = 'Siguiente';
        autoFillContent.style.backgroundColor='#ccc';
        autoFillContent.style.color= "black";
    })
}

module.exports = {
    autofillController
}