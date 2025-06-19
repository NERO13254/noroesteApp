const { answers } = require("./answers");

async function saveOrUpdateClient() {
    var keys ='', values='' , generalData ='';

    // corrobora si existe o no el dni
    let dni = document.getElementById("dni").value.trim();
    let idClientDb = await answers.readLikeDni(dni);


    function updateOrInsert(data){


        // obtiene todos los datos del cliente
        let dataClient = document.querySelectorAll(".formCilinderDataUser .dataGeted");
        dataClient.forEach(element=>{
            let valsData = element.value.toUpperCase().trim();
            data ? (generalData+=`${element.id}='${valsData}',`) : (keys+=`${element.id},` , values+=`'${valsData}',`);
        });

        // obtiene los elementos select y los inserta
        let selects = document.querySelectorAll(".formCilinderDataUser select");
        selects.forEach(element=>{
            let valsData = element.options[element.selectedIndex].textContent.toUpperCase();
            data ? generalData+=`${element.id}='${valsData}',`: (keys+=`${element.id},` , values+=`'${valsData}',`);
        })
    }


    if(idClientDb.length<=0){
        console.log("inserta")
        // inserta
        updateOrInsert(false);
        await answers.createClient(keys.slice(0,-1) , values.toUpperCase().slice(0,-1));
    }
    else{
        console.log("actualiza")
        // acttualiza
        updateOrInsert(true);
        console.log(generalData)
        await answers.updateClinet(generalData.toUpperCase().slice(0,-1) , idClientDb[0]["id"]);
    }
}

module.exports = {
    saveOrUpdateClient
}