<?php 
//Script para guardar un registro en el archivo data/productions.json y en data/productions.js;
//Se recibe un objeto JSON con los datos de la producción y se guarda en el archivo productions.json

//Se recibe el objeto JSON con los datos de la producción
// $production = json_decode(file_get_contents('php://input'));

//Se obtiene el contenido del archivo productions.json
// $productions = json_decode(file_get_contents('../data/productions.json'));

//Se agrega la producción al arreglo de producciones
// array_push($productions, $production);

//Se guarda el arreglo de producciones en el archivo productions.json

// file_put_contents('../data/productions.json', json_encode($productions, JSON_PRETTY_PRINT));

// //Se guarda el arreglo de producciones en el archivo productions.js
// file_put_contents('../data/productions.js', 'var productions = ' . json_encode($productions) . ';');


//FUNCIONA...............................................
// Script para guardar películas en archivos JSON
// header('Content-Type: application/json');

// $data = json_decode(file_get_contents('php://input'));

// // Validación básica de datos (¡ajusta según tus necesidades!)
// if (empty($data->title) || empty($data->description) || empty($data->publication) || empty($data->synopsis)) {
//     echo json_encode(['success' => false, 'error' => 'Datos incompletos']);
//     exit;
// }

// $films = json_decode(file_get_contents('../data/productions.json'), true); // true para obtener un array asociativo
// $films[] = $data;

// if (file_put_contents('../data/productions.json', json_encode($films, JSON_PRETTY_PRINT))) {
//     echo json_encode(['success' => true]);
// } else {
//     echo json_encode(['success' => false, 'error' => 'Error al guardar']);
// }
//FUNCIONA...............................................


//COMPROBACIÓN DE QUE NO HAY OTRO REGISTRO CON EL MISMO TÍTULO ************
// Script para guardar o actualizar películas en archivos JSON
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'));
$message = '';

// Validación básica de datos (¡ajusta según tus necesidades!)
if (empty($data->title) || empty($data->description) || empty($data->publication) || empty($data->synopsis)) {
    echo json_encode(['success' => false, 'error' => 'Datos incompletos']);
    exit;
}

$films = json_decode(file_get_contents('../data/productions.json'), true); // Read as array

// Verificar si el título ya existe
$existingFilmIndex = array_search($data->title, array_column($films, 'title'));

if ($existingFilmIndex !== false) {
    // Actualizar los datos de la película existente
    $films[$existingFilmIndex] = $data; 
    $message = 'Película actualizada correctamente';
} else {
    // Agregar la nueva película al array
    $films[] = $data;
    $message = 'Película agregada correctamente';
}

if (file_put_contents('../data/productions.json', json_encode($films, JSON_PRETTY_PRINT))) {
    echo json_encode(['success' => true, 'message' => $message]);
} else {
    echo json_encode(['success' => false, 'error' => 'Error al guardar/actualizar']);
}

