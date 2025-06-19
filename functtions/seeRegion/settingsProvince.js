async function settingsProvince(target) {
    let name = target.parentNode.children[0].textContent;

    document.getElementById("idProvince").textContent = target.id;

    document.getElementById("modifySecttion").style.display='grid';
    document.getElementById("name").value=name;
    document.getElementById("deleteProvince").style.display='block';
    document.getElementById("updateProvince").style.display='block';
    
    document.getElementById("insertProvince").style.display='none';
}

module.exports = {
    settingsProvince
}