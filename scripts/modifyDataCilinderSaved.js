const sqlite3   = require("sqlite3");
const db        = new sqlite3.Database("db/db.db");
const reloadData= document.getElementById("reloadData");
const modifyInsideId = document.getElementById("modifyInsideId");
const modifyCertificateNumber = document.getElementById("modifyCertificateNumber");

reloadData.addEventListener("click"  , ()=>{
    db.run("UPDATE cilindersaved SET  insideid=? , certificatenumber=? WHERE id =(SELECT id FROM cilindersaved ORDER BY id DESC LIMIT 1);",
    [modifyInsideId.value , modifyCertificateNumber.value]
    ,(err)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log("LOS NUMEROS SE ACTUALIZARON");
            window.close();
        }
    })
});