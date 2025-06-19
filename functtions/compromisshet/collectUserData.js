async function collectUserData() {
    let keyClientFinish         = "";
    let valuesClients           = "";
    return new Promise((resolve, reject) => {
        let getInputsClients = document.getElementsByClassName("clientData")[0].querySelectorAll("[name='inputContent']");
        // inserta los datos del cliente en un array
        getInputsClients.forEach(element => {
            keyClientFinish+= `${element.id},`;
            valuesClients+= `'${element.value}',`;
        });
        resolve( [keyClientFinish , valuesClients] );
    })

}

module.exports = {
    collectUserData
}