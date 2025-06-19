const pexeles = require("pexels");
const axios = require("axios");

const webApi    = `https://api.pexels.com/v1/search?query=green%20background&per_page=7`;

async function getResponseApi(){
    const resposeApi = await axios.get(webApi , {
        headers : {
            Authorization: 'KtvwP3flO4NI0Fsr3aetgiL5fjgwSuNLXCo7UIkxSmFWyukc0TvZKWzR'
        }
        
    })

    return new Promise((resolve, reject) => {
        resolve(resposeApi.data.photos)
    })
}

module.exports = {
    getResponseApi
}

