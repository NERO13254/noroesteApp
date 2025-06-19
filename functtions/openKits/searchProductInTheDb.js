async function searchProductInTheDb(date , appendResults) {
    // realiza la consutla y corrobora que se hayan econtrado coincidencias y las añade al html
    let getDataDb = await allAnswer(`SELECT insideid, name, finalvalue, buyvalue, brand FROM products WHERE name LIKE '%'||'${date}' || '%' LIMIT 25`);
    if(getDataDb.length>0){
        getDataDb.forEach(element => {
            let div         = document.createElement("div");
            div.className   = "productContainer";
            div.innerHTML   =`
            <strong>${element["insideid"]}</strong>
            <strong>${element["name"]}</strong>
            <strong>${element["brand"]}</strong>
            <strong>$${parseInt(element["buyvalue"]).toLocaleString()}</strong>
            <strong>$${parseInt(element["finalvalue"]).toLocaleString()}</strong>
            <input type='checkbox' class='addToList'>
            `;
            appendResults.append(div);
        });
    }
}

module.exports = {
    searchProductInTheDb
}