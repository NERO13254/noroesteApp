async function  desplegateSettingsMenuVoucherSeleected(data) {

    // obtiene el contenedor del div que conteien el menu y lo hace visible
    let divContentSettings = document.getElementsByClassName("intputContainer");
    divContentSettings[0].style.display = 'grid';

    // obtiene los inputs del menu
    let getInputs = divContentSettings[0].querySelectorAll("input");
    let getVoucherInfo = data.parentNode.querySelectorAll("strong");
    let number = 0;

    // completa el campo del nombre del dueño del remito 
    let owner = document.getElementById("owner");

    // elimina el id para insertar solo el nombre 
    let getName = document.getElementById("nameContent").textContent.split(" ");
    owner.value = getName.slice(1).join(" ");

    // si el remito tiene 5 strongs es uno normal , por lo que simplemente los añade
    if(getVoucherInfo.length == 5){
        typeVoucher.textContent = "";
       for (let i = 0; i < getVoucherInfo.length; i++) {
        //element es el div que contiene la información del remito seleccionado
        const element = data.parentNode.children[i];
        getInputs[i].value =  getVoucherInfo[i].textContent;
       }
    }else{
        typeVoucher.textContent = "(PH)";
        for (let i = 0; i < getVoucherInfo.length+1; i++) {
            const element = data.parentNode.children[number];
            if(getInputs[number].id == "obs"){
                let getNamePh = element.querySelectorAll("p");
                getInputs[number].value = `${getNamePh[0].textContent.trim()} ${getNamePh[1].textContent.trim()} ${getNamePh[2].textContent.trim()}`;
            }else{
                getInputs[number].value =  element.textContent;
            }
            number = number+1
        }
    }
}

module.exports = {
    desplegateSettingsMenuVoucherSeleected
}