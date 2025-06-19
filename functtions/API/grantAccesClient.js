function grantAccesClient(putData){
    const pathApi = "https://noroestecil.com/APIS/api-put-grant-acces.php";
    const authData = "Jbm3PsdeASsnewoXyZbEz";

    axios.put(pathApi, putData , {
        headers: {
            authorization: authData
        }
    }).then(response=>{
        console.log(response.data);
    }).catch(err=>{
        console.log(err);
    });
}

module.exports= {
    grantAccesClient
}