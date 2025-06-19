async function loadCarsSaved() {
    seeCarsSaved.innerHTML="";
    let getDataDb = await allAnswer("SELECT  carsbrand.id,carsbrand.name,cars.model FROM cars JOIN carsbrand ON cars.foreignkey = carsbrand.id  WHERE 1 ORDER BY cars.id DESC ");

    getDataDb.forEach(element => {
        let div         = document.createElement("div");
        div.className   = 'containerBrand';
        div.innerHTML   = `
        <strong>${element["name"]}</strong>
        <strong>${element["model"]}</strong>
        <input type='checkbox' id='${element["id"]}'>
        `
        seeCarsSaved.append(div);
    });
}

module.exports = {
    loadCarsSaved
}
