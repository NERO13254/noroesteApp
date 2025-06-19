async function autoCompleteCarData(e){
    let getInputValue = e.target.value;

    const getBrandSimilar = await allAnswer(`SELECT brand FROM cars WHERE model LIKE '%' || '${getInputValue}'|| '%' LIMIT 1`);
    document.getElementsByName("brandCar")[0].value = getBrandSimilar[0]["brand"];
    return new Promise((resolve, reject) => {
        resolve();
    });
}

module.exports = {
    autoCompleteCarData
}