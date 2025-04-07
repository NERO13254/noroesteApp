const {ipcRenderer} = require("electron");
const sqlite3       = require("sqlite3");
const db            = new sqlite3.Database("db/db.db");
const searchData    = document.getElementById("searchData");
const defaultCharge = document.getElementById("defaultCharge");
const alertContnet  = document.getElementById("alertContnet");
const quitWindow    = document.getElementById("quitWindow");

// AL PRESIONAR EL BOTON BUSCAR SE LANZA LA FUNCION QUE BUSCA EL CILINRO Y LO IMPRIME EN PANTALLA
function startSearch(){
    db.all("SELECT paydate , serialnumber , status , insideid , certificatenumber FROM cilindersaved WHERE serialnumber = ?" ,
    [searchData.value],
    (err , row)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log(row.length);

            if(row.length>0){
                // SI ENCUENTRA COINCIDENCIAS OBTIENE EL NOMBRE DE LA CTACTE Y IMPRIME TODO EN EL HTML 
                defaultCharge.innerHTML="";
                alertContnet.innerHTML="";
                db.all("SELECT name FROM cuentascorrientes WHERE id = ?" , [row[0]["paydate"]] , (err , rows)=>{
                    if(err){
                        console.log(err.message);
                    }else{
                        let div         = document.createElement("div");
                        div.className   = "cilinderContent";
                        let statusConent= "";
                        if(row[0]["status"] == 0){
                            statusConent = "APROBADO";
                        }
                        else{
                            statusConent = "CONDENADO";
                        }
                        div.innerHTML   = `
                        <strong>${rows[0]["name"]}</strong>
                        <strong>${row[0]["serialnumber"]}</strong>
                        <strong>${statusConent}</strong>
                        <strong>${row[0]["insideid"]}</strong>
                        <strong>${row[0]["certificatenumber"]}</strong>
                        `;
                        defaultCharge.append(div);
                    }
                });
            }else{
                defaultCharge.innerHTML="";
                alertContnet.innerHTML="";
                let div         = document.createElement("div");
                div.className   ="alertContent";
                div.innerHTML   = `
                <strong>NO SE ENCONTRARON COINCIDENCIAS</strong>
                `;
                alertContnet.append(div);
            }
        }
    });
}

quitWindow.addEventListener("click" , ()=>{
    window.close();
});