const { printProducts } = require("../functtions/loadProductsPPricesFromWeb/printProducts");
const { updateProducts } = require("../functtions/loadProductsPPricesFromWeb/updateProducts");
let listProductsModified = document.getElementById("listProductsModified");

window.onload = async()=>{

    // obtiene todos los datos modificados de la web
    await fetch("https://noroestecil.com/APIS/modifyProducts.php" , {
        method:"POST",
        headers :{"Content-Type": "application/json" , authorization : "Jbm3PsdeASsnewoXyZbEz"},
    })
    .then(response => response.json())
    .then(async(data) => await printProducts(data))
    .catch(error=> console.log(error))

    // al presionar el boton "ver" despliega los detalles del producto
    listProductsModified.addEventListener("click" , (e)=>{
        if(e.target.textContent=='ver'){
            e.target.parentNode.parentNode.children[1].classList.toggle("showGrid");
        }
    })

    // al presionar el boton "eliminar" se remueve el elemento de la lista
    listProductsModified.addEventListener("click" , (e)=>{
        if(e.target.textContent=='eliminar'){
            e.target.parentNode.parentNode.remove();
        }
    })

    // al presionar "actualizar" se actualizan los productos
    document.getElementById("saveData").addEventListener("click" , async()=>{
        await updateProducts();
    });
}