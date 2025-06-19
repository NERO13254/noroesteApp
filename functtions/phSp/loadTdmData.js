const { answers } = require("./answers")

async function loadTdmData() {
    let idTdm = localStorage.getItem("idWorkShop")
    let dataTdm = await answers.readTdm(idTdm);

    if(dataTdm.length>0){

        let getData = document.querySelectorAll(".workshopData strong");
        getData.forEach(element=>{
   
            element.textContent = dataTdm[0][`${element.id}`];
        });
    }

}

module.exports = {
    loadTdmData
}