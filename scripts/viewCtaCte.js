const {ipcRenderer}         = require("electron");
const dbRed                 = require("../db/dbRed");
const db                    = dbRed.getDb(__dirname);
const {adminInfo}           = require("../adminInfo");
const clickerCount          = require("../functtions/clickerCount");
const loadFinalClient       = require("../functtions/viewCtaCte/loadFinalClient");
const reloadList            = require("../functtions/viewCtaCte/reloadList");
const reportStatus          = require("../functtions/reportStatus");
const statusContent         = document.getElementById("statusContent");
var addCtaCte               = document.getElementById("addCtaCte");
var listCtaCte              = document.getElementById("listCtaCte");
var searchInput             = document.getElementById("searchInput");
var contentSearchedCtaCte   = document.getElementById("contentSearchedCtaCte");
var delteCtaCte             = document.getElementById("delteCtaCte");
let voucherConditional      = false;
async function allAnswer(answer){
    return new Promise((resolve, reject) => {
        db.all(answer, (err , row)=>{
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
        db.all(answer, (err)=>{
            if(err){
                console.log(err.message);
            }else{
                resolve();
            }
        })
    })
}


addCtaCte.addEventListener("click" , ()=>{
    ipcRenderer.send("addNewCtaCte");
    window.close();
});

ipcRenderer.on("reloadQueryList", ()=>{
    voucherConditional = true;
})

var adminStatus = localStorage.getItem("userAdmin");
var adminSplit  = adminStatus.split(",");
if(adminSplit[0] !=  adminInfo[0] || adminSplit[1] != adminInfo[1]){
    delteCtaCte.style.display="none";
    document.getElementById("addCtaCte").style.display='none';
}


// FUNCION PARA BORRAR LA CTACTE
function startRemoveCtaCte(e){
    let getName = e.target.className;
    if(getName.charAt(0)=="L"){
        console.log(getName.slice(1));
        delteCtaCte.addEventListener("click" , async()=>{
            reportStatus.reportStatus("Aviso de preservación de datos" , "Estás por Eliminar una cuenta corriente" , "si eliminas una cuenta corriente ya no tendrás acceso a los pagos y debitos de esta . Corrobore que la cuenta haya quedado sin saldo pendiente" ,2 , ["Cancelar" , "Eliminar"],["canelProcess" , "deleteCtaCteConfirm"] ,statusContent);
            
            // obtiene el boton eliminar y al ser presionado procede a eliminar la ctacte
            document.getElementById("deleteCtaCteConfirm").addEventListener("click" , async()=>{
                await runAnswer(`DELETE FROM cuentascorrientes WHERE id = '${getName.slice(1)}' `);
                await runAnswer(`DELETE FROM payordebit WHERE owner = '${getName.slice(1)}' `);
                e.target.parentNode.remove();
                statusContent.innerHTML="";
            })
        });
    }
}
window.onload = ()=>{
    // AL CARGA LA APP CARGA LA  LISTA DE CTA CTE
    reloadList.reloadList();

}

// AL DARLE DOBLE CLICK A ALGUNA CTACTE SE GUARDA EN EL LOCLSTRGE Y SE VA  A LA SIGUIENTE VENTANA
listCtaCte.addEventListener("dblclick" , (e)=>{
    var idCtaCte = e.target.className;
    var firstLetter = idCtaCte.charAt(0);
    if(firstLetter == "L"){
        var clearLetter = idCtaCte.slice(1);
        localStorage.setItem("idCtaCte", clearLetter);
        let contentWindow = "modifyCtaCte";
        if(voucherConditional){
            contentWindow = "newVucher";
        }
        clickerCount.clickerCount(clearLetter, "cuentascorrientes" ,"cuentascorrientes");
        localStorage.removeItem("finalConsumer");
    }else{
        localStorage.setItem("finalConsumer" , "000");
    }

    ipcRenderer.send("modifyCtaCte");
    window.close();
});
// AL DARLE CLICK SE ACTIVA EL LISTENER PARA ELIMINAR UNA CTACTE
listCtaCte.addEventListener("click" , (e)=>{
    startRemoveCtaCte(e);
    let getID = document.querySelector("."+e.target.className).parentNode;
    getID.style.background="#ccc";
    console.log(getID);
});
// FUNCION PARA BUSCAR UNA CTACTE Y PINTARLA EN EL HTML
function startSearch(){
   var getVal = searchInput.value;
   db.all("SELECT id , name FROM cuentascorrientes WHERE name LIKE '%' || ? || '%'  ORDER BY id DESC LIMIT 5" , [getVal], (err, row)=>{
        if(err){
            console.log(err.message);
        }
        else{
            contentSearchedCtaCte.innerHTML= "";
            if(getVal.length <=1 ){
                contentSearchedCtaCte.innerHTML= ""; 
            }else{

            for (let i = 0; i < row.length; i++) {
                const rowsContent = row[i];
                var div         = document.createElement("div");
                div.className   = "resultContent";
                div.innerHTML   = `
                    <strong>${rowsContent["name"]}</strong>
                    <input type="checkbox" class="L${rowsContent["id"]}">
                `;
                contentSearchedCtaCte.append(div);
            }
            }
        }
   });
}

// AL PRESIONAR UNA CTACTE DEL BUSCADOR ENVIA LOS DATOS Y SALTA A LA SIGUIENTE VENTANA
contentSearchedCtaCte.addEventListener("dblclick" , (e)=>{
    var idCta           = e.target.className;
    var firstLetter     = idCta.charAt(0);

    if(firstLetter == "L"){
        var clearLetter = idCta.slice(1);

        localStorage.setItem("idCtaCte", clearLetter);
        let contentWindow = "modifyCtaCte";
        if(voucherConditional){
            contentWindow = "newVucher";
        }
        console.log(contentWindow);
        clickerCount.clickerCount(clearLetter, contentWindow ,"cuentascorrientes");
    }
});
contentSearchedCtaCte.addEventListener("click" , (e)=>{
    startRemoveCtaCte(e);
});