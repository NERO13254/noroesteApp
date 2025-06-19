# TDM 
Los Talleres de Montaje (TDM) son los encargados por donde van a ser procesados los cilindros
en otra seccion , cada TDM tiene un codigo de PEC úncio el cual es utilizado para asignarlo 
a cada cilindro procesado , de esta forma el ENERGAS puede saber que taller de montaje habilitó
el cilindro.
Si el taller fue dado de baja y se utiliza su codigo PEC para informar un cilindro a ENERGAS este
será rechazado automaticamente.

## seeTdmSaved.js : script

# bodyContent :
 Añade un listener tipo "click" que evalua si se seleccionó un elemento de la lista , en caso de 
 ser seleccinado , se envía el id del TDM al localStorage , envía el renderer "modifyTdm" para 
 abrir la ventana de modificación y cierra la ventana 

# printGuide :
 Añade la guía de datos al menú de los TDM (dni , cuit , nombre, pec , etc . . .)
 una vez añadida al HTML , se crea un boton "Nuevo" y se agregaa la lista de guias

# guideContent : 
 Al presionar click sobre el boton "Nuevo" de la guía , envía el renderer al proceso principal para
 abrir la ventana de modificación de TDM y cierra la ventana actual.

# backBtn :
 Es el boton para volver atrás
 -**[BackBtn](../backBtn.md)**
# chargeTdm : 
 Obtiene todos los TDM de la base de datos y los imprime en el html

# startSearch : 
 Esta funcion proviene del Input del html "searchInput" , este input contiene un listener el cual 
 al  levantar una tecla despliega la función.
 La función obtiene todos los TDM de la base de datos y obtiene el valor que se está buscando 
 para mediante un map , filtre todos los TDM que coincida su nombre con el que se está buscando
 y los coincidientes los añade al HTML de resultados 

-----
**[Volver al Indice General](../../README.md)** 
**[newTdm](../newTdm/README.md)** :  Nuevo TDM
**[BackBtn](../backBtn.md)**: Volver atras