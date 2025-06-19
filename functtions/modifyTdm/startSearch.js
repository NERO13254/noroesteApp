const { answers } = require("./answers");

async function startSearch(params) {
    let dataUser = params.target.value.trim();
    let resultsPecContent = document.getElementById("resultsPecContent");
    if(dataUser.length>0){
        let getPecs = await answers.readPec(dataUser);
        resultsPecContent.style.display='block';
        resultsPecContent.innerHTML ='';
        getPecs.forEach(element => {
            
            let div = document.createElement("div");
            div.className = "pecSearched";

            div.innerHTML = `
            <strong class='${element["id"]}'>${element["pec"]}</strong>
            <button>+</button>
            `;
            resultsPecContent.append(div);
        });
    }else{
        resultsPecContent.style.display='none';
    }
}

module.exports = {
    startSearch
}