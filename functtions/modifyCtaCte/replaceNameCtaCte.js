async function replaceNameCtaCte(data) {
    let getNameCtaCte = data.parentNode.children[0].textContent.toUpperCase().trim();
    owner.value = getNameCtaCte;
    idNewOwner.textContent = data.id;
    idNewOwner.className   = data.className;
    document.getElementsByClassName("searchCtaCteContent")[0].classList.toggle("show");

    if(typeVoucher.textContent.length>0){
        // limpia el campo de pagos y lo estacblece en 0
        debit.value=0;
        // actualiza el valor de ph del cliente seleccionado
        pay.value= parseInt(data.className).toLocaleString();
    }

}

module.exports = {
    replaceNameCtaCte
}