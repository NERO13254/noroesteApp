const { addPecToHtml } = require("../functtions/pecList/addPecToHtml");
const { answers } = require("../functtions/pecList/answers");
const { createPec } = require("../functtions/pecList/createPec");
const { removePec } = require("../functtions/pecList/removePec");
const { searchPec } = require("../functtions/pecList/searchPec");

window.onload = async()=>{
    let defaultData = document.getElementById("defaultPecList");

    // añade los pec por defecto
    let getAllPecs = await answers.readAllPecs();
    getAllPecs.forEach(element => {addPecToHtml(element,defaultData);});
    
    // crear pec
    document.getElementById("addNewPec").addEventListener("click" , async()=>{
       await createPec();
    })

    // buscar pec
    document.getElementById("startSearchPec").addEventListener("keyup" , async(e)=>{
        if(e.target.value.length>1){
            await searchPec(e.target.value);
        }else{
            document.getElementById("resultOfSearchContainer").style.display='none'
        }
    });
    
    // elimina el pec 
    document.getElementById("generalPecsContainer").addEventListener("click" , async(e)=>{
        if(e.target.textContent=="x"){
           await removePec(e.target);
        }
    })
}