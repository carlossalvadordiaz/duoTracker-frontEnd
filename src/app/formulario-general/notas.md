## PLANTEAMIENTO

-crear un servicio para usuarios
-Inyectar el servicio y el httpClient
-Inyectar el servicio en el ts de lformulario
 

-En el servicio, llamar a las peticiones necesarias para el registro:

(body: email, username, password, [repite password])
    -peticion POST 
            -POST http://localhost:3000/api/usuarios/registro
            Content-Type: application/json

            {
                "username": "Carmelo",
                "email": "Carmelo@gmail.com",
                "password": "Carmelo123"
            }
-en el onSubmit(), llamar a la petición utilizando como body los valores del formulario