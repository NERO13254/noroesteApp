const {ipcRenderer}     = require("electron");
const dbRed             = require("../db/dbRed");
const db                = dbRed.getDb(__dirname);
const buttonController  = document.getElementById("buttonController");
const modifyAcount      = document.getElementById("modifyAcount");
const listContetnt      = document.getElementById("listContetnt");
const backContent       = document.getElementById("backBtn");
const backBtn           = require("../functtions/backBtn");
const listGuide         = require("../functtions/guide");
const adminInfo         = require("../adminInfo");
async function allAnswer(answer){
    return new Promise((resolve, reject) => {
        db.all(answer , (err, row)=>{
            if(err){
                console.log(err.message);
            }
            else{
                resolve(row);
            }
        })
    })
}
// cuando carga la ventana se insertan los datos del consumidor final en la lista
window.onload = async()=>{
 
    let getAdminData = localStorage.getItem("userAdmin").split(",");
    console.log(adminInfo.adminInfo);
    console.log(getAdminData);
    if(getAdminData[0] == adminInfo.adminInfo[0]  && getAdminData[1] == adminInfo.adminInfo[1] ){
        modifyAcount.style.display="flex";
    }

    let getFinalConsumer = `SELECT id , name , ammountpercent FROM finalconsumer WHERE 1`;
    const getInfo        = await allAnswer(getFinalConsumer);
    let div = document.createElement("div");
    div.className   = "containerClient";
    div.innerHTML   = `
    <strong id="idUser">${getInfo[0]["id"]}</strong>
    <strong id="nameUser">${getInfo[0]["name"]}</strong>
    <strong id="percentUser">${getInfo[0]["ammountpercent"]}</strong>
    <input type="checkbox" class="selectedClient">
    `;
    listContetnt.append(div);
    let nameContent = [
        {name: "Aumento Porcentual"},
        {name: "Nombre"},
        {name :"Id" }
    ]
    listGuide.printGuide(nameContent,listContetnt ,"append");
    backBtn.backBtn(backContent , "");
}
    
listContetnt.addEventListener("click" , (e)=>{
    let clickedUser = e.target.className;
    if(clickedUser == "selectedClient"){
        let obUser= [
            document.getElementById("idUser").textContent,
            document.getElementById("nameUser").textContent,
            document.getElementById("percentUser").textContent
        ]
        localStorage.setItem("finalConsumer" , JSON.stringify(obUser));
        ipcRenderer.send("newVucher");
        window.close();
    }
});

// si se hace click en modiicar cuenta se envia a la seccion de modificar la cuenta
modifyAcount.addEventListener("click" , ()=>{
    ipcRenderer.send("modifyEndConsumer");
    window.close();
})