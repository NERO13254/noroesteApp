const fs =  require("fs"); 
async function defaultProcess() {
    let data =  "!!";

    return new Promise((resolve, reject) => {
        // evalua si encuentra el archivo TXT en la carpeta donde se guarda este normalmente
        fs.readFile("C:\\Users\\Usuario\\Desktop\\REV.txt" , (err , data)=>{
            if(err){
                // si no encunetra el rev significa que no existe entonces retorna true 
                // por mas que sea un error
                resolve(true);
            }else{
                // pero si lo encuentra entonces retorna false 
                resolve(false);
            }
        });
    })
}

module.exports =  {
    defaultProcess
}