async function corroborateDomain(domain) {
    return new Promise((resolve, reject) => {
        // obtiene el dominio y corrobora si tiene 6 o 7 letras , si no es ninguna directamente es un dominio incorrecto
        if(domain.length == 7  || domain.length==6){
            let corroborateDomainSentence ="";
            // corrobora que haya 3 numeros en caso de ser patente nueva o vieja 
            let corroborateNumbers      = domain.replace(/[a-z|A-Z]/g , "").length == 3 ? domain.replace(/[a-z|A-Z]/g , "") : "";
            // si es patenete vieja emplaza los numeros y corrobora que existan 3 letras sino es falso
            if(domain.length==6){
                let corroborateOldLetters   = domain.replace(/[0-9]/g , "").length == 3 ? domain.replace(/[0-9]/g , "") : false ;
                corroborateDomainSentence   = corroborateOldLetters+corroborateNumbers == domain ? true : false
            }
            if(domain.length == 7){
                // corrobora que la patente tenga 4 letras sino devulve false
                let corroborateNewLetters   = domain.replace(/[0-9]/g ,"").length == 4  ? domain.replace(/[0-9]/g ,"") : false  ;
                // arma nuevamente la cadena , si coincide con la cadena original es correcto , sino , devueelve falso
                if(corroborateNewLetters){
                    corroborateDomainSentence = corroborateNewLetters.slice(0,2)+corroborateNumbers+corroborateNewLetters.slice(-2) == domain ? true : false;
                }else{
                    corroborateDomainSentence = false;
                }
            }
            //  asigna el valor (true o false) a la variable global
            errorContainer = corroborateDomainSentence;
        }
        else{
            errorContainer = false;
        }
        
        resolve(errorContainer);
    })
}

module.exports = {
    corroborateDomain
}