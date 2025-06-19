async function selectOperation(page) {
   
    // selecciona el tipo de consulta
    await page.click("#tipo-consulta");
    await page.select("#tipo-consulta", "Cilindro");
    await page.waitForSelector("#div-detalle-tipo-c" , {visible: true});

    // espera a que sea visible el nuevo formulario
    await page.waitForSelector("#marca" , {visible: true});
}

module.exports = {
    selectOperation
}