async function printAllSpecificData(keys , element , append) {
    keys.forEach(data => {
        if(data=="insideid" || data=='id'){

        }else{
            let div = document.createElement("div");
            div.className='contentData';
            div.innerHTML=`
                <label>${data}</label>
                <input type='text' name='dataWaferContainer' value='${element[data]}' id='${data}' />
            `;
            append.append(div);
        }
    });
}

module.exports = {
    printAllSpecificData
}