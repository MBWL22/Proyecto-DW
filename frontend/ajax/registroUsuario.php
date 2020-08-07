<?php 
include('../conexion_base.php');
session_start();

$query = "select empleados_idempleados, usuario, contrasenia from CuentaOnlineEmpleado ";

$resultado = pg_query($conexion, $query) or die("Error en la Consulta SQL");

while ($fila=pg_fetch_array($resultado)) {
    if ($fila["usuario"]==$_POST["usuario"]
            && $fila["contrasenia"]==$_POST["password"]){
                //Usuario con credenciales correctas
                $_SESSION["usuario"] = $_POST["usuario"];
                $_SESSION["password"] = $_POST["password"];
                $_SESSION["idEmpleados"] = $fila["empleados_idempleados"];
                echo '{"codigo":0,"mensaje":"Usuario logueado con exito"}';
                pg_close($conexion);
                exit();   
        }
    } 
    echo '{"codigo":1,"mensaje":"Credenciales invalidas"}';
    pg_close($conexion);

?>