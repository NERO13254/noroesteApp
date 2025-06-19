async function newCilinder() {
    localStorage.removeItem("getDataUser");
    localStorage.removeItem("cilinderInfo");
    localStorage.removeItem("idCilinderSaved");
    localStorage.removeItem("dataUser");
    ipcRenderer.send(`phSp`); 
}

module.exports = {
    newCilinder
}