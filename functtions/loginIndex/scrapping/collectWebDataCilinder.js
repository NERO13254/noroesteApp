async function collectWebDataCilinder(page , lastElement) {
    
    // espera a que se abra la ventana
    const [newPage] = await Promise.all([
        new Promise(resolve=> page.browser().once("targetcreated", async target =>{
            if(target.type() === "page"){
                const popup = await target.page();
                await popup.bringToFront();
                resolve(popup);
            }
        })),
        lastElement.click() // clickea el ultimo elemento
    ]);

    await newPage.waitForSelector("#tablacil .tablesaw-cell-content" , {visible: true});

    let dataContent = await newPage.evaluate(()=>{
        const elements = Array.from(document.querySelectorAll("#tablacil .tablesaw-cell-content"));

        return elements.map(data=> data.textContent.trim())
    })


    domain = await newPage.$$eval(".row  .well", (data) => {

    // evalua si se encuentra el string que contiene el dominio
    if (data[3] && data[3].children && data[3].children[5] && typeof data[3].children[5].textContent === "string"){
        
        // Extrae el texto después de "Dominio:"
        const text = data[3].children[5].textContent;
        const match = text.match(/Dominio:\s*(\S+)/);
        return match ? match[1] : "";
    }
    return "";
    });

    // retorna los datos en forma de string
    dataContent.push(domain)
    dataContent = String(dataContent.join(","))
    return dataContent;
}

module.exports = {
    collectWebDataCilinder
}