<?php
$allArray = json_decode(file_get_contents('php://input'), true);
//$_POST = json_decode(file_get_contents('php://input'), true); //if we use CI;
if($allArray['action'] == 'add'){
    $dataArray = $allArray['body'];
    foreach ($dataArray as $data) {
        if($data['img']!=''){
            $image_parts = explode(";base64,", $data['img']);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $file = 'uploads/' . uniqid() . '.'.$image_type;
            file_put_contents($file, $image_base64);
        }
    }
    echo json_encode(['status'=>true]);
}

if($allArray['action'] == 'edit'){
    $dataArray = $allArray['body'];
    $allFileNames = [];
    foreach ($dataArray as $data) {
        if($data['img']!='' && strpos($data['img'],";base64,")){
            $image_parts = explode(";base64,", $data['img']);
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            $fileName =  uniqid() . '.'.$image_type;
            $file = 'uploads/' .$fileName;
            file_put_contents($file, $image_base64);
            array_push($allFileNames,$file); 
        }elseif($data['img']!=''){
            array_push($allFileNames,'uploads/'.$data['img']); 
        }else{
            array_push($allFileNames,'uploads/default.png'); 
        }
    }
    echo json_encode(['status'=>true,'data'=>$allFileNames]);
}




?>