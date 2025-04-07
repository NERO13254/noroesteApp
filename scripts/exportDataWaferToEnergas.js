const dbRed             = require("../db/dbRed");
const db                = dbRed.getDb(__dirname);
const fs                = require("fs");
const path              = require("path");
const dataUser          = require("../functtions/exportDataWaferToEnergas/dataUser");
const dateCil           = require("../functtions/exportDataWaferToEnergas/dataCil");
const dataValve         = require("../functtions/exportDataWaferToEnergas/dataValve");
const dataReg           = require("../functtions/exportDataWaferToEnergas/dataReg");
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
    // obtiene todas las obleas que no fueron exportadas
    let wafersExportsPending    = await allAnswer(`SELECT * FROM waferdatasaved WHERE exportado = '0' `);
    // obtiene los datos del taller
    if(wafersExportsPending.length>0){
        // si encuentra datos para exportar crea un for de cada dato encontrado y crea los txts
        let dateNow         = new Date();
        let filePath        = "C:\\Users\\Usuario\\Desktop\\electron\\2\\waferTxt\\USR.txt";
        let cilPath         = "C:\\Users\\Usuario\\Desktop\\electron\\2\\waferTxt\\CIL.txt";
        let valvePath       = "C:\\Users\\Usuario\\Desktop\\electron\\2\\waferTxt\\VALCIL.txt";
        let regulatorPath   = "C:\\Users\\Usuario\\Desktop\\electron\\2\\waferTxt\\REG.txt";
        fs.writeFileSync(cilPath , "");
        fs.writeFileSync(filePath , "");
        fs.writeFileSync(valvePath , "");
        fs.writeFileSync(regulatorPath, "");
        let getDataWorkShopCode     = await allAnswer(`SELECT pec , cuit FROM tdm WHERE id = '${wafersExportsPending[0]["workShopCode"]}'`);
        let firstPart = `${getDataWorkShopCode[0]["pec"]};${getDataWorkShopCode[0]["cuit"]};codigoInternoDelTaller;numeroDeHabilitaciónDelTaller;`;
        
        // exporta a un txt los datos del usuario (USR) , cilindro (CIL)
        for (let i = 0; i < wafersExportsPending.length; i++) {
            let element = wafersExportsPending[i]
            let firstFiveDataTxt      =`${firstPart}${element["domainCar"]};${element["typeVehicle"]};`;
            await dataUser.dataUser(element , dateNow , filePath , firstPart);
            await dateCil.dateCil(firstFiveDataTxt , element , cilPath);
            await dataValve.dataValve(firstFiveDataTxt , element, valvePath);
            await dataReg.dataReg(firstFiveDataTxt , element, regulatorPath);
            // acctualiza las filas de db para cambiar la exportación a 1 (ya exportado)
            await runAnswer(`UPDATE waferdatasaved SET exportado='1'WHERE id = '${element["id"]}'`);
        }
        
        window.close();
    }else{
        // si no hay datos para exportar da el aviso con una alerta y cierra la ventana
        alert("No hay Datos para Exportar");
        window.close();
    }
}


