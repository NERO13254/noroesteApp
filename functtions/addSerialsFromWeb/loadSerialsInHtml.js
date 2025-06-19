async function loadSerialsInHtml(arrData) {
    if(arrData.length>0){
        // filtra todos los datos repetidos y deja 1 ejemplar de cada 1. ej : [gp18 , gp18,de10]=> [gp18,de10]
        let onlyData = [];
        arrData.forEach(data=>{
            if (!onlyData.includes(data["name"]) ){
                onlyData.push(data["name"]);
            }
        })
        
        serialsContent.innerHTML='';

        // crea el elemento HTML general para cada serie
        onlyData.forEach(element=>{
            let div = document.createElement("div");
            div.className = "productContent";
            div.innerHTML = `
                <div class="headerProduct">
                    <strong>${element}</strong>
                    <button id='loadSerials'>cargar</button>
                    <button id='showSerials'>ver</button>
                </div>
                <div class="contentSerials"> </div>
            `;
            serialsContent.append(div);
        })
    }
}


module.exports = {
    loadSerialsInHtml 
}