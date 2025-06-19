const { answers } = require("./answers");

async function startSearchCilinder() {
    let cilindersFromDb = await answers.readLikeCilinders();
    contentSearched.innerHTML="";

    // imprime los resultados de db en el HTML
    let keys = Object.keys(cilindersFromDb[0]).slice(1);
    for (let i = 0; i < cilindersFromDb.length; i++) {
        const element = cilindersFromDb[i];
        let div = document.createElement("div");
        div.className= "cilContainer";

        keys.forEach(objName=>{
            let strong = document.createElement("strong");
            strong.textContent = element[objName];
            div.append(strong);
        })

        let check = document.createElement("input");
        check.type='checkbox';
        check.id= element["id"];
        div.append(check);
        
        contentSearched.append(div);
    }
}

module.exports = {
    startSearchCilinder
}