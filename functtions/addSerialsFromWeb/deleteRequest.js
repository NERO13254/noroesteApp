async function deleteRequest() {
  
    fetch("https://noroestecil.com/APIS/deteSerialRequest.php" , {
        method: "POST" ,
        headers : {authorization : "Jbm3PsdeASsnewoXyZbEz"},
        body : JSON.stringify(dataRemoved)
    })
    .then(response=>response.text())
    .then(data=>console.log(data))
    .catch(error=>console.log(error))
}

module.exports = {
    deleteRequest
}