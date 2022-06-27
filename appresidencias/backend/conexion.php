<?php
    class Conexion extends PDO{
        private $hostBd = 'localhost';
        private $nombreBd = 'webservice';
        private $usuarioBd = 'root';
        private $passwordBD = '';
        public function __construct(){
            try{
                parent::__construct('mysql:host='.$this->hostBd . ';dbname='.$this->nombreBd.';charset=utf8',
                $this->usuarioBd,$this->passwordBD, 
                array(PDO:: ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
            }catch(PDOException $e){
                echo 'Error: '.$e->getMessage();
                exit;
            }
        }
    }

?>