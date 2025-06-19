const { corroborateCils } = require("./corroborateCils");
const { printCilInHtml } = require("./printCilInHtml");
const {answersContainer}= require("./dbAnswers/answers");
async function seeCilindersOfTheDay(day) {

    // obtiene los cilindros exportados del día de hoy
    let getData = await answersContainer.getCilindersExportedsOfTheDay(day);

    let listExported = document.getElementById("listExported");
    let getDay      = "";
    if(day){
        getDay = day;
    }else{
        let newData = new Date();
        getDay  = `${newData.getDate()}/${newData.getMonth()+1}/${newData.getFullYear()}`;
    }

    console.log(getDay);
    return

    document.getElementById("dateExported").textContent= getDay;
    
    await printCil(getDay, getData);

    async function printCil(day ,getData) {
        let cilCorroborated = await corroborateCils(getData);
        for (let i = 0; i < getData.length; i++) {
            const element = getData[i];
            await printCilInHtml(element , document.getElementById("cilindersList"));
        }
    }


    document.getElementById("getCilndersForDate").addEventListener("click" , async()=>{
        let dateSearcherDiv = document.getElementById("dateSearcherDiv").value;
        await printCil(dateSearcherDiv , getData);
    });

    listExported.addEventListener("click" , (e)=>{
        if(e.target.getAttribute("type")=="checkbox"){
            reExportOnlyCil.reExportOnlyCil(e, getData);
        }
    });

    return new Promise((resolve, reject) => {
        resolve();
    })
}

module.exports={
    seeCilindersOfTheDay
}