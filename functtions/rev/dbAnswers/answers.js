const { reportStatus } = require("../../reportStatus");
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
        db.all(answer , (err, data)=>{
            if(err){
                console.log(err.message);
            }else{
                resolve(data);
            }
        });
    })
}

const answersContainer ={
    // obtiene los cilindros no exportados
    getDataCilNoExported : async()=>{
        return new Promise((resolve, reject) => {
            let query  = `SELECT
            pec , workshopcode ,
            nameandsurname ,
            idtype ,dni, direccion ,
            country  , provincia , cp,
            domain, omologation,serialnumber,
            datefab ,status, material,taramedido, insideid, certificatenumber, capacity 
            FROM cilindersaved WHERE exportado = '0' AND finished='SI' ORDER BY certificatenumber DESC `;
            try {
                const result = db.all(query , (err,row)=>{
                    if(err){
                        reject(err.message);
                    }else{
                        resolve(row);
                    }
                })
            } catch (error) {
                console.log(error)
                reportStatus("Error" , "Fallo al obtener los datos", "Ocurrió un error inesperado al obtener los cilindros"  , 1 , ["Acepar"] , ["canelProcess"],document.getElementById("reportStatus"));
            }
        })
    },

    getCilindersExportedsOfTheDay  : async (getDay)=>{
        return new Promise((resolve, reject) => {
            let query = `SELECT 
            pec , workshopcode ,nameandsurname , idtype ,dni,
            direccion , country  , provincia , cp, domain,
            omologation,serialnumber, datefab ,status,
            material,taramedido, insideid, certificatenumber,
            capacity FROM cilindersaved
            WHERE chekeddate='${getDay}' AND finished='SI' ORDER BY certificatenumber DESC `;
            
            db.all(query , (err , row)=>{
                if(err){
                    reject(err.message);
                }else{
                    resolve(row);
                }
            });
        })
    },
    getDataOnlyCil: async (omologation , serialnumber)=>{
        try {
            return await allAnswer(`SELECT * FROM cilindersaved WHERE omologation='${omologation}' AND serialnumber ='${serialnumber}' `);
        } catch (error) {
            console.log(error.message);
        }
    },
    updateCilinderModified : async(dataToUpdate,getSerialNumberCont,getOmologation)=>{
        try {
           return await runAnswer(`UPDATE cilindersaved SET ${dataToUpdate} WHERE serialnumber='${getSerialNumberCont}' AND omologation='${getOmologation}' AND finished='SI' `);

        } catch (error) {
            return error.message;
        }
    },
    getDataTdm : async (data)=>{
        try {
            return await  allAnswer(`SELECT workshopcode, cuit FROM tdm where id = '${data}'`);
        } catch (error) {
            console.log(error.message);
        }
    },
    updateCilinderSaved : async(insideid,omologation,serialnumber)=>{
        try {
            return await runAnswer(`UPDATE cilindersaved SET exportado = 1 WHERE insideid='${insideid}' AND omologation='${omologation}' AND serialnumber='${serialnumber}' AND exportado = 0 AND finished='SI'`)
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = {
    answersContainer
}