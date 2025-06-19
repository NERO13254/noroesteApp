async function loadDynamicCilWaferPh (countCils , typeCilData){
    if(countCils == undefined){
        countCils = 0;
    }
    const cilindersContainers   = document.getElementById("cilindersContainers");
    const cilinderData          = document.getElementById("cilinderData");
    var getData               = "";
    // corrobora si es el primer cilindro o uno añadido
    if(typeCilData != "normalCil"){
    if(!localStorage.getItem("addNewCilinderToActuallyWafer")){
        let cilinderData = localStorage.getItem("cilinderInfo").split(",");
        getData =await allAnswer(`SELECT omologation , serialnumber, datefab ,volmedido,taramedido,lastcrpc FROM cilindersaved WHERE omologation='${cilinderData[0]}' AND serialnumber='${cilinderData[1]}'`);
    }else{
        let cilinderData = localStorage.getItem("addNewCilinderToActuallyWafer").split(",");
        getData =await allAnswer(`SELECT omologation , serialnumber, datefab , lastcrpc FROM cilindersaved WHERE omologation='${cilinderData[1]}' AND serialnumber='${cilinderData[0]}'`);
    }
    }
    console.log(getData)

    let getDateFab              = getData[0]["datefab"].split("/");
    let lastCrpc                = getData[0]["lastcrpc"].split("/");

    // crea el div de cilindros y lo inserta en el html
    let div = document.createElement("div");
    div.id = 'cilinderContentData'
    div.innerHTML = `
    <div class="cilinderInputContent">
        <div id='cilinderDataContent'>
            <div class="inputsContainer">
                <input type="text" name="codeCil${countCils}" id="inputData" value ='${getData[0]["omologation"]}'>
            </div>
            <div class="inputsContainer">
                <input type="text" name="serialCil${countCils}" id="inputData" value ='${getData[0]["serialnumber"]}'>
            </div>
        </div>
        <div class="inputsContainer" id="newOrOldCilContent${countCils}">
            <form>
                <div class="inputContentCheckBox">
                    <input type="radio" id="newOrOldCil0new" name="newOrOldCil${countCils}" value="1">
                </div>
                
                <div class="inputContentCheckBox">
                    <input type="radio" id="newOrOldCil0old" checked name="newOrOldCil${countCils}" value="0">
                </div>
            </form>
        </div>
        <div class="inputsContainer" id="dateContent">
            <input type="text" name="monthFabCil${countCils}" id="inputData" value = '${getDateFab[0]}'>
            <input type="text" name="yearFabCil${countCils}" id="inputData"  value = '${getDateFab[1]}'>
        </div>
        <div class="inputsContainer" id="dateContent">
            <input type="text" name="revisionMonth${countCils}" id="inputData" value ='${lastCrpc[0]}'>
            <input type="text" name="revisionYear${countCils}" id="inputData"  value ='${lastCrpc[1]}'>
        </div>
        <div class="inputsContainer" id="dateContent">
            <input type="text" name="masa${countCils}" id="inputData"  value ='${getData[0]["taramedido"]}'>
            <input type="text" name="vol${countCils}" id="inputData" value ='${getData[0]["volmedido"]}'>
        </div>
        <div class="inputsContainer" id="dateContent">
            <input type="text" name="monthQualification${countCils}" id="inputData" value =''>
            <input type="text" name="yearQualification${countCils}" id="inputData"  value =''>
        </div>
        <div class="inputsContainer">
            <input type="text" name="crpc${countCils}" id="inputData" value='NORO'>
        </div>
        <div class="inputsContainer">
            <input type="text" name="typeOperationCil${countCils}" id="inputData" value='M'>
        </div>
    </div>

    <div class="valveInputContent">
        <div class='valveInput'>
            <input type='text' name='codeValve${countCils}' id="inputData">
        </div>
        <div class='valveInput'>
            <input type='text' name='serialValve${countCils}' id="inputData">
        </div>
        <div class='valveInput'>
            <input type='text' name='typeOperationValve${countCils}' id="inputData">
        </div>
    </div>
    `
    cilindersContainers.append(div);

}

module.exports = {
    loadDynamicCilWaferPh
}