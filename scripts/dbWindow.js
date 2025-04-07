const { ipcRenderer }   = require("electron");
const getDb             = require("../db/dbRed");
const db                = getDb.getDb(__dirname);
const setGuide          = require("../functtions/guide");
const runAlert          = require("../functtions/alertFun");
const {startSearchDb}     = require("../functtions/dbWinFunctions/startSearchdb");
const { getNamesOfTables, getDataOfTheTable, updateRegister } = require("../functtions/dbWinFunctions/answers");
const { reportStatus } = require("../functtions/reportStatus");

let tableContents = document.getElementById("tableContents");
let guideContent = document.getElementById("guideContent");
let limiterResultsInput =  document.getElementById("limiterResultsInput");
window.onload = async()=>{
    // almacena el nombre de la tabla sleccionada
    let nameTable = "";
    // carga las tablas existentes en db
    let getTables = await getNamesOfTables();
    let frTables = '';
    for (let i = 0; i < getTables.length; i++) {
        const element = getTables[i];
        if(element["name"]!="sqlite_sequence"){
            let div = document.createElement("div");
            div.className='dataTable';
            div.innerHTML = `
            <strong>${element["name"]}</strong>
            `;
            tableContents.append(div);
            frTables+= '150px ';
        }
        tableContents.style.gridTemplateColumns = frTables;
    }

    // al seleccinar una tabla de la lista carga los datos de esta 
    tableContents.addEventListener("click" , async(e)=>{
        if(e.target.tagName=="STRONG"){
            let fr = "";
            nameTable = e.target.textContent;
            // obtiene los ultimos 50 resultados de la tabla y la inserta en HTML
            let getData = await getDataOfTheTable(e.target.textContent , limiterResultsInput.value);
            guideContent.innerHTML = "";
            // obteine los nombres de las columnas , los recorre y los inserta en HTML
            for (let i = 0; i < Object.keys(getData[0]).length; i++) {
                const element = Object.keys(getData[0])[i];
                let newStr = e.target.parentNode.cloneNode(true);
                newStr.children[0].textContent = element;
                guideContent.append(newStr);
                fr+= "150px ";
            }
            guideContent.style.gridTemplateColumns=fr;
            
            document.getElementById("defaultResults").innerHTML = "";
            let getKeys = Object.keys(getData[0])
            let columnFr = "";
            // recorre todo el array de objetos
            getData.forEach((obj) => {
                let dataDiv = document.createElement("div");
                dataDiv.className = "dataContent";
                

                // recorre cada objeto individual en base a sus keys
                getKeys.forEach(data =>{
                    let input = document.createElement("input");
                    input.className = data;
                    input.value = obj[data];
                    dataDiv.append(input);
                    columnFr+='150px ';
                });
                document.getElementById("defaultResults").append(dataDiv);
                dataDiv.style.gridTemplateColumns=columnFr;
            });
            
        }
    });
    // al presionar enter sobre un input de la lista se procede a actualizar el registro
    document.getElementById("globalResults").addEventListener("keyup" , async(e)=>{
        if(e.key=="Enter" && e.target.tagName=="INPUT"){
            // obtiene todos los inputs , los recorre y almacena los valores en un string
            let dataContent = "";
            let getAllInputs = e.target.parentNode.querySelectorAll("input");
            getAllInputs.forEach(element=>{
                dataContent+= `${element.className}='${element.value}',`;
            });
            try {
                await updateRegister(dataContent.slice(0,-1) , nameTable , e.target.parentNode.children[0].value );
                reportStatus("Exito","Reistro actualizado correctamente" , "El registro se ha actualizado correctamente en la base de datos. ¡Los cambios se guardaron con éxito!" , 1 ,["Aceptar"] , ["canelProcess"] , document.getElementById("reportStatus"))

            } catch (error) {
                console.log(error);
                reportStatus("Aviso","Algo salió mal" , "hubo un error al intentar actualizar el registro , intente cerrar y abir la ventana nuevamente " , 1 ,["Aceptar"] , ["canelProcess"] , document.getElementById("reportStatus"))
            }
        }
    });

    // al buscar un elemento 
    document.getElementById("searchDataInDb").addEventListener("keyup" , (e)=>{
        let keyLength = nameTable=="cilindersaved" ? 4 : 2

        if(e.target.value.length>=keyLength){
            startSearchDb(e.target);
        }else{
            document.getElementById("searchedResults").innerHTML="";
        }
    });
}










// startSearch.addEventListener("click", async()=>{

    
//     // obtiene el valor de la db que se quiere buscar
//     let getDb = document.getElementById("dbSelecter").value;
//     // se crea la consulta dinamica de la base seleccionada
//     let answer = `SELECT * FROM ${getDb} WHERE 1 ORDER BY id DESC`;
//     // se obtienen los nombres de las columnas de la base seleccinada
//     let getNameTable = await getNamesOfTheTable(getDb);
//     // se alacenan los nombres de las columnas en en html
//     guideContent.innerHTML ="";
//     let fr = "";
//     for (let i = 0; i < getNameTable.length; i++) {
//         const element = getNameTable[i];
//         let str = document.createElement("strong");
//         str.textContent = element["name"];
//         guideContent.append(str);
//         fr+= " 1fr";
//     }
//     guideContent.style.gridTemplateColumns=fr;
 
    


//     // se ejecuta la consulta para obtener los datos en base a las clumnas obtenidas 
//     // db.all(answer , (er, row)=>{
//     //     if(er){
//     //         console.log(er.message);
//     //     }else{
//     //         // carga la guia de los datos
//     //         let toOb = [];
//     //         ceateMenu.forEach(e=>{
//     //             let newObj  ={name : e}
//     //             toOb.push(newObj);
//     //         });
//     //         setGuide.printGuide(toOb , searchContent , "append");
//     //         // recorre el array de clumnas 
//     //             ceateMenu.forEach(e => {
//     //                 let div = document.createElement("div");
//     //                 div.className = "";
//     //                 // recorre los datos de la base y los añade al html
//     //                 for (let i = 0; i < row.length; i++) {
//     //                     const element = row[i];
//     //                     let str = document.createElement("div");
//     //                     str .className="contentInfo";
//     //                     str.innerHTML=`
//     //                     <strong id="${row[i][ceateMenu[0]]+e}" ">${element[e]}</strong>
//     //                     `;
//     //                     div.append(str);
//     //                 }
//     //                 searchContent.append(div);
//     //             });
//     //             let fr = "";
//     //             for (let i = 0; i < ceateMenu.length; i++) {
//     //                 fr+= " 1fr";
//     //             }
//     //             searchContent.style.gridTemplateColumns= fr;
                
//     //         }
//     // });
// });

// al hacer click en la lista de datos
// searchContent.addEventListener("click" , (e)=>{
//     // obtiene el id y corrobora que sea un numero
//     let getData = e.target.id;
//     if(!isNaN(getData.charAt(0))){
//         let getDb = document.getElementById("dbSelecter").value;
//         openModify.innerHTML="";
//         let clearData = getData.match(/\d+/g);
//         // crea un div con los contenidos
//         let div = document.createElement("div");
//         div.className = "contentModifyInfo";
        
//         ceateMenu.forEach(e => {
//             console.log(clearData+e);
      
//             let getData = document.getElementById(clearData+e).textContent;
//             let div2    = document.createElement("div");
//             div2.innerHTML=`
//             <label for="M${clearData+e}">${e}</label>
//             <input type="text" id="M${clearData+e}" value="${getData}">
//             `;
//             div.append(div2);
//         });

    
//         let div3    = document.createElement("div");
//         div3.innerHTML=`
//             <button id="updateInfo">GUARDAR</button>
//         `;
//         div.append(div3);
//         openModify.append(div);

//         // alhace click en guardar
//         let updateInfo = document.getElementById("updateInfo");
//         updateInfo.addEventListener("click" , ()=>{
//             let toarr = [];
//             ceateMenu.forEach(e => {
//                 let getData = document.getElementById("M"+clearData+e).value;
//                 toarr.push(getData);
//             });
//             // obtiene los datos modificados 
  
//             let result = "";
//             // Combinar los elementos de ambos arrays
//             for (let i = 0; i < Math.min(ceateMenu.length, toarr.length); i++) {
//                 result += `${ceateMenu[i]} = "${toarr[i]}"`;
//                 // Si no es el último par de clave-valor, agregar una coma y espacio
//                 if (i < Math.min(ceateMenu.length, toarr.length) - 1) {
//                     result += ", ";
//                 }
//             }
            
//             let answer = `UPDATE ${getDb} SET ${result} WHERE ${ceateMenu[0]} = ${toarr[0]}` ;
            
//              db.run(answer , (err)=>{
//                 if(err){
//                     console.log(err.message);
//                 }else{
//                     runAlert.alertFun("SE ACTUALIZO" , fixedAlertContent);
//                     fixedAlertContent.style.background="green";
//                     fixedAlertContent.style.color="white";
//                 }
//             });
//         });
//     }
// });
