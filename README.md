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



## Ejecuta la app

```bash
# levantar para desarrollo
$ yarn run start

# levantar en desarrollo modo watch, pendiente de cambios actualización del servidor y los datos
$ yarn run start:dev

# levantar en modo produccion
$ yarn run start:prod
```

## Stack usado

* MongoDB
* Nest
