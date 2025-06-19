const { insertWaferInHtml } = require("./insertWaferInHtml")

async function loadPendingWafersForLastestDays(data) {
    data.forEach(element => {
        insertWaferInHtml(element , "pendings");
    });
    
}

module.exports = {
    loadPendingWafersForLastestDays
}