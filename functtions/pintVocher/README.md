# pintVoucher
Esta ventana se encarga de renderizar el proceso de previsualización de los remitos 
y los imprime fisicamente 

el proceso comienza evaluando si ["insideidSavedVoucher"] se encuentra en el localStorage
ya que
["insideidSavedVoucher"] => contiene el id de la cuneta corriente y el id del remito seleccionado
este dato se utiliza cuando se quiere ver un remito ya existente.

si existe en el localStorage , entonces lanza la función :

# loadStorageData 
comienza dividiendo el id de la ctaCte de el id del remito seleccionado mediante split.

**nameCtaCte**
luego obtiene el nombre de la cuenta corriente mediante una consulta a DB. evaluando si es que se encuentra el nombre , debido a que los remitos obtienen el nombre del propietario de la tabla de "cuentascorrientes" , por ende , si se eliminó alguna cuenta corriente el nombre no aparecerá y por consecunete lanza error , así que para solucionarlo se usó una condicional que evalua si los resultados son mayores a 0 entonces inserta el nombre de DB pero de lo contrario inserta "inexistente".

**getDataVoucher**
Luego obtiene los datos del remito mediante DB. a base de la consulta obtiene el valor "content" que contiene todos los productos del remito en formato Json txt . por lo que hace una parse para transformar los datos a JSON

**totalValueContent**
evalua si existe el valor total. 
los remitos nuevos contienen un elemento finalVal que es el valor total con el descuento aplicado. por ende , si se encuentra este valor lo inserta en la variable , pero de lo contrario asigna el valor totalvalue , que generalmente se ubica en los remitos antiguos.

y por ultimo asigna el valor de la variable al html pero antes lo transforma en valor numerico y lo transforma en local.

luego inserta el numero de remito en el HTML.
Tambien inserta el valor del descuento en HTML
inserta la fecha en HTML

y por ultimo inserta los datos del remito en el HTML mediante la función **runAndPrintContentVoucher**


# runAndPrintContentVoucher 
recibe como paraetro los datos de "content" del remito . y los transforma en JSON.

luego setea unavariable ue es la que contendrá el valor total sin descunto ["totalValue"]

posteriormente recorre los datos de "content" mediante forEach(). dentro del bucle evalua si el objeto que se está
recorriendo contiene 3 o más keys , esto se hace para filtrar los valores de "total" y "descuento" ya que estos tienen 1 key , se implementa este filtro por que si tiene 3 o mas keys es un producto por ende se debe imprimir en HTML , para esto crea el div en HTML e inserta strongs con la infromacion de cada producto 
