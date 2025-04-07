const {ipcRenderer} = require("electron");
const dbRed             = require("../db/dbRed");
const db                = dbRed.getDb(__dirname);
let backBtn     = require("../functtions/backBtn");
const { createTdm } = require("../functtions/newTdm/createTdm");
async function runAnswer(answer){
    return new Promise((resolve, reject) => {
        db.run(answer , (err)=>{
            if(err){
                console.log(err.message);
            }else{
                resolve();
            }
        });
    })
}
// boton volver
backBtn.backBtn(document.getElementById("backBtn") , "seeTdmSaved");
// al presionar crear
document.getElementById("saveClient").addEventListener("click" , async()=>{
    //se inserta el tdm en db
    await createTdm();
    window.close();
});