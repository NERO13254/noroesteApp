async function  addSerialController() {
    let div =  document.createElement("div");
    div.className="listContainer";
    div.id       = "listContainer";   
    div.innerHTML=`
    <div class="headerSerial">
        <div class="addIndividualSerial">

            <div class='inputsContainerControllers'>
                <div class='guideContent'>
                    <p>Codigo</p>
                    <p>Serie</p>
                    <button id="addRowControllers">+</button>
                </div>
                <div id='rowsOfInputsContent'>
                    <div class='containerRow'>
                        <input type="text" id="codeSerial" placeholder="J . . .">
                        <input type='text' id='numberSerial' placeholder='332050 . . .' >
                    </div>
                </div>
            </div>

            <div class='multipleController'>
                <label>Ingreso Correlativo</label>
                <div class="multipleInputs">
                    <input type='number' id='startMultiple' placeholder='0' >
                    <input type='number' id='endMultiple' placeholder='10' >
                    <button id='infoMultiple'>i</button>
                </div>
            </div>

            <button id='addSerials'>Añadir</button>
        </div>

    </div>

    <div class="allSerials" id="allSerials">

    </div>

    <div class="buttonController">
        <button id="cancelProcess">CERRAR</button>
    </div>`;
    serialWindowEmergentContent.innerHTML="";
    serialWindowEmergentContent.append(div);
}

module.exports = {
    addSerialController
}