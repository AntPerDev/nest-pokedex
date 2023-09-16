<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


## Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar

```bash
$ yarn install
```

3. Tener nest-cli instalado
```bash
npm i -g @nestjs/cli
```
4. Levantar la Base de Datos. Es necesario tener docker-desktop instalado y funcionando
```bash
docker-compose up -d
```

5. Duplicar el archivo ```.env.template``` y renombrar la copia como ```.env```

6. Llenar las variables de entorno definidas en el ```.env```

7. Ejecutar la aplicación en dev:
```bash
$ yarn start:dev
```

8. Reconstruir DB con la semilla, solo en desarrollo
```
http://localhost:3000/api/v2/seed
```



## Ejecuta la app

```bash
# levantar para desarrollo
$ yarn run start

# levantar en desarrollo modo watch, pendiente de cambios actualización del servidor y los datos
$ yarn run start:dev

# levantar en modo produccion
$ yarn run start:prod
```

# Production Build
1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno de producción
3. Crear la nueva imagen
```bash
docker-compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```


## Stack usado

* MongoDB
* Nest


# Notas
Heroku redeploy sin cambios:
```
git commit --allow-empty -m "Tigger Heroku deploy"
git push heroku <master|main>
```