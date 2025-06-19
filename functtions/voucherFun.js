const { ipcRenderer } = require("electron");
const  printGuidefun  = require("../functtions/guide");
function saveInSoldMerch(voucher , insideid , value , ammount ,serial){
    let searchInput = document.getElementById(voucher).textContent;

    db.run("INSERT INTO merchsold (vouchernum , insideid , value , ammount ,serialnumber )VALUES(?,?,?,?,?)",
        [
            searchInput , 
            insideid    , 
            value       ,
            ammount     ,
            serial  
        ],(err)=>{
            if(err){
                console.log(err.message);
            }else{
                console.log("se subi");
            }
        }
    );
}


// CACULA EL VALOR TOTAL DE LOS PRODUCTOS
var finalValue = 0;
var arrNums = [];
function calcTotalVals(data){
    // OBTIENE EL CONTENEDOR Y CUANTOS HIJOS TIENE
    var listProdContent = document.getElementById("listProdContent");
    let countList       = listProdContent.children.length;
    // BUCLE FOR PARA RECORRER TODOS LOS HIJOS (div) Y A SU VEZ ACCEDE A LOS HIJOS DE CADA UN O PARA OBTENER LOS VALORES
    for (let i = 0; i < countList; i++) {
        const element = listProdContent.children[i];
        let valueProd = element.children[2].textContent;            //VALUE
        let ammounProd= element.children[3].value;                  //AMOUNT
        if(ammounProd == undefined || isNaN(ammounProd) || ammounProd == ""){
            ammounProd = 1;
        }
        data+= valueProd*ammounProd;
        console.log(valueProd , ammounProd , data);
    }
    return data;
}
// AÑADE LOS PRDUCTOS A LA LISTA HTML Y LAS SERIES SE BORRAN A MEDIDA QUE SE USAN
let total = 0;

// ENVIA LOS DATOS DEL REMITO PARA SER ALMACENADOS
function saveVoucher(){
    let discount        = document.getElementById("discount");
    let date            = document.getElementById("date").textContent;
    let searchInput     = document.getElementById("searchInput").textContent;
    let listProdContent = document.getElementById("listProdContent");
    let Finv = calcTotalVals(finalValue);
    let totalVal = Finv;
    
   
    let num = 0;
    let arrOb = [];
    for (let i = 0; i < listProdContent.children.length; i++) {
        
        const element = listProdContent.children[i];

        num = num + parseInt(element.children[2].textContent * element.children[3].value);

        

        let insideid    = "";
        let nameProd    = "";
        let valueProd   = "";
        let ammounProd  = "";
        // CORROBORA  SI ES UN PRODUCTO INDEPENDIENTE (MANOMETRO)
        if(element.children[0].textContent.charAt(0)=="P"){
    
            insideid    = element.children[0].textContent.slice(2),
            nameProd    = element.children[1].textContent,
            valueProd   = element.children[2].textContent,
            ammounProd  = element.children[3].value
            
            console.log(ammounProd);
            console.log("Eprod");
        
            // ACTUALIZA LAS EXISTENCIAS DEL PRODUCTO
            db.all("SELECT existence FROM products WHERE insideid = ?", [element.children[0].textContent.slice(2)] , (err, row)=>{
                if(err){
                   console.log(err.message);
                }else{

                    let existences = (parseInt(row[0]["existence"] -  element.children[3].value ));
                    console.log(existences);
                    db.run("UPDATE products SET existence = ? WHERE insideid = ?" , [existences,element.children[0].textContent],
                    (err)=>{
                        if(err){
                            console.log(err.message);
                        }else{
                            saveInSoldMerch("searchInput" , insideid , valueProd , ammounProd ,"NE");
                        }
                    }
                    );
                }
            });
        }
        //CORROBORA SI ES UN KIT
        else if(element.children[0].textContent.charAt(0)=="K"){
            insideid    = element.children[3].id.slice(4);
            nameProd    = element.children[0].textContent.slice(2);
            valueProd   = element.children[2].textContent;
            ammounProd  = "1";
            saveInSoldMerch("searchInput" , insideid , valueProd , 1 ,"KIT");
            // SELECCIONA EL CONTENIDOO DEL KIT , L CONVIERTE EN JSON , ELIMINA LOS PRODUCTOS DE LA LISTA SEGUN EL CONTENIDO DEL KIT
            db.all("SELECT content FROM kit WHERE name = ? " , [element.children[0].textContent.slice(2)] , (err ,row)=>{
                if(err){
                    console.log(err.message);
                }else{
                    let getOb = JSON.parse(row[0]["content"]);
                    
                    for (let i = 0; i < Object.keys(getOb).length; i++) {
                        const element = getOb[i];
                        
                        db.all("SELECT existence FROM products WHERE insideid= ? " , [element["id"]] , (err , row)=>{
                            if(err){
                                console.log(err.message);
                            }else{
                                let getExistence = parseInt(row[0]["existence"]);
                                let newExistence = getExistence - parseInt(element["ammount"]);

                                db.run("UPDATE products SET existence = ? WHERE insideid = ? ", [newExistence , element["id"]] , (err)=>{
                                    if(err){
                                        console.log(err.message);
                                    }else{
                                       
                                    }
                                });
                            }
                        });
                    }
                }
            });
        }
        //COROBORA SI ES UNA SERIE
        else{ 

            console.log("ESERIE");
            insideid    = element.children[0].textContent.slice(2);
            nameProd    = element.children[1].textContent;
            valueProd   = element.children[2].textContent;
            ammounProd  = "|"+element.children[4].textContent;
         
            db.run("DELETE FROM serials WHERE id= ?"  , [ element.children[0].id] , (err)=>{
                 if(err){
                    console.log(err.message);
                }else{
                    saveInSoldMerch("searchInput" , insideid , valueProd , 1 ,ammounProd.slice(1));
                }
            });
        }
        let newObjet = {
            insideid    : insideid,
            nameProd    : nameProd,
            valueProd   : valueProd,
            ammounProd  : ammounProd,
            totalvalue  : totalVal
        }
        arrOb.push(newObjet);
    
    }

    if(idWorkShop){
        console.log("corro")
        let newDate = new Date();
        let completeDate = `${newDate.getHours()}:${newDate.getMinutes()}   ${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}`;
        let idCtaCte = localStorage.getItem("idCtaCte");
        console.log(arrOb);
        // inserta los datos del pedido en remitos
        db.run("INSERT INTO remitos ( insideid , content , owner , discount , date ) VALUES(?,?,?,?,?)" ,
        [
            searchInput,
            JSON.stringify(arrOb) ,
            idCtaCte,
            discount.value,
            completeDate
        ], (err)=>{
            if(err){
                console.log(err.message);
            }else{

            }
        });
        
        db.all("SELECT ordernum FROM payordebit WHERE 1 ORDER BY id DESC LIMIT 1 ", (err, rows)=>{
            if(err){
                console.log(err.message)
            }else{
                let finalNumber = 0;
                if(rows.length ==0){
                    
                }else{
                    finalNumber = rows[0]["ordernum"]+1;
                }
                
                let newDate = new Date();
                let onlyOldTotalNum=0;
                let completeDate = `${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}`;

                db.all("SELECT total FROM payordebit WHERE owner=? ORDER BY id DESC LIMIT 1" , [idWorkShop],(err , row)=>{
                    if(err){
                        console.log(err.message);
                    }else{
                if(row.length==0){
                endNumber = 0 ;
                }else{
                    let calcPercentTotal = totalVal - totalVal * discount.value / 100
                    endNumber= parseInt(row[0]["total"]) + calcPercentTotal;
                    onlyOldTotalNum = parseInt(row[0]["total"]);
                }
                var finalValue = 0;
                var debit      = 0;
                var pay        = 0;
                // corrobora que e valor total de el remito sea positivo o negativo
                if(totalVal < 0 ){
                    // si el valor total es negativo y el valor final anterior es positivo (-5.000 , -35.000)
                    if(onlyOldTotalNum>0){
                        finalValue = onlyOldTotalNum - Math.abs(totalVal);
                    }else{
                        finalValue = Math.abs(onlyOldTotalNum + totalVal);
                    }
                    debit = totalVal;
                }else{

                    let getTotalCount = totalVal - totalVal * discount.value / 100
                    pay = Math.round(getTotalCount);
                }

                console.log(debit, pay , endNumber);

                // corrobora si es un remito negativo y ajusta los valores de pay y debit coherentemente
                if(debit<0) {
                    pay = 0 ;
                    
                    console.log ( pay , debit)
                }


                // INSERTA LOS DATOS EN LA BASE DE DEBIOS Y PAGOS
                db.run("INSERT INTO payordebit (date , obs , debit , pay , total , owner , ordernum )VALUES(?,?,?,?,?,?,?)",
                        [
                            completeDate,
                            "RMTO "+ searchInput,
                            debit,
                            pay,
                            endNumber,
                            idWorkShop,
                            finalNumber
                        ] ,(err)=>{
                            if(err){
                                console.log(err.message);
                            }else{
                                ipcRenderer.send("printVoucher");
                                window.close();
                            }
                        }
                );
                }
                })
            }
        });
    }else{
        console.log(arrOb);
    }
}
module.exports= {
    saveVoucher
}