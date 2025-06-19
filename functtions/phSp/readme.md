phSp ->

está diseñada para cargar la información del usuario y del cilindro al momento de registrar una nueva prueba hidráulica


Datos del cliente : 
Al ingresar el DNI y presionar Enter, el sistema busca automáticamente si ese cliente ya existe en la base de datos.
    # Si lo encuentra, al guardrar, lo actualiza
    # en caso contrario inserta un nuevo registro

Datos del cilindro : 
Al comenzar a escribir el código de homologación, el sistema busca coincidencias en la base de datos.

    #Si encuentra un cilindro existente, autocompleta los campos técnicos: espesor, reglamentación, número de serie, etc. (ubicados en la parte inferior derecha).

    #Establece una variable global 
    True  : existe el cilindro 
    False : cilindro inexistente 

Espesores :
    #muestra las mediciones técnicas del cilindro: espesor de la ojiva, del fondo, entre otros.
    Cuando se selecciona la opción "Nuevo Cilindro"  los datos se autocompletan luego de ingresar el código de homologación 

    #El sistema utiliza ese código para obtener las especificaciones técnicas del cilindro necesarias para completar los campos de espesores.

Al guardar :
    #Si la variable global indica que el cilindro no existe, se muestra una alerta advirtiendo al usuario que el cilindro no fue encontrado y que continuar con el proceso podría causar errores. Se ofrece la opción de continuar de todos modos.