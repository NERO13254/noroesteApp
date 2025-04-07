const { ipcRenderer } = require("electron");
const sqlite = require("sqlite3");
const db     = new sqlite.Database("db/db.db");

window.onload= ()=>{
    var checkContent = document.querySelectorAll("input[type='checkbox']");
    var checkContent = document.getElementById("checkContent");
    var num = 0 ;
    var saveAndExit = document.getElementById("saveAndExit");
    var backTo = document.getElementById("backTo");

    checkContent.addEventListener("click" , (e)=>{
        var targetContent =  e.target.className; 
        if(targetContent.charAt(0)=="A"){
            var clearTarget = targetContent.slice(1);
            num = clearTarget;

            db.all("SELECT id FROM cilindersaved ORDER BY id DESC LIMIT 1 " , (err, row)=>{
                if(err){
                    console.log(err.message);
                }else{

                    console.log(row[0]["id"] , num);
                     db.run("UPDATE cilindersaved SET status = ? WHERE id = ? " , [ clearTarget , row[0]["id"]], (err)=>{
                        if(err){
                            console.log(err.message);
                        }else{
                            alert("SE ACTUALIZO EL VALOR DE CONDENA");
                        }
                     })
                }
            });

        }
    });
    saveAndExit.addEventListener("click", ()=>{
        ipcRenderer.send("payCilinder");
        window.close();
    });
    backTo.addEventListener("click", ()=>{
        ipcRenderer.send("backtoTestAndDiameter");
        window.close();
    });

}