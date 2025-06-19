const { desplegateSerials } = require("../functtions/addSerialsFromWeb/desplegateSerials.js");
const { insertSerialsInDb } = require("../functtions/addSerialsFromWeb/insertSerialsInDb.js");
const { loadMessages } = require("../functtions/addSerialsFromWeb/loadMessages.js");
const { loadSerialsInHtml } = require("../functtions/addSerialsFromWeb/loadSerialsInHtml.js");
const {reportStatus}         = require("../functtions/reportStatus.js");
const {backBtn} = require("../functtions/backBtn");
const { deleteRequest } = require("../functtions/addSerialsFromWeb/deleteRequest.js");
var serialsContent = document.getElementById("serialsContent");
var dataRemoved = [];
window.onload = async()=>{
    // boton para volver atras
    backBtn(document.getElementById("backBtn"));
    
    // imprime todas las series generales en el HTML
    let response = await loadMessages();
    await loadSerialsInHtml(response);

    // al seleccionar alguna serie general despliega todas las series del elemento
    serialsContent.addEventListener("click" , async(e)=>{
        await desplegateSerials(response , e);
    });

    // al darle "x" a alguna serie se elimina
    serialsContent.addEventListener("click" , (e)=>{
        if(e.target.className=='removeSerial'){
            let serialSelected = e.target.parentNode.children[0].textContent;
            response = response.filter(data=>data["serial"]!= serialSelected )
            e.target.parentNode.remove();
        }
        
    });

    // al darle cargar al contenedor general de series
    serialsContent.addEventListener("click" , async(e)=>{
        
        if(e.target.id=='loadSerials'){
            let insideid = e.target.parentNode.children[0].textContent;
            if(e.target.textContent=="Cargar otra vez"){
                reportStatus("Aviso","Paquete de series cargado" , "El conjunto de series que intenta cargar , ya se efectuó previamente , ¿desea vovler a cargar las mismas series? tenga en cuenta que estas serán repetidas" , 2 , ["cancelar" , "Aceptar"] , ["canelProcess" , "procedeToInsert"], document.getElementById("reportStatus"));
                
                document.getElementById("reportStatus").addEventListener("click" , async(e)=>{
                    if(e.target.id=="procedeToInsert"){
                        await insertSerialsInDb(response ,insideid , e.target);
                        document.getElementById("reportStatus").innerHTML='';
                    }
                })
            }else{
                await insertSerialsInDb(response ,insideid , e.target);
                await deleteRequest();
            }
        }
    })
}