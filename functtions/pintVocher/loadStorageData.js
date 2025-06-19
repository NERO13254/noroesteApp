const { nameCtaCte, getDataVoucher } = require("./answers");
const runAndPrintContentVoucher = require("./runAndPrintContentVoucher"); 
async function loadStorageData(){
    // obtiene los datos del storage y los divide con un split
    let getDataDb = localStorage.getItem("insideidSavedVoucher");
    let onlyDataDb= getDataDb.split(",");

    // obtiene el nombre de la ctacte del propietario del remito a base del id de la ctacte
    let getName = await nameCtaCte(onlyDataDb[1]);
    // inserta el nombre en el HTML
    document.getElementById("clientNamedDb").textContent = getName.length>0 ? getName[0]["name"] : "Inexistente";
    // ejecuta la consulta a la base de datos y obtiene todos los valores del ultimo remito guardado
    const getData = await getDataVoucher(onlyDataDb[0]);

    // convierte en un json el contenido del remito ya que vienene en un formato txt 
    let toObjectData    = JSON.parse(getData[0]["content"]);

    // evalua si se encuentra el valor total 
    let totalValueContent   = toObjectData[toObjectData.length-2]["finVal"] ? toObjectData[toObjectData.length-2]["finVal"] : toObjectData[toObjectData.length-2]["totalvalue"] ;
    // inserta el valor total y el id del remito 
    totalContent.textContent = "$"+ parseInt(totalValueContent).toLocaleString();
    // inserta el numero de remito en el HTML
    idvoucher.textContent = getData[0]["insideid"];
    // rellena el campo de fecha con hora minuto y la fecha
    fullData.textContent = getData[0]["date"];
    // obtiene el descuento y lo inserta en el html
    let percentContent = getData[0]["discount"]=="" ? 0 : getData[0]["discount"];
    discountContent.textContent = "%"+percentContent;
    // inserta los productos del remito en el html y calcula el valor total final con el porcentaje

    runAndPrintContentVoucher.runAndPrintContentVoucher(getData);
}

module.exports = {
    loadStorageData
}