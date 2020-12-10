## Planteamiento

-Crear un servicio para usuarios, partidas y juegos

-En los servicios poner las peticiones necesarias.


## Para mostrar una página u otra según esté logeado

crear en el servicio isLogged(): boolean (con el token)

ngif* isLooged(true) -> El nav muestra ver perfil

isLogged(false) -> el nav muestra login/iniciar sesión  [X]


## Opcion 1 crear componente perfil y separarlo del login. 
    - //Crear componente perfil
    - //en el routerlink del Nav, mostrar perfil o login según exista o no el token (llevarlo a una ruta u otra)
    - //Sacar el id del usuario a través del activatedRoute -> /perfil/:usuarioId -->  como muestro una ruta a ese Id (?) -> como lo hago variable?
    - //Quiero obtener la peticion getUserById del usuario logado -> hacer otra variable con el localstoraget setItem (??)

    -// getIdByToken --> sacarlo donde quiera obtener el ID