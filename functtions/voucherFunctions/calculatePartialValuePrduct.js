async function calculatePartialValuePrduct(target) {
    
    if(target.tagName=="INPUT"){
        let div = target.parentNode;
        let ammount =parseInt(target.value) ? parseInt(target.value) : 0;
        let value = parseInt(div.children[3].textContent.replace(/\./g,""));

        let finalPartialValue = ammount* value;

        div.children[5].textContent = "$ "+finalPartialValue.toLocaleString();
    }
}

module.exports = {
    calculatePartialValuePrduct
}