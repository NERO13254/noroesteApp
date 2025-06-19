function printGuide( nameGuide , append , apOrPre){
    let guideDiv        = document.createElement("div");
    guideDiv.className  = "containerGuide";
    if(apOrPre=="append"){
        for (let i = 0; i < nameGuide.length; i++) {
            const element = nameGuide[i];
            const str     = document.createElement("strong");
            str.innerHTML = element["name"];
            guideDiv.prepend(str);
        }

        append.prepend(guideDiv);
    }else{
        for (let i = 0; i < nameGuide.length; i++) {
            const element = nameGuide[i];
            let strContent= document.createElement("strong");
            strContent.textContent= element["name"];
            append.append(strContent);
        }
         
    }

}
module.exports = {
    printGuide
}