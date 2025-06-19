# seeSavedCilinders 
Su función principal es la de mostrar en pantalla todos los cilindros (con un limite de 500)  que pasaron
por el TDM previamente seleccionado . Dando la posibilidad de imprimir datos como :
-Hoja de ruta
-Cevigas 
-Ficha tecnica
-Carta de compromiso 
Donde todos estos archivos de impresión recolectan datos del cilindro para llenar los campos e imprimirse fisicamente

También se puede generar un nuevo cilindro en la seccion de "Nuevo" , que luego de generado aparecerá en la 
lista. 
Por otra parte hay una seccion de obleas , que son los tramites guardados e impresos de "Ficha tecnica" , que se
agrupan por el TDM por donde pasó el cilindro al cual se le realizó la "ficha tecnica"

## Funciones principales
# checkLocalStorageData (data , ipcRendererSend)
 Recibe 2 parametros , data es el parametro de busqueda en el localStorage  y ipcRenderer send es el renderer que 
 se enviará al proceso principal para mostrar la proxima ventana 
 La funcion consta de obtner en el localStorage(data) , si existe data entonces procede a enviar el renderer.
 Del caso contario que no exista data en el Storage, entonces despliega una alerta que imprime
 "SELECCIONE UN REGISTRO". 
 ya que esta funcion es utilizada para los procesos finales de otras  funciones , para corroborar que se haya 
 seleccionado algun dato de la lista para imprimir ya sea un cilindro o una oblea 

# goToPrint (button, goingTo)
 Es una funcion que contiene un addeventListener para el boton indicado , que al presionarse envía el renderer
 establecido en goingTo al proceso principal y cierra la ventana actual

# startSearchCil.addEventListener("keyup")
 Añade un listener al input "buscar" del html situado arriba de la lista de resultados , la función corrobora
 si hay una cantidad superior a 0 de caracteres escritos  , si no es el caso , oculta la lista de resultados
 pero si hay mas de un caracter escrito primero evalua en que seccion está ubicado el usuario
 -Obleas 
 -Cilindros 
 Para esto se estableció una variabe global denominada "typeSearch" , la cual al presionar alguno de los 2 
 botones de cilindro o oblea entre los procesos que realizan cada uno , setean el valor de
 "cilinders" o "wafers" a la variable , así la función actual puede evaluar en donde está situado el usuario.
 En caso de (typeSearch != "wafers") 
 se lanza la función "searchCilinder.searchCil" recibiendo los parametros del cilindro "cilindersaved" 
 En caso contrario recibe los parametros de la oblea : "waferdatasaved".

 # searchCilinder.searchCil (e , "cilindersaved" / "waferdatasaved" )  
 La funcion searchCil primero obtiene el codigo de TDM del localStorage que tiene como clave "searchCil"
 y obtine el valor del input que ingresó el usuario (e.target.value) .  
 Despliega el contenedor de resultados y lo hace visible en el HTML .  

 Luego comienza con la busqueda . primero busca entre los elementos impresos por defecto en la lista de resultados
 si es que se está buscando un dato reciente (dentro de los primeros 300) entonces lo trae de la lista de 
 datos precargada ,clona el modulo y lo agrega a la lista de resultados. 
 En caso de que no se encuentre el dato buscado en los primeros 300 resultados , entonces procede a realizar la 
 consulta en la base de datos correspondiente . Si la consulta no devuelve resultados entonces despliega una
 alerta la cual le avisa al usuario que "no se encontraron resultados" .
 Del caso contario que se encuentren datos , evalua si se está buscando una oblea o cilindro y crea un div 
 con la información correspondiente depiendiendo de que tipo de dato sea y lo agrega a la lista de resultados.

# clickCil (div)
 Evalua en donde se hizo click para seleccionar un dato (cilindro|oblea) , evaluando el parametro de busqueda
 si el dato seleccionado comienza con la "O" significa que es un cilndro , de lo contrario es una oblea
 y segun que tipo de dato sea elimina el contario del localStorage , por ejemplo , si se selecciono un cilindro
 añade al localStorage el cilindro y elimina de este la oblea , y al mismo tiempo pinta de color gris el 
 elemento seleccionado.
 |
 ↓
 # dblClick
 a su vez el modulo clickCil también contiene otra función que es la que añade el listener para hacer doble
 click en el div , evaluando de la misma manera cual es el dato que el cliente solicita y envía el renderer
 correspondiente y cierra la ventana actual

# openOptionCompromisSheet() 
 Al presionar click sobre el boton "Carta de compromiso" se despliegan sobre este 2 opciones :
 
 -Imprimir 
 de las cuales si se presiona imprimir , evalua si hay un dato de cilindro cargado en el localStorage , 
 si no lo encuentra lanza una alerta la cual imprime que "No se ha seleccionado un cilindro" , pero si se encuentra
 en el localStorage , envía el renderer de "printCompromisSheet" y cierra la ventana

 -Nuevo
 si se presiona nuevo elimina el item del localStorage "idcilindersaved" y envía el renderer a "printCompromisSheet"
 para posteriormente cerrar la ventana.

# seeCilindersSaved
 Obtiene los primeros 300 cilindros cargados en el TDM actual , y los imprime en el HTML evaluando si los cilindros
 estaán terminados o no  , en caso de no estarlos , los pinta de color violeta

# seeCilinders.addEventListener("click")
 El listener del botón  "CILINDROS" de la parte superior de la ventana , oculta el contenedor de obleas y muestra
 el contenedor de cilndros.
 Carga el  nombre de la cuenta corriente el el strong de body content . 
 y llama a la funcioón "seeCilindersSaved"


----
-**[Volver al Indice General](../README.md)**  
-**[chargeCilinders](../chargeCilinders/README.md)** : Cargar un nuevo cilindro