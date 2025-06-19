function dynamicInputRegulator (){

    let div = document.createElement("div");
    div.className = 'regulatorData';
    div.innerHTML =`
        <div class="regulatorData">
        <!-- fecha de montaje -->
        <div class="dateReg">
            <label for="" class="labelContent">Fecha Montaje</label>
            <input type="text" name="regulatorSerial2" id="inputData">
        </div>
        <!-- codigo de regulador nuevo -->
        <div class="dateReg">
            <label for="" class="labelContent">Codigo Regulador</label>
            <input type="text" name="regulatorCode2" id="inputData">
        </div>
        <!-- numero serie regulador -->
        <div class="dateReg">
            <label for="" class="labelContent">N°Serie</label>
            <input type="text" name="serialNumberRegulator2" id="inputData">
        </div>
        <!-- tipo de operacion para el regulador -->
        <div class="dateReg">
            <label for="operationTypeReg" class="labelContent">Tipo de Operación</label>
            <input type="text" name="operationTypeRegulator2" id="inputData">
        </div>
        <!-- nuevo o usado -->
        <div class="dateReg">
            <label for="operationTypeReg" class="labelContent">Nuevo/Usado</label>
            <select name="newOrUsedRegulator" id="inputData">
                <option value="new2" selected>Nuevo</option>
                <option value="used2">Usado</option>
            </select>
        </div>                 
    </div>
    `;
    regulatorInputDynamic.append(div); 
}
module.exports = {
    dynamicInputRegulator
}