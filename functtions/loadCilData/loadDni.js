async function loadDni(){

    return new Promise((resolve, reject) => {
        let getDataUser = JSON.parse(localStorage.getItem("getDataUser"));
        console.log(getDataUser);
        let answer = ""
        let status = "";
    
        if(getDataUser["existences"] == 0){
            db.all("SELECT idcevigas FROM clients WHERE 1 ORDER BY id DESC LIMIT 1", (err ,row)=>{
                if(err){
                    console.log(err.message);
                }else{
                    let getIdCevigas=0;
                    if(isNaN(row[0]["idcevigas"])){
                        getIdCevigas = 10261;
                    }else{
                        getIdCevigas = row[0]["idcevigas"] +1;
                    }
                    db.run("INSERT INTO clients (dni , names , country , location , cp , domain , direccion , idcevigas) VALUES(?,?,?,?,?,?,?,?)",
                    [
                        getDataUser["dni"],
                        getDataUser["nameAndSurname"],
                        getDataUser["provincia"],
                        getDataUser["country"],
                        getDataUser["cp"],
                        getDataUser["domain"],
                        getDataUser["direcion"],
                        getIdCevigas
                    ] , (err )=>{
                        if(err){
                            console.log(err.message);
                        }else{
                            console.log("el dni primero");
                            resolve();
                        }
                    }
                    );
                }
            });
        }
        else{
            db.run("UPDATE clients SET dni=? , names=?  , country=?  , location=?  , cp=?  , domain=?  , direccion=? WHERE dni = ?",
                [getDataUser["dni"],
                getDataUser["nameAndSurname"],
                getDataUser["provincia"],
                getDataUser["country"],
                getDataUser["cp"],
                getDataUser["domain"],
                getDataUser["direcion"],
                getDataUser["dni"]], (err)=>{
                    if(err){
                        console.log(err.message);
                    }else{
                        resolve();
                    }
                }
            );
        }
    })
}
module.exports={
    loadDni
}