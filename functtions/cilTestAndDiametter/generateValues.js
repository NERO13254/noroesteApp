async function generateValues(params) {
    window.onload = ()=>{
        var dataToObjet             = JSON.parse(storageDatContent);
        var ToObjet                 = JSON.parse(cilinderData);
        
        var toNumber                = parseInt(ToObjet.thikness);
    
        if(isNaN(parseInt(ToObjet.thikness))){
            toNumber = 0;
        }
        // AMMOUNT TINPUT ES LA CANTIDAD DE INPUTS
        // NAMEINPUTS ES EL NOMBRE DEL INPUT
        // STARTVALUE ES EL VALOR DE REFERENCIA POR EJEMPLO 7 , 10.5 ETC
    
    
        minEspesor.innerHTML = "(" + dataToObjet.thikness+")";
        var varcontent = dataToObjet.thikness;
        if(isNaN(dataToObjet.thikness)){
            varcontent = 0;
        }
        var underCount = dataToObjet.coficent * varcontent;
        var ojviaCount =varcontent * 1.5;
    
        underSimple.innerHTML= "("+ underCount+ ")";
        idOjiva.innerHTML= "("+ ojviaCount+ ")";
    
        diameterMin.innerHTML = "("+dataToObjet.diametter +")";
        
    
    
        printVal(5 , "thikness" , toNumber, 0.9);
        printVal(3 , "ojiva" , ojviaCount , 4.6);
        printVal (3 , "fondo" , underCount , 4.6);
    
        printVal(6 , "diam"  , parseInt(dataToObjet.diametter) , 1.2);
    
        tempWater.value = Math.floor(Math.random()*8)+ 21;
        totalExpansion.value = dataToObjet.totalexpansion;
        permanentExpansion.value = dataToObjet.maxexpansion;
        capMedida.value = dataToObjet.vol;
        taraMedida.value = dataToObjet.tara; 
    
        saveAndExit.addEventListener("click", ()=>{
            let clearOjiva      = idOjiva.textContent.slice(1, -1);   
            let clearDiameter   = diameterMin.textContent.slice(1,-1);
    
            if(thikness1.value >= varcontent){
                succesFun(succesOrDangerousLength);
        
            }else{dangerous(succesOrDangerousLength);}
            
            if(thikness1Fondo.value < underCount ){
                dangerous(succesOrDangerousUnder);
            }else{
                succesFun(succesOrDangerousUnder);
            }
            
            if(ojiva1.value < clearOjiva ){
                dangerous(ojivaMessage);
            }else{
                succesFun(ojivaMessage);
            }
            if(diam1.value <clearDiameter){
                dangerous(diameterMessage);
            }else{
                succesFun(diameterMessage);
            }
            if(thikness1.value> varcontent && thikness1Fondo.value > underCount && ojiva1.value > clearOjiva && diam1.value > clearDiameter ){
                recopileData("thikness" , 5 );
                recopileData("fondo" , 3 );
                recopileData("ojiva" , 3 );
                recopileData("diam" , 3 );
    
                localStorage.setItem("obsTextarea" , obsTextarea.value);
                ipcRenderer.send("sentenceWindow");
                window.close();
            }
        });
    }
}

module.exports = {
    generateValues
}