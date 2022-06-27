<?php
include_once "conexion.php";
class Usuario{
     
    //funciones con la base de datos (CRUD)
    public static function obtenerUsuarios($bd){
        $sql= $bd->prepare("SELECT * FROM usuarios ");
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll());
        exit;
    }
    public static function obtenerUsuario($numControl, $bd){
        $sql= $bd->prepare("SELECT * FROM usuarios where numeroControl = :num ");
        $sql->bindParam(":num", $numControl);
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        header("HTTP/1.1 200 OK");
        echo json_encode($sql->fetchAll()[0]);
        exit;
    }
    public static function actualizarUsuario($num, $pass, $nombre, $creditosC, $creditos, $servicio, $bd){
        $sql = "UPDATE usuarios 
        SET password=:password,
         nombreC=:nombreC, 
        creditoscomple=:creditoscomple, 
        serviciosocial=:serviciosocial, 
        porcentcreditos=:porcentcreditos WHERE numeroControl=:numControl";
        $stmt = $bd->prepare($sql);
        $stmt->bindValue(':numControl', $num);
        $stmt->bindValue(':password', md5($pass));
        $stmt->bindValue(':nombreC', $nombre);
        $stmt->bindValue(':creditoscomple', $creditosC);
        $stmt->bindValue(':serviciosocial', $servicio);
        $stmt->bindValue(':porcentcreditos', $creditos,);
        $stmt->execute();
        header("HTTP/1.1 200 OK");
        echo json_encode("usuario $num actualizado correctamente!");
        exit;
    }
    public static function borrarUsuario($numControl, $bd){
        $sql = "DELETE FROM usuarios WHERE numeroControl=:id";
        $stmt = $bd->prepare($sql);
        $stmt->bindValue(':id', $numControl);
        $stmt->execute();
        header("HTTP/1.1 200 OK");
        echo json_encode("usuario $numControl eliminado correctamente!");
        exit;

    }
    public static function crearUsuario($num, $pass, $nombre, $creditosC, $creditos, $servicio, $bd){
        $sql = "INSERT INTO usuarios (numeroControl, 
        password, nombreC, creditoscomple, serviciosocial, porcentcreditos) 
        VALUES (:num, :password, :nombreC, 
        :creditoscomple, :serviciosocial, :porcentcreditos)";
        $stmt = $bd->prepare($sql);
        $stmt->bindValue(':num', $num);
        //contraseña encriptada
        $stmt->bindValue(':password', md5($pass));
        $stmt->bindValue(':nombreC', $nombre);
        $stmt->bindValue(':creditoscomple', $creditosC);
        $stmt->bindValue(':serviciosocial', $servicio);
        $stmt->bindValue(':porcentcreditos', $creditos);
        $stmt->execute();
        if($stmt){
            header("HTTP/1.1 200 OK");
            echo json_encode("Usuario agregado!, numero de control: $num");
            exit;
        }
    }
    //logeo 
    public static function agregarProyecto($numControl, $idResidencia, $bd){
        $sql = "UPDATE usuarios 
        SET idResidencia = :idResidencia
        where numeroControl = :numControl";
        $stmt = $bd->prepare($sql);
        $stmt->bindValue(':numControl', $numControl);
        $stmt->bindValue(':idResidencia', $idResidencia);
        $stmt->execute();
        if($stmt){
          header("HTTP/1.1 200 OK");
        echo json_encode(["mensaje"=>"Proyecto $idResidencia solicitado para alumno $numControl !"]);
        exit;  
        }else{
            header("HTTP/1.1 400");
            echo json_encode(["mensaje"=>"No se pudo solicitar el proyecto"]);
            exit; 
        }
    }


    public static function obtenerProyectoUsuario($numControl, $bd){
        $sql= $bd->prepare("SELECT * FROM residencias
        INNER JOIN usuarios on usuarios.idResidencia = residencias.idResidencia
        where numeroControl = :numcontrol");
        $sql->bindParam(":numcontrol", $numControl);
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        if($sql->rowCount() > 0){
            header("HTTP/1.1 200 OK");
            echo json_encode($sql->fetchAll()[0]);
        exit;
        }else{

            echo json_encode("");
        }
    }
    public static function verificarLogin($numControl, $pass, $bd){
        $sql= $bd->prepare("SELECT * FROM usuarios where numeroControl = :num and password = :pass ");
        $encriptada = md5($pass);
        $sql->bindParam(":num", $numControl);
        $sql->bindParam(":pass", $encriptada);
        $sql->execute();
        $sql->setFetchMode(PDO::FETCH_ASSOC);
        if($sql->rowCount() > 0){
            header("HTTP/1.1 200 OK");
            echo json_encode($numControl);
        exit;
        }else{

            echo json_encode("");
        }
    }
}
?>