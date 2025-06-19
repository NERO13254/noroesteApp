function alertInfo(message , append){
    let div = document.createElement("div");
    div.className = `infoContentData`;
    div.innerHTML = `
    <div class='infoLogo'>
        <p>i</p>
    </div>
    <div class='infoData'>
        <p> ${message}</p>
    </div>
    <button id='closeInfo'>Cerrar</button>
    `;
    append.append(div)

    document.getElementById("closeInfo").addEventListener("click" , (e)=>{
        e.target.parentNode.remove();
    })
}

module.exports = {
    alertInfo
}