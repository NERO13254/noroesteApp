async function createCtaCte(params) {
    // hace visible y limpia los inputs del controlador de modificación 
    document.getElementById("sectionModify").style.display='block';
    document.querySelectorAll("#sectionModify input").forEach(element=>{
        element.value ='';
    });

    // oculta el boton guardar y despliega el boton crear
    document.getElementById("saveOperation").style.display='none';
    document.getElementById("deleteCtaCte").style.display='none';
    
    document.getElementById("createCtaCte").style.display='block';
}

module.exports = {
    createCtaCte
}