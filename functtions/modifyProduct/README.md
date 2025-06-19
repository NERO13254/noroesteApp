## modifyProduct


# addInputsHtml 
El modulo se encarga de llenar los inputs del HTML con la informacion del producto
pimero obtiene todos los inputs , luego obtiene de DB los datos del producto seleccionado 
Luego recorre todos los inputs obtenidos e inserta los datos de db

pero si se enucnetra con el input de id "existence"  o "path"  ejecuta una función difrente

caso de ser "existence" : obtiene los datos de "existence" osea, cuantas cantidades no facturadas hay del producto
luego ,  obtiene las cantidades facturadas del producto y las suma , para obtener el valor total de existencias 
y por ultimo inserta el valor final en el input 

caso de ser "path" : obtiene la URL de la imagen e inserta la ruta en la imagen del producto 


luego evalua  si es que tiene sierie , en caso de tenerla añade el boton de series
y junto con este añade todos los controladores de la seccion de series 

## addSerials <-- ES EL MODULO QUE CONTIENE TODOS LOS CONTROLADORES DE LAS SERIES
Lo  primero que se ve al leer el modulo es la variable global ["serialsArray"] que es la que se encarga de 
almacenar todas las series del producto , a lo largo de los procesos este array puede sufrir modificaciones 
por ejemplo al momento de agregar una serie , o eliminar una serie , también se debe hacer en este array 
debido a que es el que utiliza otra función para imprimir las series en el HTML , por eso es que se deben 
eliminar o agregar en este array también.  


# addSerialController
crea la interfaz HTML de las series y las agrega

# addSerialsInArray
Obitne las series del producto de la base de datos , primero obtine los datos del producto (nombre , codigo )
para pasarselos a la consulta db.all que es la que obtendrá las series de la base de datos . 
Una vez obtenidos los datos de db recorre el array devuelto por db e insrta los resultados en el array global
["serialsArray"]

# orderAndInsertSerialsInHtml

recibe como parametro ["serialsArray"] , y limpia el contenedor de series del HTML . Luego mediante el metodo
sort ordena el array recibido , y evalua que tipo de dato es el que debe ordenar ya que hay 2 tipos de series
1 - **serie comun** ---> (MA33202) es una serie que en su estructura está compuesta por letras en su comienzo y  
luego contiene numeros y no contiene espacios 

2- **serie compuesta** ---> es una serie que se compone de 2 o más series dentro de una sola ( MA 33202 TT07 12565 )
la cual secaracteriza por seguir el siguiente esquema : primero el codigo y luego el numero de la serie separado
por espacios . 

Estas series se estructuran de esta manera debido a que en otro proceso su esquema es utilizado para implementar
un buscador de manera mas sencilla y evitar errores . 

Una vez ordenado el array de las series procede a recorrerlo mediante Foreach e inserta las series ordenadas 
en el HTML

# addRowController
Añade una fila compuesta por 2 inputs de codigo y serie , esta fila añadida sirve para crear una **serie compuesta**
por ejemplo si se ingresa en los primeros 2 campos "J" "23352" y en los otros 2 campos agregados se ingresa 
"MA" "3320" se añadirá la siguiente serie : 
J 23352 MA 3320 

# alertInfo 
Despliega una alerta de información para el usuario que explica el funcionamiento de el ingreso multiple

# addSerialProcess 
recibe como parametro la variable global ["serialsArray"] y el modulo sirve para agregar la serie 
primero empieza obteniendo los 2 valores de ingreso correlativo 
["startMultiple"] y ["endMultiple"]  luego evalua si estos dos inputs contienen información 
de ser el caso evalua que la información ingresada sea correcta y luego corrobora que no haya mas de 20
numeros de distancia entre elvalor inicial y el final , para esto resta ambos valores .
si la difrencia es menor o igual a 19 entonces setea en la variable ["valueDifrence"] el valor resultante.

Por otro lado si los campos de  ["startMultiple"] y ["endMultiple"] estan vacios setea la variable 
["valueDifrence"] a 0 

Luego obtiene todos los campos de serie y codigo del producto .

Luego crea un db serialize combinado con "BEGIN TRANSACTION"  para ejecutar una sola llamada a base de datos 
y evitar sobrecargas hacia la base de datos . 
dentro de esta funcion se ejecuta un bulce for regido por el valor de  ["valueDifrence"].
y por cada iteración que haga el For , obtiene los datos de serie mediane FOREACH y codigo del producto y le suma +1 al codigo
para luego armar la serie completa .
Saliendo del bucle foreach se encuentra el string armado , y evalua si es que tiene 2 " " o mas , en caso de tener 2  o menos elmimina todos los espacios por que se sobreentiende que es una  **serie comun** y en el caso de tener
mas de 2 " " conserva los espacios debido a que es una  **serie compuesta**.

Luego a la serie modificada la añade al array global  de series ["serialsArray"] y ejecuta la función 
**orderAndInsertSerialsInHtml** antes vista.

# deleteSerial 
Al presionar alguno de los campos de tipo checkBox dentro del HTML donde se ubican todas las series pimero
evalua esi es que se presionó el input de tipo checkbox y evalua que su tagName sea de tipo "INPUT"
si cumple con estos requisitos procede a ejecutar la función .
La cual primero obtiene los datos del producto (nombre , codigo interno , serie seleccionada) , luego
le pasa estos datos a la consulta db.run para eliminar la serie.
Una vez eliminada la serie la elimina del array global ["serialsArray"] para que , por si algún motivo luego de eliminar la serie o series luego se agrega una nueva ,  las series eliminadas no aparezcan en el HTML nuevamente.


**[Volver al Indice General](../../README.md)** 