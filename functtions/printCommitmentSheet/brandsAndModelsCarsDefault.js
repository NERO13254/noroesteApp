async function brandsAndModelsCarsDefault() {
    async function insertDataInHtml(divName , typeData , append, columnSelected ,tableSelected , foreignKey){
        let getAproximateData = await allAnswer(`SELECT ${columnSelected} FROM ${tableSelected} WHERE 1 `);
        console.log(`SELECT ${columnSelected} FROM ${tableSelected} WHERE 1 `)
        getAproximateData.forEach(element => {
            let div = document.createElement("div");
            div.className = divName;
            div.innerHTML = `<strong class='${element[foreignKey]}'>${element[typeData]}</strong>`;
            append.append(div);
        });
    }
    
    await insertDataInHtml("searchBrand", "model" , resultsOfTheSearchModel , "model , foreignkey" , "cars","foreignkey");
    await insertDataInHtml("searchBrand", "name" , resultsOfTheSearchBrand  , "id,name","carsbrand", "id");
    
}

module.exports = {
    brandsAndModelsCarsDefault
}