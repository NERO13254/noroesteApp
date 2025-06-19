async function loadMessages() {

    return new Promise((resolve, reject) => {

        fetch("https://noroestecil.com/APIS/portSerials.php" , {
            method : "POST" ,
            headers :{ authorization : "Jbm3PsdeASsnewoXyZbEz"},
            body : "enviando datos desde app"
        })
        .then(response => response.json())
        .then(data=>  resolve(data))
        .catch(err=> reject(err));
    })
}

module.exports = {
    loadMessages
}