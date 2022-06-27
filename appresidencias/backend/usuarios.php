<?php
require_once "usuario.php";

$bd = new Conexion();
switch ($_SERVER["REQUEST_METHOD"]) {
    case "GET":
        //obtener un usuario
        if (isset($_GET["numeroControl"])) {
            Usuario::obtenerUsuario($_GET["numeroControl"], $bd);
        } else {
            //obtener todos los usuarios
            Usuario::obtenerUsuarios($bd);
        }
        break;
    case "POST":
        //buscar proyecto
        if (isset($_GET["buscarProyecto"])) {
            $proy2 = json_decode(file_get_contents('php://input'));
            Usuario::obtenerProyectoUsuario($proy2->numeroControl, $bd);
        }
        //agregar un proyecto
        if (isset($_GET["solicitar"])) {
            $proy = json_decode(file_get_contents('php://input'));
            Usuario::agregarProyecto($proy->numeroControl, $proy->idResidencia, $bd);
        }
        //logearse
        if (isset($_GET["login"])) {
            $datos = json_decode(file_get_contents('php://input'));
            Usuario::verificarLogin($datos->numeroControl, $datos->pass, $bd);
        } else {

            $usr = json_decode(file_get_contents('php://input'));
            Usuario::crearUsuario(
                $usr->numeroControl,
                $usr->pass,
                $usr->nombre,
                $usr->creditosC,
                $usr->creditos,
                $usr->servicio,
                $bd
            );
        }
        break;
    case "DELETE":
        if (isset($_GET["numeroControl"])) {
            Usuario::borrarUsuario($_GET["numeroControl"], $bd);
        } else {
            echo json_encode("Hubo un error tratando de recuperar el id del usuario");
        }
        break;

    case "PUT":
        $usra = json_decode(file_get_contents('php://input'));
        Usuario::actualizarUsuario(
            $usra->numeroControl,
            $usra->pass,
            $usra->nombre,
            $usra->creditosC,
            $usra->creditos,
            $usra->servicio,
            $bd
        );
        break;
}
