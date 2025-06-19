async function addCarToDb(containerBrand , brandSearch, newModelCarInput ,foreignkey) {
    let getAllBrands = containerBrand;
    // si encuentra la marca que se quiere añadir solo se le agrega el id de foreignkey
    let filteredBrand = getAllBrands.filter(data=>data.children[0].textContent.trim() == brandSearch);
 
    if(filteredBrand.length>0){

        if(foreignkey){
            foreignkeyConent = foreignkey
        }else{
            foreignkeyConent = filteredBrand[0].children[2].id;
        }
         
        // inserta el modelo con su marca establecida
        await runAnswer(`INSERT INTO cars (model , foreignkey)VALUES('${newModelCarInput}', '${foreignkeyConent}')`);
    }
    else{
        // inserta el modelo y luego la marca
        await runAnswer(`INSERT INTO carsbrand (name)VALUES('${brandSearch}')`);
        // luego inserta la marca relacinandola con el modelo
        await runAnswer(`INSERT INTO cars (model , foreignkey)VALUES('${newModelCarInput}', (SELECT id FROM carsbrand WHERE name ='${brandSearch}' ) )`);
    }
}

module.exports = {
    addCarToDb
}