function saveDni(getValDni){
    // obtiene los datos del dni y busca si existe o no ese dni
    db.all("SELECT * FROM clients WHERE dni = ?" , [getValDni] , (err , row)=>{
        if(err){
            console.log(err.message);
        }else{
            // corrobora si existen o no registros con ese dni
            getData= row[0];
            if(row.length == 0){
                existence = "0";
                nameAndSurname.value    = null;
                country.value           = null;
                cp.value                = null;
                direcion.value          = null;
                domain.value            = null;
                // recoge los datos del usuario y los guarda en el localStorage
                getDataUser(existence);
            }
            else{
                console.log("hay dat");
                existence = "1";
                dni.value               = getData.dni;
                nameAndSurname.value    = getData.names;
                country.value           = getData.location;
                country.textContent     = getData.country;
                cp.value                = getData.cp;
                direcion.value          = getData.direccion;
                domain.value            = getData.domain;
                console.log(existence);
                // recoge los datos del usuario y los guarda en el localStorage
                getDataUser(existence);
            }
        }
    });
    // hace focus en el siguiente campo ( nombre y apellido)
    localStorage.setItem("firstDni" , dni.value);
    nameAndSurname.focus();
}
module.exports = {
    saveDni
}