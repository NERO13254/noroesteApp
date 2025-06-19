const getDb             = require("../db/dbRed");
const db                = getDb.getDb(__dirname);
const {ipcRenderer}     = require("electron");
const getDataFromSotrage= JSON.parse(localStorage.getItem("modifyCtaCteData"));
const name              = document.getElementById("name");
const cuit              = document.getElementById("cuitUser");
const iva               = document.getElementById("iva");
const phValue           = document.getElementById("phValue");
const quitModifyCtaCte  = document.getElementById("quitModifyCtaCteData");
const saveModifyCtaCte  = document.getElementById("saveModifyCtaCteData");
const alertContent      = document.getElementById("alertContent");
const inputContainers   = document.getElementById("inputContainers");
name.value              = getDataFromSotrage[1]["name"];
phValue.value           = getDataFromSotrage[0]["phValue"];

async function allAnswer(answer){
    return new Promise((resolve, reject) => {
        db.all(answer , (err , row)=>{
            if(err){
                console.log(err.message);
            }else{
                resolve(row);
            }
        });
    })
}
async function runAnswer(answer){
    return new Promise((resolve, reject) => {
        db.run(answer , (err)=>{
            if(err){
                console.log(err.message);
            }else{
                resolve();
            }
        });
    })
}

window.onload = async()=>{
    // obtiene los valores de las obleas y inserta los inputs en el html
    const answer = `SELECT conversion , modificacion , revanual , desmontaje, baja FROM cuentascorrientes WHERE  id='${getDataFromSotrage[2]["id"]}' `;
    const getValues = await allAnswer(answer);
    for (let i = 0; i < Object.keys(getValues[0]).length; i++) {
        const keys  = Object.keys(getValues[0]);

        // corrobora que values no sea null , en caso de serlo se le agrega 0
        values = getValues[0][`${keys[i]}`];
        
        let div = document.createElement("div");
        div.className = 'inputContent';
        div.innerHTML = `
        <label for='${keys[i]}'>${keys[i]}</label>
        <input type='number' name='${keys[i]}' class='valueContent' value='${values}'>
        `;
        inputContainers.append(div)
    }
}

// INSERTA LOSDATOS EN EL INPUT APENAS INICIA LA VENTANA
db.all("SELECT cuit , iva FROM cuentascorrientes WHERE id= ?" , [getDataFromSotrage[2]["id"]] , (err , row)=>{
    if(err){
        console.log(err.message);
    }else{
        cuit.value  = row[0]["cuit"];
        iva.value   = row[0]["iva"];
    }
});

// BOTON PARA VOLVER ATRAS
quitModifyCtaCte.addEventListener("click" , ()=>{
    ipcRenderer.send("modifyCtaCte");
    window.close();
});
// CORROBORAR Y GUARDAR LOS DATOS 
saveModifyCtaCte.addEventListener("click" , async()=>{
    if(name.value.length == 0 || phValue.value.length==0){
        alertContent.innerHTML="";
        let runAlert = document.createElement("div");
        runAlert.className="alertContent";
        runAlert.innerHTML= `<strong>DATOS INCORRECTOS</strong>`;
        alertContent.append(runAlert);
    }else{
        let getAnswerValues='';
        // obtiene todos los campos con la misma clase
        let getValue = document.querySelectorAll(".valueContent");
        // bucle for que recorre todos los datos , crea un string y lo actualiza
        for (let i = 0; i < getValue.length; i++) {
            let keysValues = getValue[i].name;
            let printVals  = getValue[i].value; 
            getAnswerValues += `${keysValues} = '${printVals}',`; 
        }
        // arma la consulta y la lanza
        let answerContent = `UPDATE cuentascorrientes SET ${getAnswerValues.slice(0, -1)} WHERE id ='${getDataFromSotrage[2]["id"]}'`;
        await runAnswer(answerContent);
        return

        alertContent.innerHTML="";
        db.run("UPDATE cuentascorrientes SET name=?, cuit=? , iva=? , valorph=? WHERE id = ?" , 
        [name.value ,cuit.value,iva.value,phValue.value , getDataFromSotrage[2]["id"] ] , (err , row)=>{
            if(err){
                console.log(err.message);
            }else{
                ipcRenderer.send("modifyCtaCte");
                window.close();
            }
        }
        );
    }
});
