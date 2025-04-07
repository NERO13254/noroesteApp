const {ipcRenderer}     = require("electron");
const dbRed             = require("../db/dbRed");
const db                = dbRed.getDb(__dirname);
const name              = document.getElementById("name");
const percentAmmount    = document.getElementById("percentAmmount");
const saveChanges       = document.getElementById("saveChanges");
const reportStatus      = require("../functtions/reportStatus");
const backBtnButton     = document.getElementById("backBtn");
const backBtn           = require("../functtions/backBtn");

const alertContent      = document.getElementById("alertContent");

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

async function allAnswer(answer){
    return new Promise((resolve, reject) => {
        db.all(answer , (err, row)=>{
            if(err){
                console.log(err.message);
            }else{
                resolve(row);
            }
        });
   })
}

window.onload = async()=>{
    let getDataUser = `SELECT name , ammountpercent FROM finalconsumer WHERE 1`
    const getDataAnswer = await allAnswer(getDataUser);
    name.value = getDataAnswer[0]["name"];
    percentAmmount.value = getDataAnswer[0]["ammountpercent"];
}

backBtn.backBtn(backBtnButton , "endConsumer");

// al darle click en guardar corrobora si estan todos los campos llenos sino despliega la alerta
saveChanges.addEventListener("click" , ()=>{
    let percentAmmount    = document.getElementById("percentAmmount").value;

    // si los datos son incorrectos despliega la alerta
    if(percentAmmount == "" || name.value == "" || isNaN(percentAmmount)){
        reportStatus.reportStatus("Valores Invalidos" , "VALOR INGRESADO INVALIDO", "alguno de los dos valores ingresados en los campos está vacío , procure rellenar todos los campos" , 1 , ["Aceptar"] , ["canelProcess"] , alertContent);
    }else{
        // si está todo en orden le pregunta al usuario si quiere continuar 
        reportStatus.reportStatus("Aviso de modificación" , "Verificación de Cambio en la Base de Datos", "¿Desea continuar con la actualización de este registro en la base de datos? Asegúrese de que todos los detalles sean correctos antes de proceder" , 2 , ["Cancelar","Aceptar"] , ["canelProcess" , "runProcess"] , alertContent);
        // al presionar Aceptar se modifica el dato de la db
        let runProcess = document.getElementById("runProcess");
        runProcess.addEventListener("click" , async()=>{
            alertContent.childNodes[0].style.display="none";
            // actualiza todas las tablas con el nuevo valor (como es solo una tabla no importa no especificar que fila)
            let updateClientAnswer = `UPDATE finalconsumer SET name='${name.value}' , ammountpercent='${percentAmmount}' WHERE 1`;
            await runAnswer(updateClientAnswer);
            ipcRenderer.send("endConsumer");
            window.close();
        });
    }
});
