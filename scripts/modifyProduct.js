const {ipcRenderer}                 = require("electron");
const {addInputsHtml}                 = require("../functtions/modifyProduct/addInputsHtml");
const {deleteProduct}              = require("../functtions/modifyProduct/deleteProduct");
const {saveProduct}              = require("../functtions/modifyProduct/saveProduct");
const createExistences              = require("../functtions/modifyProduct/createExistences");
const backBtn                       = require("../functtions/backBtn");
const { succesAlert } = require("../functtions/succesAlert");
const { modifyExistencesFunction } = require("../functtions/modifyProduct/modifyExistences");
const { addSerials } = require("../functtions/modifyProduct/addSerials");
const getData                       = localStorage.getItem("productsValues");

window.onload = async()=>{
    // boton para volver atras
    backBtn.backBtn(backElelemet,"newProducts");

    // rellena los campos del html con los datos del producto 
    await addInputsHtml();

    // al presionar el boton de series
    document.getElementById("addSerials") ?
    document.getElementById("addSerials").addEventListener("click", async()=>{
        await addSerials();
    }) : ""

    // Funcion para eliminar el producto
    document.getElementById("deleteProduct").addEventListener("click" , async()=>{
        await deleteProduct();
    });

    // al cargar una imagen en el input file habilia el boton para subir la imagen a web
    document.getElementById("addImg").addEventListener("change" , ()=>{
        console.log("cambio");
        document.getElementById("addImgButton").style.display='block';
    })

    // sube la imagen a web
    document.getElementById("addOrChangeImg").addEventListener("submit" , (e)=>{
        e.preventDefault();
        let formData = new FormData();
        let file = document.getElementById("addImg").files[0];
        formData.append("imagen" , file);
        let insideid = document.getElementById("insideid").value.trim();
        formData.append("insideid" , insideid );

        fetch("https://noroestecil.com/APIS/api-update-products-img.php" , {
            method : "POST" ,
            headers : {"authorization": "Jbm3PsdeASsnewoXyZbEz"},
            body : formData
        })
        .then(response=> response.text())
        .then(data=> succesAlert("Exito","La imagen se añadió a la web con exito",1,["cancelProcess"],["Aceptar"], document.getElementById("reportStatusContent")))
        .catch(error=> console.log(error));
    });

    // abre la seccion de modificar existencias
    document.getElementById("addExistences").addEventListener("click" , ()=>{
        createExistences.createExistences(JSON.parse(getData)[8]["billed"],JSON.parse(getData)[5]["existencias"]);
    });

    // al presionar "guardar" en la seccion de modificar existencias
    document.getElementById("saveNumber").addEventListener("click" , async()=>{
        await modifyExistencesFunction();
    })

    //  cierra la ventana de modificar existencias
    document.getElementById("closeData").addEventListener("click" , ()=>{
        poductsBilledSection.style.display="none";
    });

    // FUNCION PARA GUARDAR EL PRODUCTO
    document.getElementById("saveProduct").addEventListener("click" , async()=>{
        await saveProduct();
        ipcRenderer.send("backToListProducts");
        window.close();
    });
}