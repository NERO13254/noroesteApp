# index.js : Modulo principal

Este modulo controla el proceso de vida de la aplicación , al igual que sus ventanas y sus caracteristicas

# #############################  DEPENDENCIAS ############################## #

# ADMIN INFO
const {adminInfo}       = require("./adminInfo");
Es el modulo que contiene el nombre y contraseña del administrador , los cuales vienen dentro de 
un array [nombre , clave]

# PRINT RENDERERS
const  printRenderers   = require("./functtions/indexRenderer/renderer");
Es el encargado de renderizar las ventanas secundarias , fuera del renderizado principal , el modulo
contiene la mayoría de listeners para abrir ventanas.
# DB , GETDB
const getDb             = require("./db/dbRed");
const db                = getDb.getDb(__dirname);

getDb se encargan de acceder a la ruta donde se encuentra la base de datos y lee el archivo db.db para 
hacer la conección 

db llama a la función encargada de ejecutar la conección a db y recibe  __dirname , para crear
la ruta relativa y crear la ruta a db correctamente 

# #############################  FUNCIONES PRINCIPALES ############################## #

# createWindow( nombreDeVariableQueConteineLaVentana  , rutaDeLaVistaHTML ){}
Recibe una variable que contendrá la ventana creada , en la cual se establece su Ancho y largo , 
integración con node , se desactiva contextInsolation , se controla el menú por defecto 

y recibe otra variable que será la vista que la ventana cargará , donde se establece la ruta
del elemento HTML de la ventana por ejemplo "views/loginIndex.html"
Luego crea el menú del "Click derecho" , el cual tiene la función de copiar y pegar

# app.on("ready")=>{}
146 - Cuando la app esté correctamente cargada , crea la ventana principal usando la función "createWindow" 
    con la vista del index , el cual carga el login de usuario 

148- Luego carga los listeners del ipcMain para cargar las ventanas secundarias de la app con la
    dependencia "printRenderers()"

185 - Al recibir el ipc "loginedUser" , significa que el usuario se logueó , por ende , se corroboran 
    los datos ingresados por el usuario y los datos del administrador del modulo "adminInfo" , y si
    los datos son correctos se setea el menú de administrador con más botones y permismos adicionales
    a lo largo de la aplicación .
    De lo contrario se setea el menú de usuario con restricciones 

296- Se implementa el menú correspondiente y se añade a la ventana 

-**[Volver Al Indice](../../README.md) 