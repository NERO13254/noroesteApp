async function dynamicCilinders(data){
    // hac un bucle or y añade el html de cada cilindro 
    let cilinderesContainer = document.getElementById("cilinderesContainer");
    cilinderesContainer.innerHTML = "";
    for (let i = 0; i < data; i++) {
        let div = document.createElement("div");
        div.className = "cilinderInputContent";
        div.innerHTML = `
            <div class="inputsContainer">
                <input type="text" name="codeCil${i}" id="inputData">
            </div>
            <div class="inputsContainer">
                <input type="text" name="serialCil${i}" id="inputData">
            </div>
            <div class="inputsContainer"  id='newOrOldCilContent${i}'>
                <div class='inputContentCheckBox'>
                    <input type='checkbox' id='newOrOldCil${i}new' name='newOrOldCil${i}' value='1'>
                </div>
                
                <div class='inputContentCheckBox'>
                    <input type='checkbox' id='newOrOldCil${i}old' name='newOrOldCil${i}' value='0'>
                </div>
            </div>
            <div class="inputsContainer" id='dateContent'>
                <input type="text" name="monthFabCil${i}" id="inputData">
                <input type="text" name="yearFabCil${i}"  id="inputData">
            </div>
            <div class="inputsContainer" id="dateContent">
                <input type="text" name="revisionMonth${i}" id="inputData">
                <input type="text" name="revisionYear${i}" id="inputData">
            </div>
            <div class="inputsContainer">
                <input type="text" name="crpc${i}" id="inputData">
            </div>
            <div class="inputsContainer">
                <input type="text" name="typeOperationCil${i}" id="inputData">
            </div>
        `;
        cilinderesContainer.append(div);
    }
    return new Promise((resolve, reject) => {
        resolve();
    })
}

module.exports = {
    dynamicCilinders
}