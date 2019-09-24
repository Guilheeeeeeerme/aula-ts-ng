<?php
require('../model/database.php');
require('../model/product_db.php');
require('../model/category_db.php');

header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

$category_id = filter_input(INPUT_POST, 'categoryID', FILTER_VALIDATE_INT);
$code = filter_input(INPUT_POST, 'productCode');
$name = filter_input(INPUT_POST, 'productName');
$price = filter_input(INPUT_POST, 'listPrice', FILTER_VALIDATE_FLOAT);

// checando se foi post
if ($code != NULL) {

    echo '$category_id '. $category_id;
    echo '$code '. $code;
    echo '$name '. $name;
    echo '$price '. $price;

    // echo json_encode(
    //     add_product($category_id, $code, $name, $price)
    // );

} else {

    $product_id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
    $category_id = filter_input(INPUT_GET, 'category_id', FILTER_VALIDATE_INT);


    // SE NÃO PASSEI ID, VAMOS BUSCAR TUDO 
    if ($product_id != NULL) {
        $product = get_product($product_id);

        $productJSON = [];

        $productJSON['productID'] = $product['productID'];
        $productJSON['categoryID'] = $product['categoryID'];
        $productJSON['productCode'] = $product['productCode'];
        $productJSON['productName'] = $product['productName'];
        $productJSON['listPrice'] = $product['listPrice'];

        echo json_encode($productJSON);
    } else {
        
        if ($category_id != NULL) {
            $products = get_products_by_category($category_id);
        } else {
            $products = get_products();
        }

        $productJSON = [];

        foreach($products as $product) {
            $data = array();
            
            $data['productID'] = $product['productID'];
            $data['categoryID'] = $product['categoryID'];
            $data['productCode'] = $product['productCode'];
            $data['productName'] = $product['productName'];
            $data['listPrice'] = $product['listPrice'];
        
            array_push($productJSON, $data);
        }
        
        echo json_encode($productJSON);
    }
}

?>