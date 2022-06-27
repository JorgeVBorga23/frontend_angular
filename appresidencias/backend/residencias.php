<?php
require_once "residencia.php";
$bd = new Conexion();
switch($_SERVER["REQUEST_METHOD"]){
    case "GET": 
        if(isset($_GET["id"])){
            Residencia::obtenerResidencia($_GET["id"], $bd);
        }else{
            Residencia::obtenerResidencias($bd);
        }
        break;

    case "POST": 
        $usr = json_decode(file_get_contents('php://input'));
        Residencia::crearResidencia($usr->nombre, $usr->duracion, 
        $usr->lugar, $usr->descripcion, $bd);
        break;    

    case "DELETE": 
        if(isset($_GET["id"])){
            Residencia::borrarResidencia($_GET["id"], $bd);
        }else{
            echo json_encode("Hubo un error tratando de recuperar el id de la residencia");
        }
        break;

    case "PUT": 
        $usra = json_decode(file_get_contents('php://input'));
        Residencia::actualizarResidencia($usra->id,$usra->nombre, $usra->duracion, 
        $usra->lugar, $usra->descripcion, $bd);
        break;   
}
