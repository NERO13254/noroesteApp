async function updateCilinderSavedWafer(){
    // obtiene los contenedores de los cilindros
    let getInpustContainer  = document.querySelectorAll("#cilinderDataContent");
    let getValuesArrayObj = [];
    // recorre los contenedores
    for (let i = 0; i < getInpustContainer.length; i++) {
        // accede a los inputs de cada uno
        const element = getInpustContainer[i];
        let getInputs = element.querySelectorAll("#inputData");
        // por cada input que encuentre obtiene su valor y lo almacena en un array
        let valuesContent = [];
        for (let i = 0; i < getInputs.length; i++) {
            const inputsElements = getInputs[i];
            valuesContent.push(`${inputsElements.value}`);
        }
        // almacena el array que se creó y lo inserta en otro array (hace el proceso por cada cilindro encontrado)
        getValuesArrayObj.push(valuesContent);
    }
    // recorre el array y accede a cada dato , para obtener los valores de cada uno y actualiza e cilindro en db
    for (let i = 0; i < getValuesArrayObj.length; i++) {
        const element = getValuesArrayObj[i];
        await runAnswer(`UPDATE cilindersaved SET wafer ='${document.getElementsByName("newOblea")[0].value}' WHERE omologation='${element[0]}' AND serialnumber='${element[1]}'` );
        console.log(element[0] , element[1]);
    }

    return new Promise((resolve, reject) => {
        resolve();
    })
}

module.exports= {
    updateCilinderSavedWafer
}