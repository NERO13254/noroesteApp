async function getOrderNumPayoOrDebit(){
    const getOrderNum = await allAnswer("SELECT ordernum FROM payordebit WHERE 1 ORDER BY id DESC LIMIT 1");
        return new Promise((resolve, reject) => {
        let orderNumContent = 0
        if(getOrderNum.length!=0){
            orderNumContent = parseInt(getOrderNum[0]["ordernum"])+1;
        }
        resolve(orderNumContent);    
    })
}

module.exports = {
    getOrderNumPayoOrDebit
}