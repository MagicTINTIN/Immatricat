<?php

function dbConnect() : PDO
{
    try
    {
        $dbtoconnect = new PDO("mysql:host=localhost;dbname=Immatricat;charset=utf8", 'usr', 'passwordtochangewhichisnot1234');
    }
    catch (Exception $e)
    {
            die('Erreur : ' . $e->getMessage());
    }
    return $dbtoconnect;
}
?>