function succesAlert(title,message , ammounButtons , idButton, textContentBtn, appendContainer){

    appendContainer.innerHTML="";
    let div = document.createElement("div");
    div.className='succesAlertContent';
    div.innerHTML = `
    <strong class='titleSucces'>${title}</strong>
    <strong class='messageSucces'>${message}</strong>
    <div class='iconContent'>
        <p>✓</p>
    </div>
    `;

    for (let i = 0; i < ammounButtons; i++) {
        let btn = document.createElement("button");   
        btn.id  = idButton[i];
        btn.textContent=textContentBtn[i];
        div.append(btn);
    }
    appendContainer.append(div);

    div.addEventListener("click" , (e)=>{
        if(e.target.id=="cancelProcess"){
            appendContainer.innerHTML="";
        }
    });
}

module.exports = {
    succesAlert
}