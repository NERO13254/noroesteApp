const puppeteer = require('puppeteer');
let browser='' , page='';

async function browserNavigator() {

    if(!browser){
        // si no hay navegador abierto, lo abre
        browser = await puppeteer.launch({headless: false});
        page =  await browser.newPage();
    }else if (!page || page.isClosed()) {
        // si la pestaña está cerrada, la vuelve a abrir
        page =  await browser.newPage();
    }


    // intenta abrir la página de consultas de operaciones PEC
    await page.goto("https://www.enargas.gov.ar/secciones/gas-natural-comprimido/sic-gnc/consultas/pec/consultas-operaciones-pec.php");
    


    // Corrobora la Url actual
    const currentUrl = page.url();
    const isNotLoggedIn = await page.evaluate(() => {return document.querySelector(".alert")}); 



    // Si fue redirigido al login se loguea
    if(currentUrl.includes("/sic.php")){
        await login();
    }else if(isNotLoggedIn){
        await login();
    }

    // retorna la pagina en la seccion "operaciones pec"
    return page;


}


// si no está logueado, inicia sesión
async function login(params) {
    // Rellenar el login
    await page.type("#usuario", "noro");
    await page.type("#password-sic", "Horacio1478.");
    await page.click("#btn-sic");   
    await page.waitForNavigation(); 

    await page.goto("https://www.enargas.gov.ar/secciones/gas-natural-comprimido/sic-gnc/consultas/pec/consultas-operaciones-pec.php");
}

module.exports = {
    browserNavigator
}