## Modificar Cuenta Corriente (modifyCtaCte)

### descripción 
Permite la gestión de la cuenta corriente seleccionada , lleva el registr histrico de todos las deudas , pagos y remitos realizados a lo largo del tiempo .


### Funciones generales
- ver el estado del saldo total de la cuenta corriente.
- crear un nuevo remito para la cuenta seleccionada.
- Buscar remitos creados previamente en base a su numero de interno.
- imprimir el historial de remitos , pagos y debitos de toda la cuenta seleccionada.


### Funciones disponibles solo con la clave de administrador
- Imputar un pago (puede ser un pago positivo como negativo , el sistema se encarga de organizarlo ).
- Modificar el valor de uno o varios registros previamente cargados .
- Corregir el contenido de los remitos.



### Validaciones automaticas del sistema
La función dentro de '/functtions/modifyCtaCte/corroborateAdmin.js' , evalua si el usuario es administrador , evalua
mediante el LocalStorage el registro con la clave "userAdmin" , siendo este el valor ingresado por el usuario .
Compara userAdmin con los datos del administrador almacenados en adminInfo.js .

En caso de que el modulo retorne True , significa que es administrador , por consecuente hace visible el botón de 
"Imputar pago" y también muestra la el botón de "modificación" de remitos.