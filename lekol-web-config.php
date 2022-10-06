<?php
/*
+ Ce fichier sera toujours loger dans le serveur ( C:/wamp/www ou /var/html/ )

+ Ce fichier contient la configuration serveur de votre ecole

+ Ne jamais supprimer ce fichier

+ Ne jamais modifier ce fichier sans l'assistance de l'administrateur

+ Copyright lekol@2022

*/

/**
 * Configuration des headers
*/


header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Methods: GET , OPTIONS");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

/**
 * Parametres de connexion a la base de donnee
*/


/**
 * l'adresse distant du serveur
*/
$SERVER = "192.168.1.95";

/**
 *  utilisateur de base de donnee
*/

$USER   = "alexis";

/**
 *  Mot de passe de l'utilisateur
*/

$PWD    = "Black1234@";

/**
 *  base de donnee a utiliser
 */
 
$BASE   = "lekol_db_test";

/*
 * Connexion params
 */
 
$params = [
   "SERVER"   => $SERVER,  
   "USER"     => $USER,      
   "PASSWORD" => $PWD,   
   "DBNAME"   => $BASE    
];

/**
 * Retour en JSON vers l'aaplication
 */

echo json_encode($params);

