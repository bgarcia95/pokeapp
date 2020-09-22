# PokeApp

Desarrollo de aplicación móvil para prueba técnica Elanin.

# Requerimientos

> NOTA: Incluye: ✔️ No incluye: ❌

- Uso de la Pokéapi V2: [https://pokeapi.co/](https://pokeapi.co/) ✔️

- Uso de Firebase Auth para autenticación con Google o Facebook ✔️

- Uso de Firebase Realtime Database ✔️

- Cuando el usuario ingrese a la aplicación, deberá de tener disponibles todas las regiones de pokemon ✔️

- El usuario puede crear N equipos por cada región, el equipo solo puede contener los pokémon disponibles en esa región en específico, el usuario podrá elegir hasta 6 pokémon para su equipo y un mínimo de 3 pokémon ✔️

- El usuario debe de tener una pantalla en donde le salgan todos los equipos creados, con la opción de modificarlos o eliminarlos ✔️

- Para cada equipo se muestra la información básica, nombre, número, tipo, descripción del pokédex y la imagen (si hay disponible, si no, hay que tener una imagen de blankstate) de los pokémon de cada equipo ✔️

- Un usuario puede permitir que otro usuario copie su equipo mediante un link o token que el programador genere mediante un algún algoritmo especial, toda la lógica queda a disposición del programador, la única condición es que el link o token no sean tan largos (Que se puedan escribir fácilmente). (Punto extra) ❌

- La aplicación debe de tener una Font custom en toda la aplicación, es decir, no debe de tener la Font por defecto que aplica Android Studio o X Code. (Punto extra) ✔️

- La aplicación debe de tener incorporada el reporte de crash de Crashlytics
  [https://try.crashlytics.com/](https://try.crashlytics.com/) para un reporte en vivo en dado caso se produzcan excepciones
  en la aplicación. (Punto extra) ✔️

## Vista Previa

![gif preview](https://res.cloudinary.com/bgarcia95/image/upload/v1600754782/pokeapp-demo_vfvuzy.gif)

## Tecnologías Principales Utilizadas

- [React Native](https://github.com/facebook/react-native)

> Framework para desarrollo de aplicaciones web.

- [Redux](http://redux.js.org/)

> Redux es un contenedor predecible del estado de aplicaciones JavaScript.

- [React Navigation v5](https://reactnavigation.org/docs/getting-started)

> React Navigation se compone de algunas utilidades principales y los navegadores las utilizan para crear la estructura de navegación en su aplicación.

## Corriendo el proyecto

- Clona este proyecto

```
git clone https://github.com/bgarcia95/pokeapp.git
```

- Instala las dependencias

```
npm install
```

En caso de ser necesario seguir las lineas de configuración para desarrollo en React Native haciendo clic en este enlace: [https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)

### Pasos Para Android

- Cargar un dispositivo virtual de Android [(a través de _Android Studio_ por ejemplo)](https://developer.android.com/studio/run/managing-avds.html#viewing)

- Luego, escribir la siguiente línea de código dentro de la carpeta principal de nuestro proyecto:

```
react-native run-android
```

## ¡Listo! 😎
