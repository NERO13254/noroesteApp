async function corroborateOmologation(omologation) {
    let onlyLetter  = omologation.replace(/[0-9]/g , "").length>=2 ?omologation.replace(/[0-9]/g , "") : "";
    let onlyNumber  = omologation.replace(/[a-z|A-Z]/g ,"").length>=2 ? omologation.replace(/[a-z|A-Z]/g ,"") : "";

    let corroborateOmologationSentence = onlyLetter+onlyNumber == omologation ? true : false;

    return new Promise((resolve, reject) => {
        resolve(corroborateOmologationSentence);
    })
}

module.exports = {
    corroborateOmologation
}