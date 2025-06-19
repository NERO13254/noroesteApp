async function searchTotalPayOrDebit(clearData){
   let getTotal = await allAnswer(`SELECT total FROM payordebit WHERE owner = '${clearData}' ORDER BY id DESC LIMIT 1`); 
    let getTotalValue=0
    if(getTotal.length!=0){
        getTotalValue = getTotal[0]["total"];
    }
    return new Promise((resolve, reject) => {
        resolve(getTotalValue);
    });
}

module.exports = {
    searchTotalPayOrDebit
}