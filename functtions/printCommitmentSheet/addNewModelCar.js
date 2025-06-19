const { addCarToDb } = require("../addModelCar/addCarToDb");


async function addNewModelCar() {
    // corrobora si ya existe la marca que se desea agregar
    let getBrand        = brandCar.value.toUpperCase().trim();
    let getModelCar     = modelCar.value.toLowerCase().trim();

    let getAllBrands    = Array.from(resultsOfTheSearchBrand.querySelectorAll(".searchBrand"));
    let filteredBrand   = getAllBrands.filter(data => data.textContent.toUpperCase().trim()==getBrand);
    // corrobora si existe la marca
    let filteredBrandContet = filteredBrand.length>0 ?  filteredBrand[0].children[0].className : 0
    //utiliza el modulo compartido de addModelCar para añadir el modelo de auto   
    await addCarToDb(getAllBrands , getBrand ,  getModelCar , filteredBrandContet);
    // una vez agregado se cierra el cartel y se añade el elemento al html
    document.getElementsByClassName("deleteOrtherProductAlert")[0].style.display="none";
    // obtiene el modelo de div del html
    let nodeCloned = resultsOfTheSearchModel.children[0].cloneNode(true);
    nodeCloned.children[0].textContent  = getModelCar;
    // se añaden los elementos al html
    if(filteredBrand.length>0){
        // si existe la marca solo añade el modelo del vehiculo
        nodeCloned.children[0].className    = filteredBrandContet;
        resultsOfTheSearchModel.append(nodeCloned)
    }else{
        let number= 0;
        getAllBrands.forEach(element=>{
            number = parseInt(element.children[0].className)> number ?parseInt(element.children[0].className) : number
        });
        nodeCloned.children[0].className    = number+1;
        resultsOfTheSearchModel.append(nodeCloned);
        let brandCloned = nodeCloned.cloneNode(true);
        brandCloned.innerHTML =`<strong class='${number+1}'>${getBrand}</strong>`;
        resultsOfTheSearchBrand.append(brandCloned);
    }
    // hay que consguir el id de maximo valor y sumarle +1 , para añadir la marca con el id para q no se repita
    // luego añadir el modelo con el id+1 

    console.log(nodeCloned);
}


module.exports ={
    addNewModelCar
} 