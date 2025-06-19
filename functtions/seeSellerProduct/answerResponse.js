async function answerResponse(answer) {

    let errorContent = answer.length>0 ? "(200) Exito" : "(404) Sin Resultados";

    document.getElementById("results").innerHTML = `Resultados : <strong> ${answer.length}</strong>`;
    document.getElementById("reportError").innerHTML = `Errores : <strong>${errorContent}</strong>`;
}

module.exports= {
    answerResponse
}