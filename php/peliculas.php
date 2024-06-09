<?php
header('Content-Type: application/json');
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

// try {
 
//     $productionsJson = file_get_contents('../data/productions.json'); 

//     if ($productionsJson === false) {
//         throw new Exception("No se pudo leer el archivo productions.json");
//     }

//     $productions = json_decode($productionsJson, true);

//     if ($productions === null) {
//         throw new Exception("Error al decodificar el JSON: " . json_last_error_msg());
//     }

//     if (empty($productions)) {
//         throw new Exception("No se encontraron producciones en el archivo.");
//     }

//     echo json_encode($productions, JSON_PRETTY_PRINT);
// } catch (Exception $e) {
//     http_response_code(500); 
//     $error_message = $e->getMessage();
//     error_log($error_message); // Registra el error en el log del servidor

//     echo json_encode(['error' => $error_message]); // Devuelve el error al cliente
// }

// Path: php/peliculas.php

// try{
//     $productionsJson =file_get_contents('../data/productions.json');
//     $productions = json_decode($productionsJson, true);

//     if (empty($productions)) {
//         throw new Exception("No se encontraron producciones en el archivo.");
//     }
  

//     echo json_encode($productions, JSON_PRETTY_PRINT);

// }catch(Exception $e){
//     echo json_encode(['error' => $e->getMessage()]);
// }



$productionsJson = file_get_contents('../data/productions.json');
$productions = json_decode($productionsJson, true);

if (isset($_GET['title'])) {
    $title = $_GET['title'];
    foreach ($productions as $production) {
        if ($production['title'] == $title) {
            echo json_encode($production, JSON_PRETTY_PRINT);
            exit;
        }
    }
    // Si no se encuentra la película, devolver un error
    http_response_code(404);
    echo json_encode(['error' => 'Película no encontrada'], JSON_PRETTY_PRINT);
} else {
    echo json_encode($productions, JSON_PRETTY_PRINT);
}
?>

