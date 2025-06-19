async function calculatePercent(){
    
    let newDate = new Date();
    let nextMonth = new Date( newDate.getFullYear(), newDate.getMonth()+1, 0);
    nextMonth=  nextMonth.getDate();

    let getDay = newDate.getDay();
    let getDateSaved = await allAnswer("SELECT * FROM dayliPercent WHERE 1");
    let dateNow = `${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}`;

    // si es lunes guarda todos los valores de deuda y actualiza el porcentaje diario
    if(getDay == 5){
        // genera el porcentaje mensual 
        let generatePercent = ((1+5/100)**(1/nextMonth))-1;
        generatePercent = parseFloat(generatePercent.toFixed(5));
        // obtiene las cuentas corrientes y las recorre
        await db.serialize(async()=>{
            db.run("BEGIN TRANSACTION");
            let getCtaCtesId = await allAnswer("SELECT id FROM cuentascorrientes WHERE 1 ");
            for (let i = 0; i < getCtaCtesId.length; i++) {
                //  obtiene el total de cada cuenta corriente
                const element = getCtaCtesId[i]["id"];
                let totalCtaCte = await allAnswer(`SELECT total FROM payordebit WHERE id='${element}' ORDER BY id DESC LIMIT 1`);
                let totalContainer = (totalCtaCte.length>0 && totalCtaCte[0]["total"]) ? totalCtaCte[0]["total"]: 0;
                db.run(`UPDATE dayliPercent SET date='${dateNow}',total='${totalContainer}', percent='${String(generatePercent)}' WHERE owner='${element}' `, function (err) {
                    // si hay un error
                    if(err){
                        console.log(err.message);
                    }else{
                        // si no hay cambios ejecuta un insert
                        if(this.changes===0){
                            runAnswer(`INSERT INTO dayliPercent (date,owner,total, percent)VALUES('${dateNow}','${element}','${totalContainer}', '${String(generatePercent)}')`);
                        }
                    }
                });
            }
            db.run("COMMIT");
        });
    }
    
    if(getDay==1){
        if(getDateSaved[0]["date"] != dateNow ){
            db.serialize(async()=>{
                db.run("BEGIN TRANSACTION");
                for (let i = 0; i < getDateSaved.length; i++) {
                    const element = getDateSaved[i];            
                    let getData = await allAnswer(`SELECT total FROM payordebit WHERE owner ='${element["owner"]}' ORDER BY id DESC LIMIT 1`);
                    let total = getData.length>0? parseInt(getData[0]["total"]) : 0
                    let percent= parseFloat(element["percent"]) * 7;
                    let increase = Math.round(total * percent)
                    let finalTotal =  Math.round(total+ increase );
                    let pay = finalTotal>0 ?  increase : 0;
                    let debit = finalTotal>0 ? 0 : Math.abs(increase);
                    // obtiene el numero de orden
                    let orderNum = await allAnswer(`SELECT ordernum FROM payordebit WHERE 1 order by id DESC LIMIT 1 `);
                    orderNum = orderNum.length>0 ? orderNum[0]["ordernum"]+1 : 1;
                    await runAnswer(`INSERT INTO payordebit (date,obs,debit,pay,total,owner,ordernum)VALUES('${dateNow}', 'AUMENTO PORCENTUAL SEMANAL' ,'${debit}','${pay}','${finalTotal}','${element["owner"]}', '${orderNum}')`)
                }
                await runAnswer(`UPDATE dayliPercent SET date = '${dateNow}' `);
                db.run("COMMIT");
            })
        }
    }
}

module.exports = {
    calculatePercent
}