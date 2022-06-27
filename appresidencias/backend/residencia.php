<?php
include_once "conexion.php";
class Residencia{
    //funciones con la base de datos (CRUD)
    public static function obtenerResidencias($bd){
        $sql= $bd->prepare("SELECT * FROM residencias ");
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll());
        exit;
    }
    public static function obtenerResidencia($id, $bd){
        $sql= $bd->prepare("SELECT * FROM residencias where idResidencia = :num ");
        $sql->bindParam(":num", $id);
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll()[0]);
        exit;
    }
    public static function actualizarResidencia($id,$nombre, $duracion, $lugar, $descripcion, $bd){
        $sql = "UPDATE residencias 
        SET nombreResidencia=:nombre,
        duracionResidencia=:duracion, 
        lugarResidencia=:lugar, 
        descripcionResidencia=:descripcion 
        WHERE idResidencia=:id";
        $stmt = $bd->prepare($sql);
        $stmt->bindValue(':id', $id);
        $stmt->bindValue(':nombre', $nombre);
        $stmt->bindValue(':duracion', $duracion);
        $stmt->bindValue(':lugar', $lugar);
        $stmt->bindValue(':descripcion', $descripcion);
        $stmt->execute();
        header("HTTP/1.1 200 OK");
        echo json_encode("residencia $id actualizada correctamente!");
        exit;
    }
    public static function borrarResidencia($id, $bd){
        $sql = "DELETE FROM residencias WHERE idResidencia=:id";
        $stmt = $bd->prepare($sql);
        $stmt->bindValue(':id', $id);
        $stmt->execute();
        header("HTTP/1.1 200 OK");
        echo json_encode("residencia $id eliminado correctamente!");
        exit;

    }
    public static function crearResidencia($nombre, $duracion, $lugar, $descripcion, $bd){
        $sql = "INSERT INTO residencias (nombreResidencia, 
        duracionResidencia, lugarResidencia, descripcionResidencia) 
        VALUES (:nombre, :duracion, :lugar, :descripcion)";
        $stmt = $bd->prepare($sql);
        $stmt->bindValue(':nombre', $nombre);
        $stmt->bindValue(':duracion', $duracion);
        $stmt->bindValue(':lugar', $lugar);
        $stmt->bindValue(':descripcion', $descripcion);
        $stmt->execute();
        if($stmt){
            header("HTTP/1.1 200 OK");
            echo json_encode("Residencia agregada correctamente!");
            exit;
        }
    }
}
?>