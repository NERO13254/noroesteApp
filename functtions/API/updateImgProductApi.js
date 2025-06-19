function sendNameImgProduct(putData){
    // SE ESTABLECEN LA CONTRASÑA Y LA RUTA DE LA API
    const pathApi       = "https://noroestecil.com/APIS/api-update-products-img.php";
    const authorization = "Jbm3PsdeASsnewoXyZbEz";

    // USANDO AXIOS SE ENVIA A LA API A TRAVEZ DE PUT
    axios.put(pathApi,putData, {
        headers: {
            // se inserta la clave en la contraseña
            authorization: authorization
        }
    }).then(response=>{
        ipcRenderer.send("newProducts");
        localStorage.removeItem("imgProductImg");
        window.close();
    }).catch(err=>{
        console.log(err);
    })
}

module.exports={
    sendNameImgProduct
}