async function dataReg(firstFiveDataTxt , element, regulatorPath){
    let regulatorTxt = `${firstFiveDataTxt}${element["reguatorCode"]};${element["serialNumberRegulator"]};${element["operationTypeRegulator"]};${element["fistRegulatorDate"]};${element["firstDateClient"]};A;`+"\n";
    fs.appendFileSync(regulatorPath , regulatorTxt , (err)=>{
        if(err){
            console.log(err.message);
        }
    })

    return new Promise((resolve, reject) => {
        resolve();
    })
}

module.exports = {
    dataReg
}