const {backBtn} = require("../functtions/backBtn");
const { createCtaCte } = require("../functtions/modifyCtaCteSection/createCtaCte");
const { defaultCtaCtes } = require("../functtions/modifyCtaCteSection/defaultCtaCtes");
const { deleteCtaCte } = require("../functtions/modifyCtaCteSection/deleteCtaCte");
const { desplegateInforCtaCte } = require("../functtions/modifyCtaCteSection/desplegateInforCtaCte");
const { insertCtateInDb } = require("../functtions/modifyCtaCteSection/insertCtaCteInDb");
const { startSearch } = require("../functtions/modifyCtaCteSection/startSearch");
const { updateCtaCteData } = require("../functtions/modifyCtaCteSection/updateCtaCteData");

window.onload = async()=>{
    backBtn(document.getElementById("backBtn"));

    // carga las cuentas corrientes por defecto
    await defaultCtaCtes();

    // buscador
    document.getElementById("searchCtaCte").addEventListener("keyup" , async(e)=>{
       await startSearch(e.target);
    });

    // al seleccinar una cuenta corriente
    document.getElementById("containerAllResults").addEventListener("click" , async(e)=>{
       e.target.getAttribute("type")=="checkbox" ? await desplegateInforCtaCte(e.target) : "";
    });

    // al presionar "cancelar" cierra la ventana de modificación
    document.getElementById("cancelOperation").addEventListener("click" , ()=>{
        document.getElementById("sectionModify").style.display='none';
    });

    // al presionar en guardar 
    document.getElementById("saveOperation").addEventListener("click" , async()=>{
       await updateCtaCteData();
       window.close();
    });

    // al presionar el bton "+" despliega el menú para crar una cta cte
    document.getElementById("newCtaCte").addEventListener("click" , async()=>{
       await createCtaCte();
    });

    // al presionar el boton "crear" añade la cta cte a db
    document.getElementById("createCtaCte").addEventListener("click"  , async()=>{
        await insertCtateInDb();
        window.close();
    });

    // al pesionar el bton "borar cta cte"
    document.getElementById("deleteCtaCte").addEventListener("click" , async()=>{
       await deleteCtaCte();
    });
}