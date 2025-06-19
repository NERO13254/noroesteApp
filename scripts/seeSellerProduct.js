const {backBtn} = require("../functtions/backBtn");
const { startSearch } = require("../functtions/seeSellerProduct/startSearch");


window.onload = async()=>{
    // boton para volver atras
    backBtn(document.getElementById("backBtn"));

    // Busca el producto indicado
    document.getElementById("startSearch").addEventListener("click" , async(e)=>{ 
        await startSearch(e);
    });
}