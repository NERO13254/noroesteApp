async function chargeTdm() {
    let getTdm          = document.getElementById("getTdm");
    // obtiene todos los tdm de Db
    let getData = await allAnswer("SELECT id, workshop , workshopcode , pec, cuit , iva , location, country  FROM tdm WHERE 1 ORDER BY id DESC ");
    let getKeys = Object.keys(getData[0]);
    //recorre todos los elementos y los inserta en html
    getData.forEach(element => {
        let div = document.createElement("div");
        div.className="contentInfo";
        for (let i = 0; i < getKeys.length; i++) {
            const onlyKeys = getKeys[i];
            let p = document.createElement("p");
            p.textContent = element[`${onlyKeys}`];
            div.append(p)
        }
        let checkPut = document.createElement("input");
        checkPut.type= "checkbox";
        checkPut.className = "F"+element["id"];
        div.append(checkPut);
        getTdm.append(div);
    });
}

module.exports =  {
    chargeTdm
}