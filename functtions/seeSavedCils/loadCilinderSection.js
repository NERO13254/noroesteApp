function loadCilinderSection(e) {
    e.target.style.backgroundColor='white';
    seeWafers.style.backgroundColor='#F0F0F0';

    document.getElementById("cilinderGuideContent").style.display='grid';
    document.getElementById("waferGuideContent").style.display="none";

    // oculta el contenedor de obleas y muestra el contenedor de cilindros
    document.getElementsByClassName("buttonWaferContent")[0].style.display="none";
    document.getElementsByClassName("buttonContent")[0].style.display="flex";
}

module.exports = {
    loadCilinderSection
}