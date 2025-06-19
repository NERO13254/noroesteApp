async function corroborateTypeVehicle(obj) {
    let typeVehicleNumber = ""; 
    let typeVehicle = ["taxi","PickUp","part","bus","oficial","otros",""];
    typeVehicle.forEach((element,index)=>{
        if(obj["typeVehicle_"+element]!=null){
            typeVehicleNumber= index+1;
        }
    });

    return typeVehicleNumber ;
}

module.exports ={
    corroborateTypeVehicle
}