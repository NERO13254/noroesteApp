async function sendPutApi(putData){



    // envia los datos del producto para ser actualizados
    await fetch("https://noroestecil.com/APIS/api-update-products.php" , {
        method : "POST" ,
        headers : { "authorization" : "Jbm3PsdeASsnewoXyZbEz" },
        body : JSON.stringify(putData) 
    })
    .then(response=> response.text())
    .then(data => alert("Producto actualizado en la web") )
    .catch(error=> console.log(error));
}

module.exports = {
    sendPutApi
}