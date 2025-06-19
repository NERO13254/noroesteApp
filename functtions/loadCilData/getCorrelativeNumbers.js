async function getCorrelativeNumbers(dateContainer){
    // obtiene los valores de certificado codigo interno ultimo de la base de datos
    const lastCertificateNumber = await allAnswer("SELECT certificatenumber , insideid FROM cilindersaved WHERE 1 ORDER BY id DESC LIMIT 1");
    // si no existen los valores los genera y encapsula los datos en un array 
    return new Promise((resolve, reject) => {
        let insideId            = 109866;
        let certificatenumberDb = 86600;
        let payDateContent      = lastCertificateNumber[0]["paydate"];
        if(lastCertificateNumber.length != 0) {
            insideId            = lastCertificateNumber[0]["insideid"];
            certificatenumberDb = parseInt(lastCertificateNumber[0]["certificatenumber"]);
        }
        insideId            = insideId + 1;
        certificatenumberDb = parseInt(certificatenumberDb) + 1;
        dateContainer.push(insideId,certificatenumberDb );
        resolve(dateContainer);
})
}
module.exports = {
    getCorrelativeNumbers
}