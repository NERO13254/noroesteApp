async function seeWafersSavedFunc(workShopCode){
    document.getElementById("cilinderGuideContent").style.display='none';
    document.getElementById("waferGuideContent").style.display="grid";

    let lettersOperation = ["B","C","M","R","D"];
    
    function getTypeOperation(oblea){
        let returnedContentData = "";
        lettersOperation.forEach(element=>{
            let getData = oblea["typeOperationGeneral_"+element] != null ? element :null;
            if(getData!=null && getData.length>0){
                returnedContentData = getData;
            }
        });
        return returnedContentData;
    }

    function corroborateData(data){
        let dataContent = data!= null ? data!="" ? data : "— —":"— —";
        return dataContent
    }
    const getAllObleas = await allAnswer(`SELECT id,typeOperationGeneral_B,typeOperationGeneral_C,typeOperationGeneral_M,typeOperationGeneral_R,typeOperationGeneral_D, oldOblea , modelCar , brandCar , domain, reguatorCode , serialNumberRegulator FROM wafersdata WHERE workshopcode ='${workShopCode}'`);
    cilinderListContent.innerHTML = '';
    console.log(getAllObleas);

    for (let i = 0; i < getAllObleas.length; i++) {
        const element = getAllObleas[i];
    
        let intNum = i / 2;
        let div = document.createElement("div");
        div.className = 'contentInputWafer';
        if(intNum%1 == 0){
            div.classList.toggle("ligthGrey");
        }

        console.log(getTypeOperation(element));

        div.innerHTML = `
        <strong>${corroborateData(element["id"])}</strong>
        <strong>${corroborateData(element["oldOblea"])}</strong>
        <strong>${corroborateData(element["domain"])}</strong>
        <strong>${corroborateData(getTypeOperation(element))}</strong>
        <input type='checkbox' id='O${element["id"]}'>
        `;
        cilinderListContent.append(div);
    }
    // al darle click selecciona el id de la obla
    cilinderListContent.addEventListener("click" , (e)=>{
        localStorage.setItem("idWaferSaved",e.target.id);
        e.target.parentNode.classList.toggle("changeBG");
    })
}

module.exports = {
    seeWafersSavedFunc
}