## Funcionalidad principal 
La ventana permite registrar y gestionar información importante sobre las obleas realizadas. Entre los datos registrados se incluyen:

- **Taller**: Nombre del taller encargado de realizar el trámite.
- **Patente**: Identificación del vehículo involucrado.
- **Vehículo**: Modelo del vehículo relacionado con la oblea.
- **Estado del Pago**: Indicación de si el cliente abonó algo al realizar el trámite.
- **Fecha de Creación**: Los registros se catalogan automáticamente por la fecha en que se generan, permitiendo un seguimiento cronológico.

# Funciones Principales

1. **Crear una nueva oblea**  
   Permite agregar un nuevo registro con toda la información necesaria sobre la oblea realizada.

2. **Modificar una oblea existente**  
   Ofrece la posibilidad de editar los detalles de un registro previamente creado.

3. **Eliminar una oblea**  
   Permite borrar un registro en caso de que sea necesario.

4. **Añadir obleas de días anteriores**  
   Posibilidad de registrar obleas con fechas pasadas, manteniendo la consistencia en los registros históricos.

## pendingWafers 
es el módulo principal que orquesta el funcionamiento de los demás módulos y controla los eventos del DOM relacionados con la sección de las obleas pendientes.

--**Recolección de Inputs**--
Al iniciar, el módulo selecciona los campos HTML correspondientes a DIA/MES/AÑO. Esto se realiza mediante selectores del DOM "document.getElementById"

Inserción del Módulo BackBtn:
Una vez que la ventana ha cargado correctamente, el módulo BackBtn se inicializa e inserta en la interfaz para permitir al usuario volver a la pantalla anterior. Este módulo se importa y se instancia desde un archivo independiente.

--**Definición de la Fecha Actual :**--
Se utiliza el objeto Date de JavaScript para obtener la fecha actual. La fecha generada se formatea y se inserta en los campos de DIA/MES/AÑO recolectados previamente.

--**Carga de las Obleas del Día :**--
El módulo llama a loadDayliWafers, que interactúa con la base de datos para obtener los registros de las obleas según la fecha proporcionada.

Entrada: Fecha actual o seleccionada.
Salida: Lista de obleas que se imprime dinámicamente en el HTML segun la fecha proporcionada.

--**Evento "buscar" sobre la fecha**--
se obtiene el elemento "startSearch" del DOM , mediante document.getEelementById , y a su vez se agrega un 
addEventListener de tipo "click" que al activarse , se obtienen todos los inputs que estén dentro del div con la clase llamada ".dateContent" que contiene los inputs de 'DIA/MES/AÑO'.

Luego obtiene el contenedor de "errorDateContent" del DOM , es el encargado de imprimi un posible error , como por ejemplo que los datos ingresados en los inputs de la fecha sean incorrectos (vacío o no numerico). 

Mediante un bucle forEach recorre los inputs de "dateContent" y evalua que los datos que contienen sean correctos.
en caso de ser incorrectos , imrpime en el contenedor de "errorDateContent" un elemento strong que contiene 
"El campo ${date.name} es incorrecto" donde date.name reprecenta el nombre del elemento incorrecto.
y porr ultimo setea la variable "evaluateError" en false.

"evaluateError" es una variable que se establece a true o flase , y a base de esta , se evalua que los datos de la fecha no contengan errores , en caso de que la variable sea true :

procede a cargarse el modulo **loadDayliWafers** (interactua con db y carga las obleas con fecha especificada) que recibe como parametro la fecha ingresada por el usuario que previmanete fue evaluada. 


--**Evento click sobre "+" para agregar una nueva oblea a la tabla**--
captura el elemento "#addRowToListWafer" del DOM y agrega un  listener "click" que despliega el modulo  
**addNewWafer**


--**Modulo addNewWafer** --
Recibe como parametro una fecha .  Es el encargado de insertar la oblea a DB , y al mismo tiempo inserta la oblea en el HTML con su numero de Id correlativo

--**Al presionar el boton  de "eliminar" de la oblea** --
Cada oblea de la lista cuneta con un boton de eliminar representado  por un tacho de basura . 
El cual al hacer click despliega el modulo : 

**deleteWafer**
Recibe el id de la oblea que se quiere eliminar y el elemento div que contiene todos los datos de la oblea .
este modulo elimina el div del DOM y posteriormente elimina el elemento de la  base de datos en base a su ID.


--**al presinar "buscar" en domionio**--
obtiene el div del DOM "resultsOfSearch" que es utilizado para almacenar todos los resultados de busqueda.
luego obtiene el input "searchContent" al cual se le añade un listener de tipo "keyUp" . 
luego almacena el valor del input en una variable denominada "userData" , los datos  se almacena mediante "e.target"
y evalua si "userData" es mayo o igual a 2 . Si es mayor o igual hace visible el div de los resultados de busqueda ""resultsOfSearch"" y  lanza el modulo :
**searchWaferForDomain**
filtra todas las obleas de la lista visibles en el HTML y las inserta en el div de reultados

------

**[Volver al Indice General](../../README.md)** 