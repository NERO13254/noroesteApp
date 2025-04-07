const { answer } = require("../functtions/worksAndRefill/answers");
const { printDataInHtml } = require("../functtions/worksAndRefill/printDataInHtml");
const {reportStatus} = require("../functtions/reportStatus");
const {succesAlert} = require("../functtions/succesAlert");
var createOrModifyElement = document.getElementById("createOrModifyElement");
var inputsCreateOrModify = createOrModifyElement.querySelectorAll(".dataElement");
var modifyOrCreate = "";
var idOfElementSelected = '';
var targetContent = "";
window.onload = async()=>{

    // obtiene todos los elementos de db
    let allElements = await answer.readElements();
    if(allElements.length>0){
        // crea el elemento HTML y lo añade a la lista
        allElements.forEach(element => {
            printDataInHtml(element,document.getElementById("defaultResults"))
        });
    }

    // al presionar el boton "crear" despliega el controlador para crear o  modificar un elemento
    document.getElementById("createElement").addEventListener("click", ()=>{
        createOrModifyElement.classList.toggle("gridShow");
        inputsCreateOrModify.forEach(element => {element.value=''});

        modifyOrCreate = "create";
    });
    // al presionar el boton "cancelar" del controlador de modificacion o creacion de elementos
    document.getElementById("cancelModifyOrCreateElement").addEventListener("click", ()=>{
        createOrModifyElement.classList.toggle("gridShow");
    });

    // al  presionar "modificar" en cualquier elemento de la lista 
    document.getElementById("generalListResults").addEventListener("click" , (e)=>{
        if(e.target.tagName=="BUTTON" && e.target.className=='modifyElement'){
            targetContent = e.target.parentNode;
            createOrModifyElement.classList.toggle("gridShow");
            modifyOrCreate = "modify";
            idOfElementSelected = e.target.name;
            let getAllInputs = e.target.parentNode.querySelectorAll(".elementData");
            getAllInputs.forEach(element=>{
                let nameContent = element.getAttribute("name");
                let vals = element.textContent;
                if(nameContent=="valuenew" || nameContent=='valueused'){
                    vals = parseInt(element.textContent.slice(1).replace(/\./g,""));
                }
                document.querySelector("#createOrModifyElement #"+nameContent).value=vals;
            });
        }else if(e.target.tagName=="BUTTON" && e.target.className=='deleteElement'){
            targetContent = e.target.parentNode;
            modifyOrCreate='delete';
            reportStatus("Aviso","¿Desea Eliminar el Elemento ?","Estás por eliminar el elemento definitivamente , si procede este proceso no tiene retorno" , 2, ["Cancelar","Aceptar"],["canelProcess","procedToDeleteElement"],document.getElementById("reportStatus"));
            document.getElementById("procedToDeleteElement").addEventListener("click" , ()=>{
                document.getElementById("reportStatus").innerHTML='';
                answer.deleteElement(e.target.name);
                e.target.parentNode.remove();
            })
        }
    });
    // al presionar "guardar" en crear o modificar un elemento
    document.getElementById("saveModifyOrCreateElement").addEventListener("click" , async()=>{
        let keys  ='';
        let values='';
        let data = "";
        let objData = {};
        inputsCreateOrModify.forEach(element=>{
            let id = element.id;
            let vals = element.value.trim().toLowerCase();
            if(id=="valuenew" || id=='valueused'){
                vals = parseInt(element.value.replace(/\./g,""));
            }
            keys += id+",";
            values+=`'${vals}',`;
            data += `${id}='${vals}',`;
            objData[id]=vals;
        })

        if(modifyOrCreate=="create"){
            answer.createEelement(keys.slice(0,-1), values.slice(0,-1));
            createOrModifyElement.classList.toggle("gridShow");
            succesAlert("Exito","Elemento creado con exito" , 1 , ["cancelProcess"],["Aceptar"],document.getElementById("reportStatus"))
            let getLastId = await answer.getLastId();  
            objData["id"]=getLastId;

            printDataInHtml(objData , document.getElementById("defaultResults"));
        }else{  
            // acualiza los datos del elemento existente
            answer.updateElement(data.slice(0,-1)  , idOfElementSelected);
            targetContent.querySelectorAll(".elementData").forEach((element,index)=>{
                element.textContent = inputsCreateOrModify[index].value;
            })
            createOrModifyElement.classList.toggle("gridShow");
            succesAlert("Exito","Elemento modificado con exito" , 1 , ["cancelProcess"],["Aceptar"],document.getElementById("reportStatus"))
        }
    });

    let allStrongs = Array.from(document.querySelectorAll(".elementData[name='name']"));
    let resultsOfSearch = document.getElementById("resultsOfSearch");

    document.getElementById("startSearch").addEventListener("keyup" , (e)=>{
        if(e.target.value.length>=2){
            let dataUser = e.target.value.trim().toLowerCase();
            let dataFiltered=allStrongs.filter(data=>data.textContent.toLowerCase().trim().includes(dataUser));

            if(dataFiltered.length>0){
                resultsOfSearch.innerHTML='';
                resultsOfSearch.style.display='block';
                dataFiltered.forEach(element => {
                    let nodeCloned = element.parentNode.cloneNode(true);
                    resultsOfSearch.append(nodeCloned);
                });
            }else{
                resultsOfSearch.innerHTML='';
                resultsOfSearch.style.display='none';
            }
        }else{
            resultsOfSearch.innerHTML='';
            resultsOfSearch.style.display='none';
        }
    });
}