
async function desplegateRegionMenu() {
    document.getElementById("modifySecttion").style.display='grid';
    document.getElementById("deleteProvince").style.display='none';
    document.getElementById("insertProvince").style.display='block';
    document.getElementById("updateProvince").style.display='none';
    document.getElementById("name").value='';
    document.getElementById("idProvince").textContent=''; 
}

module.exports= {
    desplegateRegionMenu
}