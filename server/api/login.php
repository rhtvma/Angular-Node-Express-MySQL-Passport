<?php
header("Access-Control-Allow-Origin: *");
include 'class.user.php';
$db = new USER();
 $request=file_get_contents('php://input');
 $data = json_decode($request);
//echo $data;

$email=$data->email;
$password=$data->password;// get the user by email and password
    $sql="select * from user where email='$email' and password='$password'";
	$stmt= $db->runQuery($sql);
    $stmt->execute();
	//echo 'afterr exec';
	 if($stmt->rowCount() >=1){
	 $row = $result->fetch_assoc();
	 $data[] = $row;
	  echo json_encode($data);
	  }
    

?>

