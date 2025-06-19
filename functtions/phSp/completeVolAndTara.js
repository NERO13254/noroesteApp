async function completeVolAndTara(params) {
    let vol = parseInt(params.target.value);
    let masa= parseInt(document.getElementById("taraestimado").value);

    document.getElementsByName("capMedida")[0].value = vol;
    document.getElementById("taramedido").value = masa;


}

module.exports = {
    completeVolAndTara
}