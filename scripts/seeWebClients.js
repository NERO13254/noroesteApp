const {ipcRenderer} = require("electron");
const sqlite3       = require("sqlite3");
const db            = new sqlite3.Database("db/db.db");
const axios         = require("axios");
const getClients    = require("../functtions/API/getClients");
const usersContainer= document.getElementById("usersContainer");
const searchData    = document.getElementById("searchData");
const searchFor     = document.getElementById("searchFor");
const grantAccesClient  = require("../functtions/API/grantAccesClient");
const guide             = require("../functtions/guide");
const { searcherClients } = require("../functtions/seeWebClients/searcherClients");
const { buttonController } = require("../functtions/seeWebClients/buttonController");
const guideUsers        = document.getElementById("guideUsers");

// crea la guía de datos encima de la lista de usuarios
let createGuide = [{name:"id"},{name:"nombre"},{name:"taller"},{name:"acceso"}];
guide.printGuide(createGuide , guideUsers);

// LLAMA A LA API Y RETORNA LA LISTA DE USUARIOS DE LA WEB
getClients.getClients(usersContainer);


searchData.addEventListener("keyup" , (e)=>{
    // Busca los clientes segun el parametro establecido e imprime los resultados en HTML
    searcherClients(document.getElementById("searchResults") , e.target);
});

// FUNCIONALIDADES DE LOS BOTONES 
usersContainer.addEventListener("click" , async(e)=>{
    await buttonController(e);
});
// boton para cerrar la ventana
document.getElementById("closeWindow").addEventListener("click" , ()=>{
    window.close();
});