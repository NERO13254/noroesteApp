const {desplegateSettingsMenuVoucherSeleected} = require("./desplegateSettingsMenuVoucherSeleected");
const {desplegateListCtaCtes} = require("./desplegateListCtaCtes");
const {searchCtaCteInList} = require("./searchCtaCteInList");
const {replaceNameCtaCte} = require("./replaceNameCtaCte");
const {reloadTotalValue} = require("./reloadTotalValue");

async function settingsForVoucher() {
    // funcion que se encarga de desplegar el menu de modificacion de remito
    historyOperations.addEventListener("click" , async(e)=>{
        if(e.target.className=='modifyVoucher' && e.target.tagName=="BUTTON"){
            insideIdVoucher = e.target.id;
            idVoucherContent=e.target.id;
            // despliega el menú de modificaicon y autocompleta la informacion
            await desplegateSettingsMenuVoucherSeleected(e.target);
            getTarget = e.target;
            divContent = e.target.parentNode;
        }
    });
    // al presionar "V" del menú desplegado , se abre la lista de cta  cte  para cambiar el dueño del remito
    document.getElementById("changeOwner").addEventListener("click"  , async()=>{
       await desplegateListCtaCtes();
    });
    // funcion para buscar la cta cte
    searchCtaCte.addEventListener("keyup" , (e)=>{
        if(e.target.value.length>1){
           searchCtaCteInList(e.target.value);
        }else{
            resultsOfTheSearch.style.display ='none';
        }
    });
    // al cambiar el debito se ajusta  el total al presionar enter
    debit.addEventListener("keyup" , async(e)=>{
        if(e.key=="Enter"){
            enterKeyPress = true;
            let getNumber = 0;
            if(parseInt(getTarget.parentNode.children[2].textContent)!=0){
                getNumber = parseInt(getTarget.parentNode.children[2].textContent) *-1;
            }else{
                getNumber = getTarget.parentNode.children[3].textContent;
            }
            let getInputValue = parseInt(e.target.value.replace(/\./g , ""))*-1;

            await reloadTotalValue.reloadTotalValue(getInputValue , getNumber , getTarget );
            pay.value=0;
        }
    });

    // al cambiar el pago se ajusta el total al pressionar enter
    pay.addEventListener("keyup" , async(e)=>{
        if(e.key=="Enter"){
            enterKeyPress= true;
            let getNumber = 0;
            if(parseInt(getTarget.parentNode.children[2].textContent)!=0){
                getNumber = parseInt(getTarget.parentNode.children[2].textContent)*-1;
            }else{
                getNumber = getTarget.parentNode.children[3].textContent;
            }
            
            let getInputValue = parseInt(e.target.value.replace(/\./g , ""));
            await reloadTotalValue(getInputValue , getNumber , getTarget);
            debit.value=0;
        }
    });

    // al seleccionar uno de los elementos del menu "V" desplegado se remplaza el nombre  de la ctacte
    document.getElementById("containerAllResults").addEventListener("click" , (e)=>{
        replaceNameCtaCte(e.target);
    });
    // cancelar la modificacion del remito
    cancelSettingsVoucher.addEventListener("click" , ()=>{
        enterKeyPress=false;
        document.getElementsByClassName("intputContainer")[0].style.display='none';
    });
}

module.exports = {
    settingsForVoucher
}