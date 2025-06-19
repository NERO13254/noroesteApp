const { chownSync } = require("fs");

function getProdsDb(){
    let saveData= [];

    db.all("SELECT id, insideid , name , brand ,finalvalue ,  buyvalue, existence , serial FROM products WHERE 1 ORDER BY name ASC" ,
    (err, row)=>{
        if(err){
            console.log(err.message);
        }else{
            if(row.length!=0){
                for (let i = 0; i < row.length; i++) {
                    const element = row[i];
                    let createObjectPrduct = {
                        id : element["id"],
                        insideid: element["insideid"],
                        name : element["name"],
                        brand : element["brand"],
                        finalvalue: element["finalvalue"],
                        buyValue: element["buyvalue"],
                        existence: element["existence"],
                        serial: element["serial"]
                    }
                    saveData.push(createObjectPrduct);
                }
                let filePath = "./PRODUCTOS.txt";
                fs.writeFileSync(filePath , "");
                fs.appendFileSync(filePath , JSON.stringify(saveData) , "utf-8");
            }
        }
    });
    var alert           = document.getElementById("alert");
    alert.innerHTML     = "";
    let alertCon        = document.createElement("div");
    alertCon.className  = "alertContent";
    alertCon.innerHTML  = `
    <strong>LISTA EXPORTADA</strong>
    `;
    alert.append(alertCon);
}
module.exports= {
    getProdsDb
}