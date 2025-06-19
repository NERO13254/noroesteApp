function insertDni( getDataSaved ,  conditional){

    if(conditional == "insert"){
        db.all("SELECT idcevigas FROM clients WHERE 1 ORDER BY id DESC LIMIT 1" , (err , row)=>{
            if(err){
                console.log(err.message);
            }else{
                let newCevigasNum = parseInt(row[0]["idcevigas"]) + 1;
                db.run("INSERT INTO clients (dni ,names,country ,location , cp , domain , idcevigas,direccion)VALUES(?,?,?,?,?,?,?,?)",
                 [
                    getDataSaved.dni,
                    getDataSaved.nameAndSurname,
                    getDataSaved.provincia,
                    getDataSaved.country,
                    getDataSaved.cp,
                    getDataSaved.domain,
                    newCevigasNum,
                    getDataSaved.direcion
                 ] , (err)=>{
                    if(err){
                        console.log(err.message);
                    }else{
                        localStorage.setItem("dataUser" , JSON.stringify(getDataSaved));
                        ipcRenderer.send("submiBtnForCilUser");
                        window.close();
                    }
                 });
            }
        }); 
    }else if(conditional=="update"){ 
        let contentFirstDni = dni.value;


        if(localStorage.getItem("firstDni")){
            contentFirstDni=localStorage.getItem("firstDni")
        }

        db.run("UPDATE clients SET  dni=? , names=?  , country=? ,  location=? , cp=?,domain=? , direccion=? WHERE dni =?"  , [
            dni.value,
            nameAndSurname.value,
            provincia.value,
            country.value,
            cp.value,
            domain.value,
            direcion.value,
            contentFirstDni
        ] , (err)=>{
            if(err){
                console.log(err.message);
            }else{
                localStorage.setItem("dataUser" , JSON.stringify(getDataSaved));
                ipcRenderer.send("submiBtnForCilUser");
                window.close();
            }
        })
    }

}
module.exports = {
    insertDni
}