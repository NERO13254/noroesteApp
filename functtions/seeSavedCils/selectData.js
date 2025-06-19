async function selectData(e) {
    // corrobora que tipo de dato fué seleccionado
    let dataSelected = getComputedStyle( document.getElementById("seeCilinders"));
  
    if(dataSelected.backgroundColor == "rgb(255, 255, 255)"){
        localStorage.setItem("idCilinderSaved" , e.target.id);
        localStorage.removeItem("idWaferSaved");
    }else{
        localStorage.setItem("idWaferSaved" , e.target.id);
        localStorage.removeItem("idCilinderSaved");
    }

    e.target.parentNode.classList.toggle("changeBG");
}

module.exports = {
    selectData
}