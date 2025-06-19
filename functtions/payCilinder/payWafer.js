async function payWafer(e){
    let payWaferContent  = document.getElementById("payWaferContent");
    payWaferContent.innerHTML = '';
    // obtiene el id del cliente al que se le va a cobrar
    let getIdClient = e.target.className.slice(1);

    // obtiene los costos del cliente
    const getValues = await allAnswer(`SELECT conversion , modificacion , revanual , desmontaje , baja FROM cuentascorrientes WHERE id ='${getIdClient}'`);
    // crea el contenedor principal donde se van a ubicar los divs que contienen la info
    let div = document.createElement("div");
    div.className = "payTypeWafer";
    div.id = "payTypeWafer";
    div.innerHTML = `
    <div class='payTypeWaferContentInputs'>
        <div class='controllerContainer' id='controllerContainer'>
        
        </div>
    </div>
    `;
    payWaferContent.append(div);
    // una vez agregado el contenido al html crea los titulos y obtiene el div recien creado
    let getTitleProducts = ["Conversión", "Modificación" , "Revisión Anual" , "Desmontaje" , "Baja"];
    let controllerContainer = document.getElementById("controllerContainer");
    // recorre los resultaos de la db , crea divs y los inserta el el div recien creado
    for (let i = 0; i < Object.keys(getValues[0]).length; i++) {
        let getKeys = Object.keys(getValues[0])
        const element = getValues[0][`${getKeys[i]}`];
        let div = document.createElement("div");
        div.className = 'inputsContent';
        div.innerHTML = `
            <label for='${getKeys[i]}'>${getTitleProducts[i]}</label>
            <div class='inputValueOperationContent'>
                <label>$</label>
                <input type='number' class='valvueContentInput' value ='${element}'>
            </div>
            <div class='checkContainer'>
                <input type='checkbox' name='${getKeys[i]}' >
            </div>
        `;
        controllerContainer.append(div);
    }
    // crea el boton "cobrar" y lo añade al html
    let buttonContent = document.createElement("div");
    buttonContent.className="buttonContainer";
    buttonContent.innerHTML=`
        <button id="sendPayTypeOperation">Cobrar</button>
    `;
    controllerContainer.append(buttonContent);

    // una vez que se  presionó e boton guardar de la oblea se remueven los datos y se ciera ventana
    buttonContent.addEventListener("click" , async ()=>{
        // actualiza el dueño de la oblea en db
        await runAnswer(`UPDATE wafersdata SET paywafer='${e.target.className.slice(1)}' WHERE newOblea='${localStorage.getItem("newOblea")}'`);
        //cobra la oblea al cliente
        await payProcessWafer.payProcessWafer(e);
        localStorage.removeItem("newOblea");
        localStorage.removeItem("idWaferSaved");
        localStorage.removeItem("phAndOblea");
        localStorage.removeItem("exportWaferToEnergas");
        ipcRenderer.send("seeSavedCilinders");
        window.close();
    });
}

module.exports = {
    payWafer
}