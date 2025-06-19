function alertFun(message  , append){
    append.innerHTML="";
    let div = document.createElement("div");
    div.className = "alertContent";
    div.innerHTML = `<strong>${message}</strong>`;

    append.append(div);
}
module.exports  ={
    alertFun
}