async function desplegateCarController(data) {
    let getDataSelected = data.parentNode;
    getTarget.classList.toggle("show");

    document.getElementById("modelCarInput").value   = getDataSelected.children[1].textContent.toLowerCase();
    document.getElementById("brandCar").value   = getDataSelected.children[0].textContent.toLowerCase();
}
module.exports = {
    desplegateCarController
}