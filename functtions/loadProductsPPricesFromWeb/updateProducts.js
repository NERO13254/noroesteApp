const { answers } = require("./answers");

async function updateProducts(){
    let dataContent = Array.from(document.querySelectorAll(".productContent"));
    
    // recorre todos los elementos y los actualiza
    await answers.beginTransaction();
    
    dataContent.forEach(async(element)=>{
        let insideid = element.children[0].id;
        
        let inputs = element.children[1].querySelectorAll("input");
        let answerData = `
        name='${inputs[0].value}',
        description='${inputs[1].value}',
        finalvalue='${inputs[2].value}',
        path='${inputs[3].value}',
        wholesalervalue = '${inputs[5].value}'
        `;

        await answers.updateProduct(answerData , insideid);
    });

    await answers.commit();

    // una vez actualizados los productos envía un mensaje a la web para que elimine los productos del inBox
    fetch("https://noroestecil.com/APIS/removeInboxData.php" , {
        method: "POST",
        headers :{"Content-Type": "application/json"},
    })
    .then(response=> response.text())
    .then(data=> console.log(data))
    .catch(error=> console.log(error))

}

module.exports = {
    updateProducts  
}