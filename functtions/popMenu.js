const { ipcRenderer } = require("electron");


function buildedMenu(){
    const setSectionMenu= [{
        label: "COPIAR",
        click(){
            this.executeJavaScript(`console.log(window.getSelection().toString())`);
        }   
    },
    {
        label: "PEGAR",
        click(){console.log("hola")}   
    }];

    return setSectionMenu
}

module.exports = {
    buildedMenu
}