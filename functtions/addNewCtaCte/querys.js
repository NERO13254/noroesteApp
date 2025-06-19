const queryAnswer = {
    insertCtaCte : async (objData)=>{
        return new Promise((resolve, reject) => {
            
            let columns = Object.keys(objData);
            let placeHolders = columns.map(()=> '?').join(", ");
            let values  = Object.values(objData);
            let query = `INSERT INTO cuentascorrientes (${columns.join(", ")})VALUES(${placeHolders})`;

            const result = db.run( query , values, ( function(err){
                if(err){
                    reject(err.message);
                }else{
                    resolve(this.lastID);
                }
            }));
        })
    } 
};


module.exports= {
    queryAnswer
}