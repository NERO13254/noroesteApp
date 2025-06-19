async function searchLocation(data) {
    let searchLocation = await allAnswer(`SELECT name, cp FROM locations WHERE name LIKE '%' || '${data}'|| '%' LIMIT 1`);
    if(searchLocation.length>0){
        document.getElementsByClassName("location")[0].value = searchLocation[0]["name"];
        document.getElementsByClassName("cp")[0].value= searchLocation[0]["cp"];
    }
}

module.exports = {
    searchLocation
}