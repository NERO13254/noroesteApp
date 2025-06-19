async function printCilindersInHtml(getAllCilinders , i , append) {
    let cilinderListContent = document.getElementById("cilinderListContent");
    var element = getAllCilinders;
    var div = document.createElement("div");
    div.className = "contentInput";
    let dangerous = element["finished"]=="NO" ? "rgb(127 127 209)": "" ;
    let fontColor=element["finished"]=="NO" ? "white" : "";
    document.getElementById("cilinderGuideContent").style.display='grid';
    document.getElementById("waferGuideContent").style.display='none'

    div.innerHTML = `
        <strong style="background:${dangerous} ; color:${fontColor}">${element["omologation"]}</strong>
        <strong style="background:${dangerous} ; color:${fontColor}">${element["serialnumber"]}</strong>
        <strong style="background:${dangerous} ; color:${fontColor}">${element["insideid"]}</strong>
        <input type="checkbox" id="${element["id"]}" class ="${element["id"]}">
    `;
    append.append(div);

    if(i%2==0){
        div.style.background = "rgb(245, 245 ,245)";
    }
}

module.exports = {
    printCilindersInHtml
}