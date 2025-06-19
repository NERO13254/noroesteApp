const { ipcMain } = require("electron");
const {app , BrowserWindow , Menu,clipboard} = require ("electron");
let newUser ;
let chargeCilinders;
let viewTypeCilinders;
let chargeNewCilinder;
let cilinderData;
let cilinderTestAndDiameter;
let viewCtaCte;
let seeTdmSaved;
let modifyTdm;
let modifyTypeCil;
let seeLocation;
let addNewLocation;
let modifyLocation;
let payCilinder;
let addNewCtaCte;
let modifyCtaCte;
let goToPrint;
let newVucher;
let newProduct;
let sentenceWindow;
let seeSavedCilinders;
let printCevigas;
let printRoadMap;
let printVoucher;
let openKit;
let newKit;
let modifyKit;
let printCommitmentSheet;
let hidraulicTest;
let goToPrintCommitentShet;
let modifyProduct
let printCompromisSheet;
let modifyCtaCteData;
let modifyDataCilinderSaved;
let modifyRegion
let seeRegion
let newRegion
let addNewProductListProducts
let modifyEndConsumer;
let endConsumer;
let printedSection;
let newWafer;
let waferDataPh;
let printWafer;
let newTdm;
let phSp;


function createWindow(windowName , fileNameAndPosition, title){
    windowName= new BrowserWindow({
        width : 1050 ,
        height: 700  , 
        title : title ? title : "" , 
        webPreferences: {
            nodeIntegration : true , 
            contextIsolation: false
        }
    });
    windowName.setMenu(null);
    windowName.loadFile(fileNameAndPosition);
    windowName.webContents.openDevTools();

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
function printRenderers(){
    return (
    ipcMain.on("idData" , ()=>{createWindow(chargeCilinders , "views/chargeCilinders.html","cargar cilindros"                  )}),
    ipcMain.on("evenNewCil", ()=>{createWindow(chargeNewCilinder , "views/upCilinder.html"                  )}),
    ipcMain.on("succesUpCil", ()=>{createWindow(viewTypeCilinders, "views/viewsCilinders.html"              )}),
    ipcMain.on("backToviewCilinders", ()=>{createWindow(viewTypeCilinders, "views/viewsCilinders.html"      )}),
    ipcMain.on("returnToViewCilinders",()=>{createWindow(viewTypeCilinders, "views/viewsCilinders.html"     )}),
    ipcMain.on("submiBtnForCilUser", ()=>{createWindow(cilinderData  , "views/loadCilinderData.html"        )}),
    ipcMain.on("backToLoadCilinderData", ()=>{createWindow(cilinderData  , "views/loadCilinderData.html"    )}),
    ipcMain.on("returnToChargeCilinders" , ()=>{createWindow(cilinderData  , "views/chargeCilinders.html"   )}),
    ipcMain.on("seeTdmSaved" , ()=>{createWindow(seeTdmSaved, "views/seeTdmSaved.html"                      )}),
    ipcMain.on("modifyTdm" , ()=>{createWindow(modifyTdm , "views/modifyTdm.html"                           )}),
    ipcMain.on("quitModifyTdm" , ()=>{createWindow(seeTdmSaved, "views/seeTdmSaved.html"                    )}),
    ipcMain.on("modifyTypeCil",  ()=>{createWindow(modifyTypeCil  , "views/modifyTypeCil.html"              )}),
    ipcMain.on("addNewLocation", ()=>{createWindow(addNewLocation , "views/addNewLocation.html"             )}),
    ipcMain.on("quitNewLocation", ()=>{createWindow(seeLocation , "views/seeLocation.html"                  )}),
    ipcMain.on("modifyLocation" , ()=>{createWindow(modifyLocation , "views/modifyLocation.html"            )}),
    ipcMain.on("quitModifyLocation", ()=>{createWindow(seeLocation , "views/seeLocation.html"               )}),
    ipcMain.on("payCilinder" , ()=>{createWindow(payCilinder , "views/payCilinder.html"                     )}),
    ipcMain.on("addNewCtaCte" , ()=>{createWindow(addNewCtaCte , "views/addNewCtaCte.html"                  )}),
    ipcMain.on("backViewCtaCte"  , ()=>{createWindow(viewCtaCte  , "views/viewCtaCte.html"                  )}),
    ipcMain.on("modifyCtaCte", ()=>{createWindow(modifyCtaCte , "views/modifyCtaCte.html"                   )}),
    ipcMain.on("goToPrint" , ()=>{createWindow(goToPrint , "views/goToPrint.html"                           )}),
    ipcMain.on("backToViewCtaCte", ()=>{createWindow(viewCtaCte  , "views/viewCtaCte.html"                  )}),
    ipcMain.on("newVucher" , ()=>{createWindow(newVucher , "views/newVoucher.html"                          )}),
    ipcMain.on("sentenceWindow" , ()=>{createWindow(sentenceWindow , "views/sentenceWindow.html"            )}),
    ipcMain.on("printCevigas" , ()=>{createWindow(printCevigas , "views/printCevigas.html"                  )}),
    ipcMain.on("printRoadMap" , ()=>{createWindow(printRoadMap , "views/printRoadMap.html"                  )}),
    ipcMain.on("printVoucher", ()=>{createWindow(printVoucher , "views/printVoucher.html"                   )}),
    ipcMain.on("openKits"  , ()=>{createWindow(openKit , "views/openKits.html"                              )}),
    ipcMain.on("newKit" , ()=>{createWindow(newKit , "views/newKit.html"                                    )}),
    ipcMain.on("modifyKit"  , ()=>{createWindow(modifyKit , "views/modifyKit.html"                          )}),
    ipcMain.on("newProducts" , ()=>{createWindow(newProduct , "views/newProduct.html"                       )}),
    ipcMain.on("quitPrint" , ()=>{createWindow(hidraulicTest , "views/hidraulicTest.html"                   )}),
    ipcMain.on("goToModifyProduct",()=>{createWindow(modifyProduct , "views/modifyProduct.html"             )}),
    ipcMain.on("backToListProducts" , ()=>{createWindow(newProduct , "views/newProduct.html"                )}),
    ipcMain.on("modifyCtaCteData" , ()=>{createWindow(modifyCtaCteData , "views/modifyCtaCteData.html"      )}),
    ipcMain.on("modifyRegion" , ()=>{createWindow(modifyRegion , "views/modifyRegion.html"                  )}),
    ipcMain.on("seeRegion" , ()=>{createWindow(seeRegion , "views/seeRegion.html"                           )}),
    ipcMain.on("newRegion" , ()=>{createWindow(newRegion , "views/newRegion.html"                           )}),
    ipcMain.on("modifyEndConsumer" , ()=>{ createWindow(modifyEndConsumer , "views/modifyEndConsumer.html"  )}),
    ipcMain.on("endConsumer" , ()=>{createWindow(endConsumer , "views/endConsumer.html"                     )}),
    ipcMain.on("newWafer" , ()=>{createWindow(newWafer , "views/newWafer.html"                              )}),
    ipcMain.on("printedSection" , ()=>{createWindow(printedSection , "views/printedSection.html"            )}),
    ipcMain.on("waferDataPh" , ()=>{createWindow(waferDataPh , "views/waferDataPh.html"                     )}),
    ipcMain.on("printWafer" , ()=>{createWindow(printWafer, "views/printWafer.html"                         )}),
    ipcMain.on("newTdm" , ()=>{createWindow(newTdm , "views/newTdm.html"                                    )}),
    ipcMain.on("phSp" , ()=>{createWindow(phSp , "views/phSp.html" , "phSp")}),

    
    
    ipcMain.on("addNewProductListProducts" , ()=>{createWindow(addNewProductListProducts , "views/addNewProductListProducts.html")}),
    ipcMain.on("modifyDataCilinderSaved",()=>{createWindow(modifyDataCilinderSaved, "views/modifyDataCilinderSaved.html")}),
    ipcMain.on("printCompromisSheet"  , ()=>{createWindow(printCompromisSheet , "views/printCompromisSheet.html")}),
    ipcMain.on("goToPrintTechnicalFile",()=>{createWindow(goToPrintCommitentShet , "views/printTechnicalFile.html")}),
    ipcMain.on("backtoTestAndDiameter", ()=>{createWindow(cilinderTestAndDiameter , "views/cilinderTestAndDiameter.html")}),
    ipcMain.on("newWindowFromLoadCilinderData", ()=>{createWindow(cilinderTestAndDiameter , "views/cilinderTestAndDiameter.html")}),
    ipcMain.on("printCommitmentSheet" , ()=>{createWindow(printCommitmentSheet , "views/printCommitmentSheet.html")}),
    ipcMain.on("printHtml" , (event , data)=>{
        let getWindow = BrowserWindow.getAllWindows();
        let fiterWindw= getWindow.find(win => win.getTitle()=== `${data}`);
        fiterWindw.webContents.print({
            silent: false,
            printBackground: true,
            margins: {
              marginType: 'none'
            }
        });
    }),

    ipcMain.on("pirintCompromisShet" , ()=>{
        let getWindows = BrowserWindow.getAllWindows();
        let printCompromisSheet = getWindows.find(win=> win.getTitle()==="CARTA DE COMPROMISO");
        printCompromisSheet.webContents.send("printCompromisSheetAcept");
    }),

    ipcMain.on("seeSavedCilinders" , ()=>{
        let getWindow = BrowserWindow.getAllWindows();
        let filterWin = getWindow.find(win=> win.getTitle()=="CILINDROS CARGADOS");
        if(filterWin){
            filterWin.focus();
            filterWin.webContents.send("reloadCilinderList");
        }else{
            createWindow(seeSavedCilinders , "views/seeSavedCilinders.html");
        }
    }),

    ipcMain.on("corroborateWebCilinder" , (e ,data)=>{
        let getAllWindows = BrowserWindow.getAllWindows();
        let mainWindow = getAllWindows.find(win=> win.getTitle()==="INICIO");
        
        if(mainWindow){
            mainWindow.webContents.send("corroborateWebCilinder" , data);
        } 
    }),

    ipcMain.on("recopliateCilinderScrappingData" , (e, data)=>{
        let windowFiltered = BrowserWindow.getAllWindows();
        windowFiltered = windowFiltered.find(win=>win.getTitle()=="phSp");
        if(windowFiltered){
            windowFiltered.webContents.send("scrappingData", data)
        }
    })
);
}


module.exports = {
    printRenderers
}