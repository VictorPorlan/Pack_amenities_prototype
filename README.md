# Pack_amenities_prototype

## Explicación

Esta aplicación es una API hecha con express y mongoose en la cual debemos aplicar una lógica de empresa a los objetos de una base de datos mongodb y realizar los casos test necesarios para comprobar su funcionamiento.

## Lógica de empresa

Hay 3 tipos diferentes de Packs: 
> Standard (No tiene nada especial)
> Basic (Tienen un descuento de 1 euro al comprarlos), 
> Premium (Son 50 eurtos más caros al comprarlos).

Hay 3 tipos diferentes de Items:
> Normal (No tiene nada especial, su calidad baja en 1 al usarlo)
> Indestructible (Su calidad no baja al usarlo)
> Consumible (Su calidad baja a 0 al usarlo)

Primero de todo, para poder usar algo de un pack ha de primero haber sido comprado, y luego se ha de abrir (usando los endpoints abajo mencionados).
Al comprar un pack el precio de los items se modifica al momento basandose en la demanda del objeto. La demanda representa el porcentaje de aumento del precio, un 100 de demanda es un 100% de aumento, un 50 es un 50% etc. El precio general del pack tambien se vuelve a recalcular basándose en la suma de los items + la tasa añadida o eliminada dependiendo del tipo de pack.


## Iniciando el proyecto

Al clonar el proyecto basta con ejecutar los comandos abajo indicados para instalar todas las dependencias necesarias.

```
npm i
```

## Arrancamos la aplicación

Si queremos iniciar la API ejecutamos el comando de abajo. No será necesario configurar nada ya que por comodidad y que sea más práctico las urls están puestas a mano en el proyecto.

```
npm run start
```

## Testing

El comando para ejecutar los tests es el siguiente.

```
npm run test
```

## Endpoints

Los enpoints para los packs son:

Encuentra 1 pack
>/findOne/(nombre)

Encuentra todos los packs
>/allPacks

Elimina en base al ID
>/delete/(id)

Crea Packs (solo items que ya existen)
>/create 

Comprar pack
>/buy/(nombre)

Abrir pack
>/open/(nombre)

Usar todos los items de un pack
>/useItems/(nombre)

Usar un item de un pack
>/useItem/(nombre)/(numero)

Los endpoints de los items son (Estos endpoints NO SE DEBERIAN USAR, la lógica no está pensada para que los items se usen fuera de los packs.):

Encuentra 1 item
>/findOne/(nombre)

Encuentra todos los items
>/allItems

Elimina en base al ID
>/delete/(id)

Crea un item
>/create

Usa un item
>/use/(nombre) 

Calcula el precio de un Item
>/calcPrice/:nombre

## Ejemplos cURL

Todos los packs:
```
curl --location --request GET 'localhost:3000/packs/allPacks'
```

Pack por nombre:
```
curl --location --request GET 'localhost:3000/packs/findOne/Pack animales'
```

Borrar pack por ID:
```
curl --location --request DELETE 'localhost:3000/packs/delete/61afc35457387547a0c0f6d1'
```

Crear pack:
```
curl --location --request POST 'localhost:3000/packs/create' \
--header 'Content-Type: application/json' \
--data-raw '{
        "nombre": "Pack create",
        "precio": 50,
        "calidad": "premium",
        "vendido": false,
        "abierto": false,
        "items": [
            "61dab49161dde91c2c30a102",
            "61dab49161dde91c2c30a103",
            "61dab49161dde91c2c30a104"
        ]
    }'
```

Comprar pack:
```
curl --location --request GET 'localhost:3000/packs/buy/Pack Squanchy Style'
```

Abrir pack:
```
curl --location --request GET 'localhost:3000/packs/open/Pack Squanchy Style'
```

Usar todos los items del pack:

```
curl --location --request GET 'localhost:3000/packs/useItems/Pack Squanchy Style'
```

Usar un item del pack:

```
curl --location --request GET 'localhost:3000/packs/useItem/Pack Squanchy Style/1'
```