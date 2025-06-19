
async function saveWaferProcess(countCils){
    localStorage.removeItem("addNewCilinderToActuallyWafer");
    // obtiene los inputs y los valores de los inputs  para almacenarlos en una cadenta tipo texto
    let inputInfoContainer  = "";
    let getKeys = "";

    // al contador lo multiplica por 8 que son los lugares que ocupan los datos de los cilindros en db y suma 24
    // para que coincida el numero de tabla de db con el contador
    let numberCount = countCils*8 + 24;

    // obtener los datos del cliente 
    let getInputUsersContainer  = document.getElementById("inputsCollecteds");
    let getInputsUsers          = getInputUsersContainer.querySelectorAll("#dataUserSaved");

    function collectInputs(div , inputName){
        if(div == "cilinderInputContent"){
            let  getAllCils = document.querySelectorAll(".cilinderInputContent");
            for (let i = 0; i < getAllCils.length; i++) {
                const element = getAllCils[i];
                let getDivs = element.querySelectorAll("#inputData");
                for (let i = 0; i < getDivs.length; i++) {
                    let divElement = getDivs[i];
                    getKeys+= divElement.name+",";
                    inputInfoContainer+=`'${divElement.value}',` ;
                }
            }
        }
        else{
            let getAllInputs = div.querySelectorAll(inputName);
            getAllInputs.forEach(element => {
                getKeys+= element.name+",";
                inputInfoContainer+=`'${element.value}',` ;
                if(element.name == "omologation"){
                    numberCount++
                }
            });
        }
    }
    // obtiene los datos de los campos inputs y los inserta en el string getKeys y inputInfoContainer
    collectInputs("cilinderInputContent", "#inputData");
    collectInputs(document.getElementsByClassName("inputsDataVehicleContent")[0] , "#inputData");
    collectInputs(document.getElementById("regulatorInputsContent") , "#inputData");
    collectInputs(document.getElementsByClassName("newAndOldWaferContent")[0] , "#inputData");
    collectInputs(document.getElementsByClassName("valveInputContent")[0] , "#inputData");
    // inserta las keys de los datos del cliente de manera manual D:
    getKeys =getKeys + "location , cpUser,domicilio , typeDniData , dni ,domainCar,nameAndSuname,province,";
    getInputsUsers.forEach(element => {
        inputInfoContainer+= `'${element.value}',`;
    });
    // obtiene los datos de los campos chekeados
    function getChekedInputs (nameToInputs){
        let contentInputsCheckbox   = document.getElementById(nameToInputs);
        let getInputChecked         = contentInputsCheckbox.querySelector("input[type='radio']:checked");
        getKeys+=getInputChecked.name +",";
        inputInfoContainer+= `'${getInputChecked.value}',`;
    }   
    getChekedInputs("contentInputs");
    getChekedInputs("inyeccionContainer");
    // corrobora cuantos campos de cilindros hay y por cada uno hace un for para recorrerlos a todos y obtener 
    //el checkbox de caada cilindro
    for (let i = 0; i <= countCils; i++) {
        console.log(i);
        let contentInputsCheckbox   = document.getElementById("newOrOldCilContent"+i);
        console.log(contentInputsCheckbox);
        getChekedInputs("newOrOldCilContent"+i);
    }
    let newDate = new Date();
    let dateNow = `${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()}`;
    console.log(`INSERT INTO waferdatasaved (firstDateClient,workShopCode, ${getKeys.slice(0,-1)})VALUES('${dateNow}','${localStorage.getItem("idWorkShop")}',${inputInfoContainer.slice(0,-1)})`)

    await runAnswer(`INSERT INTO waferdatasaved (firstDateClient,workShopCode, ${getKeys.slice(0,-1)})VALUES('${dateNow}','${localStorage.getItem("idWorkShop")}',${inputInfoContainer.slice(0,-1)})`);
        
    return new Promise((resolve, reject) => {
        resolve();
    })    
}
module.exports = {
    saveWaferProcess
}