<?php
 header("Access-Control-Allow-Origin: *");
//header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

//print_r($_REQUEST);
include 'class.user.php';
$db = new USER();

 $request=file_get_contents('php://input');
 $data = json_decode($request);


$firstname     =$data->firstname;
$lastname     =$data->lastname;
$email    =$data->email;
$password =$data->password;

$sql ="INSERT INTO `user`(`firstname`,`lastname`, `email`, `password`) VALUES ('".$firstname."','".$lastname."','".$email."','".$password."')" ;
$stmt= $db->runQuery($sql);
$stmt->execute();
$data =array('status'=>'success');
header('Content-Type: application/json');
echo json_encode($data);




?>