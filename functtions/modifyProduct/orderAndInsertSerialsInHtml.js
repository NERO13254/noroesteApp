async function orderAndInsertSerialsInHtml(array) {
    // obtine el contenedor de series y lo limpia
    let serialsContainer  = document.getElementById("allSerials");
    serialsContainer.innerHTML="";

    
    // ordena el array de series 
    array.sort((a ,b)=>{
        // evalua si es una serie comun (J123) o compuesta (GP18 123 TT07 5547)
        const getNum = (item)=>{
            // si es compuesta toma el primer valor numerico y lo transforma en un numero entero
            if(item.includes(" ")){
                let onlyNum = item.split(" ");
                return parseInt(onlyNum[1].replace(/[a-z,A-Z]/g,""), 10)
            }else{
                // sino solo quita las letras y genera el numero entero
                return parseInt(item.replace(/[a-z,A-Z]/g,""),10);
            }
        }
        // realiza el metodo de comparación 
        const numA = getNum(a);
        const numB = getNum(b);
        return numA - numB;
    });
    
    
    // crea el div e inserta las series al html
    array.forEach(element => {
        let div = document.createElement("div");
        div.className = "serialContent";
        div.innerHTML = `
        <strong>${element}</strong>
        <input type="checkbox" >
        `;
        serialsContainer.append(div);
    });
}

module.exports = {
    orderAndInsertSerialsInHtml
}