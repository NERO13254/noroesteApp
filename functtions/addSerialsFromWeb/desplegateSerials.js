async function desplegateSerials(arrData,e) {

    if(e.target.id=="showSerials"){
        let classElement = e.target.parentNode.children[0].textContent;

        
        e.target.parentNode.parentNode.children[1].innerHTML ="";
        e.target.parentNode.parentNode.children[1].classList.toggle("showGrid");

        arrData.forEach(element =>{
            if(element["name"]==classElement){
                let div = document.createElement("div");
                div.className ='serialData';
                div.innerHTML = `
                <strong>${element["serial"]}</strong>
                <button class='removeSerial'>X</button>
                `;
                e.target.parentNode.parentNode.children[1].append(div);
            }
        }); 
    }
}

module.exports = {
    desplegateSerials
}