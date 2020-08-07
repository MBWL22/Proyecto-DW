<?php 
include('../conexion_base.php');
session_start();
$query = "select per.primernombre pnombre,per.segundonombre snombre,per.primerapellido papellido,per.segundoapellido sapellido,
 per.direccion direccion , per.fechanacimiento fechanacimiento,
co.clientes_idclientes idclientes, co.usuario usuario, co.contrasenia contrasenia from CuentaOnline co
inner join clientes cl on cl.idclientes=co.clientes_idclientes
inner join personas per on per.idpersonas=cl.personas_idpersonas ";

$resultado = pg_query($conexion, $query) or die("Error en la Consulta SQL");

while ($fila=pg_fetch_array($resultado)) {
    if ($fila["usuario"]==$_POST["usuario"]
            && $fila["contrasenia"]==$_POST["password"]){
                //Usuario con credenciales correctas
                $_SESSION["usuario"] = $_POST["usuario"];
                $_SESSION["password"] = $_POST["password"];
                $_SESSION["idClientes"] = $fila["idclientes"];
                $_SESSION["pnombre"] = $fila["pnombre"];
                $_SESSION["snombre"] = $fila["snombre"];
                $_SESSION["papellido"] = $fila["papellido"];
                $_SESSION["sapellido"] = $fila["sapellido"];
                $_SESSION["direccion"] = $fila["direccion"];
                $_SESSION["fechaNacimiento"] = $fila["fechanacimiento"];
                echo '{"codigo":0,"mensaje":"Usuario logueado con exito"}';
                pg_close($conexion);
                exit();   
        }
    } 
    echo '{"codigo":1,"mensaje":"Credenciales invalidas"}';
    pg_close($conexion);

?>
