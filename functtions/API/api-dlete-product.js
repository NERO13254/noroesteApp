async function deleteProductApi(dataiD){
    

    const pathApi       = "https://noroestecil.com/APIS/api-remove-prodcut.php";
    const authorization = "Jbm3PsdeASsnewoXyZbEz";

    await fetch(pathApi , {
        method: "POST",
        headers : {authorization : authorization},
        body : JSON.stringify({"insideId": dataiD})
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(()=> alert("algo salió mal"));
    
}
module.exports = {
    deleteProductApi
}
