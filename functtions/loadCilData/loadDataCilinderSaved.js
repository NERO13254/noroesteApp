async function loadDataCilinderSaved(idCilinderSaved) {
    // si el cilindro está incompleto o no 
    let idCilinder  = idCilinderSaved.slice(-1)=="_" ? idCilinderSaved.slice(0,-1) : idCilinderSaved;
    
    // obtiene los datos del cilindro
    let dataCilinder= await allAnswer(`SELECT * FROM cilindersaved WHERE id ='${idCilinder}'`);
    // inserta el espesor del cilindro
    let getThikness = await allAnswer(`SELECT thikness FROM typecilinders WHERE code='${String(dataCilinder[0]["omologation"]).toUpperCase().slice(0,-2)}'`);
    
    document.getElementById("thikness").textContent= getThikness.length>0 ? getThikness[0]["thikness"] : 7;
    let getInputs = Array.from(document.querySelectorAll(".dataCil"));
    // completa los campos con los datos del cilindro guardado
    getInputs.forEach(element => {
        // completa los campos que no son fehcas
        if(element.getAttribute("name").split("_").length==1){
            if(element.name!="pec"){
            let dataContent = String(dataCilinder[0][element.getAttribute("name")]).toUpperCase() != "NULL" ? String(dataCilinder[0][element.getAttribute("name")]).toUpperCase() : "";
            let typeElement = dataContent;
            element = element.tagName=="INPUT" ? element.value=typeElement : element.textContent = typeElement ;
            }
        }else{
            // completa las fechas
            let elementName = element.getAttribute("name").split("_");
            let elementContent = elementName[1].charAt(0)=='f' ? dataCilinder[0]["datefab"] : dataCilinder[0]["lastcrpc"];
            console.log(elementContent);

            let getDate = elementContent!=null ? String(elementContent).split("/") : ["",""];
            let typeData= elementName[1].slice(3).charAt(0) == "M" ? getDate[0] : getDate[1];
            element.value = typeData;
        }
    });
}

module.exports = {
    loadDataCilinderSaved
}