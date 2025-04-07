const { ipcRenderer , shell} = require("electron");
const apiPexeles= require("../functtions/API/apiPexeles");
const dbRed                 = require("../db/dbRed");
const db                    = dbRed.getDb(__dirname);
const adminPass = document.getElementById("adminPass");
const nameAdmin = document.getElementById("nameAdmin");
const loginAdmin= document.getElementById("loginAdmin");
const alert     = document.getElementById("alert");
const imgContent= document.getElementById("imgContent"); 
const phtoBy    = document.getElementById("phtoBy");
const pexeles = require("pexels");
const axios = require("axios");
const fs        =  require("fs");
const path      = require("path");
const { calculatePercent } = require("../functtions/loginIndex/calculatePercent");
const { corroborateTools } = require("../functtions/loginIndex/corroborateTools");

async function allAnswer(answer){
    return new Promise((resolve, reject) => {
        db.all(answer , (err , row)=>{
            if(err){
                console.log(err.message);
            }else{
                resolve(row);
            }
        })
    })
}
async function runAnswer(answer){
    return new Promise((resolve, reject) => {
        db.run(answer , (err)=>{
            if(err){
                console.log(err.message);
            }else{
                resolve();
            }
        })
    })
}
function nextForm(form , nextForm , appendForm){
    form.addEventListener("keyup" , (e)=>{
        if(e.key =="Enter"){
            if(appendForm=="appendForm"){
                sendData()
            }else{
                nextForm.focus();
            }
        }
    });
};
function sendData(){
    alert.innerHTML="";
    let infoContent = [nameAdmin.value , adminPass.value];
    localStorage.setItem("userAdmin",[nameAdmin.value , adminPass.value]);
    ipcRenderer.send("loginedUser" , infoContent );
    nameAdmin.value="";
    adminPass.value="";
}
window.onload = async()=>{

    // calcula el porccentaje de aumento diario
    await calculatePercent();

    await corroborateTools();

    loginAdmin.addEventListener("click" , ()=>{
        sendData();

        let imgContainer = document.getElementById("blurContent");
        imgContainer.style.backdropFilter="none";
        imgContainer.style.background = "none";
    });
    const getCopy   = path.resolve('C:\\Users\\Usuario\\Desktop\\electron\\2\\db\\db.db');
    const getPaste  = path.resolve('C:\\Users\\Usuario\\Desktop\\pruebba\\db.db');

}
nextForm(nameAdmin, adminPass);
nextForm(adminPass , "", "appendForm");
