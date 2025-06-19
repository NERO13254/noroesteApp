const { answers } = require("./answers");

async function searchCilinder(e) {
    let cilForSearch = e.value.toUpperCase().trim();
    let getDataTypeCilinder = await answers.readLikeCilinder(cilForSearch);

    if(getDataTypeCilinder.length>0){
        codeCilinderMatched=true;
  
        let getStrongs = Array.from(document.querySelectorAll("#sepecificDataCil strong.dataCil"));

        console.log(getDataTypeCilinder[0]["thikness"])
        getStrongs.forEach(data=>{
            let valueData = getDataTypeCilinder[0][data.id];
            data.textContent = valueData != undefined ? valueData : "";
        })


    }else{
        codeCilinderMatched=false;
    }
}

module.exports = {
    searchCilinder
}