const strongsContent    = document.getElementById("strongsContent");
const getDataStorage    = JSON.parse(localStorage.getItem("dataObjClientCommitmentSheet"));
let columns = 24;
let rows    = 20;
console.log(getDataStorage[0].split(":")[1].slice(0,-1));

for (let i = 0; i < getDataStorage.length; i++) {
    const element = getDataStorage[i];
    let printedContentData = element.split(":")[1].slice(0,-1);

    let strong = document.createElement("strong");
    strong.id= element.split(":")[0].slice(1).trim();
    strong.innerHTML = printedContentData
    strongsContent.append(strong)
}

let contentCounter = 0;
for (let i = 0; i < columns; i++) {
    let div = document.createElement("div");
    div.className="blockContent";
    

    for (let e = 0; e < rows; e++) {
        let contentDiv = "<div class='block'></div>"
        let divCon = document.createElement("div");
        divCon.className='block';
        divCon.innerHTML = `<p>${contentCounter}</p>`;
        div.append(divCon);
        contentCounter += 1;
    }
    grilla.append(div)
}