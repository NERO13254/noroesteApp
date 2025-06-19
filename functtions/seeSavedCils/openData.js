async function openData(e) {
    let dataSelected = getComputedStyle( document.getElementById("seeCilinders"));
  
    if(dataSelected.backgroundColor == "rgb(255, 255, 255)"){
        localStorage.setItem("idCilinderSaved" , e.target.id);
        ipcRenderer.send("phSp"); 
    }else{
        localStorage.setItem("idCilinderSaved" , e.target.id);

        ipcRenderer.send("printCommitmentSheet");
        window.close();
    }
}

module.exports = {
    openData
}