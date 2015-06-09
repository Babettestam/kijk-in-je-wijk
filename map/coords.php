<?php
/**
 * Created by JetBrains PhpStorm.
 * User: Cristiaan
 * Date: 11-3-13
 * Time: 15:58
 * To change this template use File | Settings | File Templates.
 */
require_once("include/config.php");
$mysqli = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_DATABASE);

if ($mysqli->connect_errno) {
    printf("DB connect failed: %s\n", $mysqli->connect_error);
    exit;
}



$query = "SELECT * from records";

$result = $mysqli->query($query);
//$result = mysql_query($query);


$fotos = array();

//loop the results from the query and add them to the players array
while ($row = $result->fetch_array(MYSQL_ASSOC)) {
    array_push($fotos, $row);
}

//free result set
$result->close();
//close connection
$mysqli->close();

//set the header to tell the client some json is coming its way
header("Content-Type: application/json");
echo json_encode($fotos);
exit;


?>