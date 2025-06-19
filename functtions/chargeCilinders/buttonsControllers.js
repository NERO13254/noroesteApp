function  buttonsControllers(){

    // SALIR DE LA VENTANA
    document.getElementById("quitForm").addEventListener("click" , ()=>{
        let autoFilStatus   = localStorage.getItem("autoFil");
        let userAdmin       = localStorage.getItem("userAdmin");
        let idWorkShop      = localStorage.getItem("idWorkShop");
        localStorage.clear();
        localStorage.setItem("autoFil" , autoFilStatus); 
        localStorage.setItem("userAdmin" , userAdmin);
        localStorage.setItem("idWorkShop" , idWorkShop);

        ipcRenderer.send("seeSavedCilinders");
        window.close();
    });
    document.getElementById("nameandsurname").addEventListener("keydown" , (e)=>{
        if(e.key == "Enter"){
            document.getElementById("country").focus();
        }
    });

    document.getElementById("provincia").addEventListener("keydown" , (e)=>{

        if(e.key == "Enter"){
            document.getElementById("cp").focus();
        }
    });
    document.getElementById("cp").addEventListener("keydown" , (e)=>{

        if(e.key == "Enter"){
            document.getElementById("direccion").focus();
        }
    });
    document.getElementById("direccion").addEventListener("keydown" , (e)=>{
        if(e.key == "Enter"){
            domain.focus();
        }
    });

    
    let addCountry = document.getElementById("addCountry");
    // al darle click al boton + para añadir localidades
    addCountry.addEventListener("click", ()=>{
        ipcRenderer.send("addNewLocation");
    });

}

module.exports = {
    buttonsControllers
}