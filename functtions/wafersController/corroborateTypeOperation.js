async function corroborateTypeOperation(obj) {
    let typeOperation = "";
    if(obj["typeOperationGeneral_B"]!=null){
        typeOperation = "B"
    }
    else if(obj["typeOperationGeneral_C"]!=null){
        typeOperation = "C"
    }
    else if(obj["typeOperationGeneral_M"]!=null){
        typeOperation = "M"
    }
    else if(obj["typeOperationGeneral_R"]!=null){
        typeOperation = "R"
    }
    else if(obj["typeOperationGeneral_D"]!=null){
        typeOperation = "D"
    }

    return typeOperation;
}

module.exports = {
    corroborateTypeOperation
}