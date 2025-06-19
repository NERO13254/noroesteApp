function insertProduct(postData){
    const pathApi       = "https://noroestecil.com/APIS/api-insert-product.php";
    const authorization = "Jbm3PsdeASsnewoXyZbEz";
    axios.post(pathApi , postData , {
        headers : {
            authorization : authorization
        }
    }).then(data =>{
        console.log(data.data);
    }).catch(err=>{
        console.log(err);
    })
}
module.exports = {
    insertProduct
}