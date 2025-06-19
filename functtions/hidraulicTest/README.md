## hidraulicTest

## Funciones Principales 

# searchCilinderContainer(param){}
 Esta funcion proviene del HTML y se encarga de buscar un cilindro por numero de serie en la base de datos
 16-<input id="inputSerialCilinder" onkeyup="searchCilinderContainer(event)" placeholder="BUSCAR CLNDRO NºSERIE ">
 Dentro contiene otra función que es la que se encarga de realizar la consulta y imprimirlo en HTML
 # searchCilinder ( param.value )  
 La cual realiza la consulta y obtiene los datos del cilindro , si no encuentra resultados despliega una alerta
 la cual de avisa al usuario que no se encontraron resultados
 Pero si se encontraron resultados , Hace visible el contenedor de resultados y evalua si el cilindro tiene el id
 de la cuenta corriente que realizó el tramite , si no  lo tiene , remplaza el contenedor del nombre por "---" .
 En el caso contrario , a base del valor de la cuenta corriente "554" , busca en la tabla de cuentas corrientes
 el nombre de la cuenta corriente con id "554" -> Guillermo trejo2 .

 Luego selecciona el nombre del TDM en base a su id. 
 Para finalmente crear un div que contenga la información obtenida del cilindro e imprimirla en el HTML. 

# searchTdm()
 Proviene del HTML 
 13 - <input id="searcherInput" onkeyup="searchTdm(event)" placeholder="BUSCAR TDM">
 La  cual evalua si se ingresaron mas  de 2 letras en el input , en caso de ser así despliega la función
 # searchTdmLoaded(e.target.value);
 Esta recibe el valor del input y hace visible el div de busqueda en el HTML , luego obtiene los div de 
 todos los TDM del HTML para acceder a los nombres , asi con metodo comparativo se filtran los TDM que coincidan
 con el parametro de busqueda que es "e.target.value" , a los coincidientes los pinta en el HTML

# searcherContentInfo.addEventListener("click") && userListContent.addEventListener("click") 
 Es el contenedor de resultados de busqueda , si se hace click evalua si es un elemento de tipo checkbox
 y setea en el localStorage "idWorkShop" con el id del TDM seleccionado , para usarse más adelante .
 luego ejecuta una función 
 # clickerCount()
 La cual se encarga de setear un contador de clicks para cada TDM , cada vez que se hace click el contador suma 1 al 
 total , así de esta manera los TDM se pueden ordenar por nivel de uso ,  osea  , el que mas se usa aparecerá arriba
 del toda en la lista apenas se cargue la ventana.  

 Una vez finalizada la función envía un renderer a "seeSavedCilinders" para saltar a la siguiente ventana donde se
 verán los cilindros guardados que pasaron por el TDM seleccionado.

----
**[Volver al Indice General](../../README.md)** 
**[seeSavedCilinders](../hidraulicTest/README.md)** : Cilindros guardados del TDM seleccionado