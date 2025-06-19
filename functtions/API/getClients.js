function getClients(append){
    const pathApi       = "https://noroestecil.com/APIS/api-get-clients.php";
    const authData = "Jbm3PsdeASsnewoXyZbEz";
    
    const config = {
        headers: {
          'Authorization': `${authData}`
        }
    };

    let i = 0;
    axios.get(pathApi, config)
    .then(response => {
        let getArr = response.data;
        getArr.forEach(element => {
            let onlyData = element.split("-");
            let div = document.createElement("div");
            div.className = "userContent";
            div.id        = "content"+i++;
            div.name
            div.innerHTML=`
            <strong id="idClientWeb">${onlyData[0]}</strong>
            <strong id="nameClientWeb">${onlyData[1]}</strong>
            <strong id="workShopClientWeb">${onlyData[3]}</strong>

            <strong id="I${onlyData[0]}">${onlyData[6]}</strong>
            <div class="buttonContent">
                <button name='SE CONCEDIÒ EL ACCESO' class='si' id="C${onlyData[0]}">✓</button>
                <button name='SE DENEGÒ EL ACCESO'    class='no' id="D${onlyData[0]}">X</button>
                <button name='SE ELIMINÒ EL USUARIO'  class='none' id="E${onlyData[0]}">⌫</button>
            </div>
            
            `;
            usersContainer.append(div);
        });
        let getUsersDiv = document.querySelectorAll(".userContent");

        for (let i = 0; i < getUsersDiv.length; i+=2) {
            const element = document.getElementById("content"+i);
            element.style.background="rgb(237, 237, 237)";
        }
    })
    .catch(error => {
      // Manejar errores
      console.error('Error al hacer la consulta:', error);
    });
}

module.exports = {
    getClients
}