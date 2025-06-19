async function printDataInHtml(element,append) {
    let div = document.createElement("div");
    div.className='elementContent';
    div.innerHTML=`
    <strong class='elementData' name='name'>${element["name"]}</strong>
    <p class='elementData' name='description'>${element["description"]}</p>
    <strong class='elementData' name='valuenew'>$${parseInt(element["valuenew"]).toLocaleString()}</strong>
    <strong class='elementData' name='valueused'>$${parseInt(element["valueused"]).toLocaleString()}</strong>
    <button class='deleteElement' name='${element["id"]}'></button>
    <button class='modifyElement' name='${element["id"]}'></button>
    `;
    append.prepend(div);
}

module.exports = {
    printDataInHtml
}