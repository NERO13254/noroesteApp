async function completeInputs(data , page) {
    let brandContent = data[2].trim().toUpperCase();
    // filtra la marca
    const brandFilter = await page.$eval(
        "#marca",
        (select, brandContent) => {
            const options = Array.from(select.options);
            const found = options.find(option => option.textContent.trim().toUpperCase() === brandContent);
            return found ? found.value : null;
        },
        brandContent
    );

    await page.select("#marca" , brandFilter);  // clickea la marca
    await page.type("#cid" , data[0]) ;         // inserta el codigo de homologacion
    await page.type("#nro-serie" , data[1]);    // inserta el numero de serie
    await page.click("#consulta-op");           // clickea el boton de consultar

    await page.waitForSelector("tr .text-primary" , {visible: true}); // espera a que el siguiente campo sea visible
}

module.exports = {
    completeInputs
}