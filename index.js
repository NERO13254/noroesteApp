const {app , BrowserWindow , ipcMain, Menu , clipboard, webContents} = require ("electron");
const {adminInfo}       = require("./adminInfo");
const  printRenderers   = require("./functtions/indexRenderer/renderer");
const {exec}            = require("child_process");
const fs                = require("fs");
const getDb             = require("./db/dbRed");
const db                = getDb.getDb(__dirname);

let mainWindow ;
let newUser ;
let seeClients;
let viewTypeCilinders;
let viewCtaCte;
let seeLocation;
let newProduct;
let exportData;
let seeSellerProduct;
let cilinder;
let addModelCar;
let seeWebClients;
let dbWindow;
let seeRegion;
let newVoucher;
let endConsumer;
let seeVouchers;
let pendingWafers;
let instrumental;
let dayliPayOrDebit;
let worksAndRefills;
let exportWafersToEnergas;
let addSerialsFromWeb;
let loadProductsPricesFromWeb;
let pecList;
let phSp;
let modifyCtaCteSection;
function createWindow(windowName , fileNameAndPosition, title){
    // crea una nueva ventana dentro de la variable
    windowName= new BrowserWindow({
        // se establece el alto y ancho de la ventana
        width : 1050 ,
        height: 700  , 
        title : title ? title : "",
        // establece la integración con node y desactiva contextInsolation
        webPreferences: {
            nodeIntegration : true , 
            contextIsolation: false
        }
    });
    // quita el menú por defecto y carga el HTML en la vista de la ventana
    windowName.setMenu(null);
    windowName.loadFile(fileNameAndPosition);
    // abre la consola de desarrolladores
    windowName.webContents.openDevTools();

    // setea el menú al presinar click derecho con copiar y pegar
    windowName.webContents.on('context-menu', (event, params) => {
        const setSectionMenu= [
        {
            label: "COPIAR",
            click(){
                let selectedText;
                windowName.webContents.executeJavaScript(`
                    (() => {
                        return window.getSelection().toString();
                    })()
                `).then((result) => {
                    selectedText = result;
                    console.log("Texto seleccionado:", selectedText);
                    clipboard.writeText(selectedText);
                }).catch((error) => {
                    console.error("Error al obtener el texto seleccionado:", error);
                });
            }   
        },
        {
            label: "PEGAR",
            click(){              
                windowName.webContents.executeJavaScript(`
                navigator.clipboard.readText()
                .then(text => {
                    console.log(text);
                    const focusedElement = document.activeElement;
                    focusedElement.tagName === 'INPUT' ? focusedElement : null;
                    focusedElement.value=text;
                })
                .catch(err => {
                    console.log("err message")
                });
                `)
                
            }   
        }];
        const newMenuPopUp  = Menu.buildFromTemplate(setSectionMenu);
        newMenuPopUp.popup(windowName , params.x , params.y);
    });
}

app.on("ready" , ()=>{
    // carga la ventana principal
    createWindow(mainWindow , "views/index.html" , "INICIO" );
    // carga los listeners de las ventanas secundarias
    printRenderers.printRenderers();
    
    ipcMain.on("datos" , (e , val)=>{
        const prepareSentence =  db.prepare("INSERT INTO tdm (workshop , workshopcode , pec , cuit ,iva , location, country , phone , mail) VALUES (?,?,?,?,?,?,?,?,?) ");
        prepareSentence.run(val.work , val.workshopCode, val.pec ,val.cuit  , val.iva, val.home , val.country, val.phone, val.mail);
        newUser.close();
    });

    

    ipcMain.on("restoreWindow" , ()=>{
        let getAllWindows = BrowserWindow.getAllWindows();

        if (getAllWindows.length > 1) {
            const secondWindow = getAllWindows.find(win => win.getTitle() === "DATOS DE CUENTA CORRIENTE"); // Obtener la segunda ventana
            
            if(secondWindow){
                secondWindow.focus();
                secondWindow.webContents.send('reloadQueryList');
            }
        }
    })
    modifyCtaCteSection = {
        label : "Modificar Cta. Cte.", click(){createWindow(modifyCtaCteSection  , "views/modifyCtaCteSection.html")}
    }
    let createWind ={
        label :  "PRODUCTOS",
        id: "productsId" , 
        click(){createWindow(newProduct , "views/newProduct.html" )}
    }
    let addBrandCar= {
        label : "AGREGAR MODELO DE AUTO",
        click(){createWindow(addModelCar , "views/addModelCar.html")}
    }
    let dbWindow= {
        label : "DB",
        click(){createWindow(dbWindow , "views/dbWindow.html")}
    }
    let newTdm = {
        label : "NUEVO TDM CERTIFICADO",
        click(){createWindow(newUser , "views/seeTdmSaved.html")}
    }
    let loadLocation = {
        label: "CARGAR LOCALIDADES",
        accelerator: "CTRL + L",
        click(){createWindow(seeLocation , "views/seeLocation.html")}
    }
    let loadProvince = {
        label: "CARGAR PROVINCIAS",
        click(){createWindow(seeRegion , "views/seeRegion.html")}
    }
    let instrumentalContent = {
        label: "Instrumental",
        click(){createWindow(instrumental , "views/instrumental.html")}
    }
    pecList = {
        label : "Listado de PECs",
        click(){createWindow(pecList , "views/pecList.html")}
    }
    
    ipcMain.on("loginedUser" , (event , data)=>{
        if(data[0].toLowerCase()!=adminInfo[0] && data[1]!=adminInfo[1]){

            addBrandCar = { label: "-" , click(){}}
            dbWindow    ={ label: "-" , click(){}}
            newTdm      ={ label: "-" , click(){}}
            loadLocation= { label: "-" , click(){}}
            loadProvince={ label: "-" , click(){}}
            instrumentalContent={ label: "-" , click(){}}
            pecList = {label:"-",click(){}}
            modifyCtaCteSection = {label:"-",click(){}}
        }
        const adminMenu = [
            {
            label :  "PH",
            submenu : [
                newTdm
            ,
            {
                label : "CARGAR PH", 
                accelerator : "CTRL + P",
                click(){createWindow(seeClients ,"views/hidraulicTest.html" )}
            } ,
            {
                label : "VER TIPOS DE CILINDROS", 
                accelerator : "CTRL + R",
                click(){createWindow(viewTypeCilinders, "views/viewsCilinders.html");}
            },
            {
                label : "VER CILINDROS" , 
                click(){createWindow(cilinder , "views/cilinder.html")}
            }
            ,
            loadLocation,
            loadProvince,
            pecList
            , 
            {
                label: "EXPORTAR DATOS A ENERGAS",
                click(){
                    exportData = new BrowserWindow({
                        width : 1020,
                        height: 700,
                        webPreferences: {
                            nodeIntegration:true,
                            contextIsolation: false
                        }
                    });
                    exportData.loadFile("views/loadFile.html");
                    exportData.setMenu(null);
                    exportData.webContents.openDevTools();
                }
            },
            {
                label : "Obleas",
                click(){createWindow(exportWafersToEnergas , "views/wafersController.html")}
            }
            ]
        },
            {
                label :  "CTA CTE",
                submenu : [
                    {label : "Cta. Cte." , click(){createWindow(viewCtaCte  , "views/viewCtaCte.html")}},
                    modifyCtaCteSection
                ],
                
            },
            createWind,
            addBrandCar,
            dbWindow,
            {
                label: "REMITOS",
                submenu : [
                    {
                        label : "Ver remitos",
                        click(){createWindow(seeVouchers , "views/seeVouchers.html")}
                    },{
                        label: "Nuevo remito",
                        click(){
                            viewCtaCte = new BrowserWindow({
                                width : 1050,
                                height: 700,
                                webPreferences:{
                                    nodeIntegration:true,
                                    contextIsolation : false
                                }
                            });
                            viewCtaCte.setMenu(null);
                            viewCtaCte.loadFile("views/viewCtaCte.html");
                            viewCtaCte.webContents.openDevTools();
                            viewCtaCte.webContents.once("did-finish-load" , ()=>{
                                viewCtaCte.webContents.send("reloadQueryList")
                            });
                        }
                    },                    
                    {
                        label : "Remto para consumidor final",
                        click(){createWindow(endConsumer , "views/endConsumer.html")}
                    }
                ]

            },
            {
                label : "VER PRODUCTOS VENDIDOS", 
                click(){createWindow(seeSellerProduct , "views/seeSellerProduct.html")}
            },
            {
                label: "WEB", 
                submenu: [

                    {
                        label : "Acceso a precios",
                        click(){createWindow(seeWebClients , "views/seeWebClients.html")}  
                    } ,
                    {
                        label : "Agregar series ",
                        click(){createWindow(addSerialsFromWeb , "views/addSerialsFromWeb.html")}
                    },
                    {
                        label : "Cargar productos Modificados",
                        click(){createWindow(loadProductsPricesFromWeb,"views/loadProductsPricesFromWeb.html")}
                    }
                ]
            },
            {
                label : "Fichas",
                submenu :[
                    {
                        label: "Ficha Obleas",
                        click(){createWindow(pendingWafers , "views/pendingWafers.html")}
                    },
                    {
                        label: "Gastos/importes diarios",
                        click(){createWindow(dayliPayOrDebit , "views/dayliPayOrDebit.html")}
                    },
                    {
                        label: "Recambios y trabajos",
                        click(){createWindow(worksAndRefills , "views/worksAndRefills.html")}
                    }
                ]
                
            },
            instrumentalContent,
            {
                label: "ph",
                click(){createWindow(phSp , "views/phSp.html")}
            }
        ]
        var buildedMenu = Menu.buildFromTemplate(adminMenu);
        Menu.setApplicationMenu(buildedMenu);
    });
});









