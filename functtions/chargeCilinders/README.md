# chargeCilinders
La ventana cumple la funcion de cargar los datos del cliente como dni patenete localidad , etc
que estos datos serán almacenados en el localStorage para en la ventana siguiente ser utilizados

Al momento de darle enter al input de DNI , se busca el dni ingresado en el input , en la tabla de
"clients" de la base de datos , si encuentra el DNI solicitado , entonces autocompleta los campos 
con los datos encontrados . 
De lo contrario se deberan ingresar manualmente.

por ultimo al presionar la tecla "siguiente" , corrobora si existe o no el dni en la base de datos.
si existe el dni , actualiza los datos con los ingresados nuevamente.
De lo contrario inserta los datos en la tabla.

# Variabl globales

# userDataFounded = false 
Esta variable comienza en false debido a que va a ser utilizada para 
corroborar si existe o no el DNI . si se presiona enter en el campo DNI , y  este se encunetra
entonces  la variable se setea a <TRUE>  de lo contrario sigue en <FALSE>

# getData 
Contiene todos los inputs del html relevantes

## FUNCIONES PRINCIPALES

# startSearchCountry 
Un listener situado sobre el campo localidad el cual despliega el modulo para buscar localidades
el cual comienza limpiando el div de resultados . Luego corrobora si el contenido del input es 
mayor a 2 procede a hacer el metodo comparativo de busqueda con la consulta obtenida anteriormente.

Luego de aplicar el metodo comparativo con el valor del input y los resultados , formando un nuevo array
luego al array lo recorre en un bucle foreach para crear un div con la información para insertar los 
resultados en el div de resultados.

Luego al div de resultados se le agrega un listener el cual tiene la función de obtener el nombre y el codigo
postal del div seleccinado de los resultados . una vez seleccionado completa los campos de localidad y Cp

# getDataUser 
obtiene los datos del usuario de los inputs , a los datos los transforma a json y los inserta en el
localStorage . 

# enterFunction 
