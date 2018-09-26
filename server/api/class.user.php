<?php
require_once 'constants.php';
require_once 'dbconfig.php';
include 'way2sms-api.php';

class USER
{	
	private $conn;
	public function __construct(){	
		$database = new Database();
		$db = $database->dbConnection();
		$this->conn = $db;
    }
		
	public function getuserdata($userID){
	 $sql = "SELECT * FROM `users` WHERE id= '$userID'";
	 $stmt = $this->conn->prepare($sql);
	 $stmt->execute();
		//echo $sql;
	 $row=$stmt->fetch(PDO::FETCH_ASSOC);
		return  $row;
	}
	public function getuserliked($userid,$eventid){
	  $sql="select * from `rating` where `eventid`='$eventid' and `userid`='$userid'";
	  $stmt= $this->conn->prepare($sql);
	  $stmt->execute();
	  if($stmt->rowCount()==0){
	   return  true;
	  }
	  else{
	   return false;
	  
	  }
	}
	public function getscbscriberdata($userID){
  $sql = "SELECT * FROM `subscribers` WHERE user_ID = '$userID'";
  $stmt = $this->conn->prepare($sql);
  $stmt->execute();
  //echo $sql;
  $row=$stmt->fetch(PDO::FETCH_ASSOC);
  return  $row;
 }
	public function getusername($uniqueID){
	 $sql = "SELECT * FROM `users` WHERE unique_id= '$uniqueID'";
	 $stmt = $this->conn->prepare($sql);
	 $stmt->execute();
		//echo $sql;
	 $row=$stmt->fetch(PDO::FETCH_ASSOC);
		return  $row;
	}
	public function getcategoryname($uniqueID){
  $sql = "SELECT * FROM `category` WHERE category_id = '$uniqueID'";
  $stmt = $this->conn->prepare($sql);
  $stmt->execute();
  //echo $sql;
  $row=$stmt->fetch(PDO::FETCH_ASSOC);
  return  $row;
 }
	
	public function getidbyname($uniqueID){
	  $sql = "SELECT * FROM `users` WHERE Name LIKE '%$uniqueID%'";
	  $stmt = $this->conn->prepare($sql);
	  $stmt->execute();
	  //echo $sql;
	  $row=$stmt->fetch(PDO::FETCH_ASSOC);
	  $cap=$row['unique_id'];
	  return $cap ;
	 }
	 public function getcontestlike($userid,$eventid){
      $sql="select * from `contestrating` where `eventid`='$eventid' and `userid`='$userid'";
      $stmt= $this->conn->prepare($sql);
      $stmt->execute();
  if($stmt->rowCount()==0){
      $sql1="INSERT INTO `contestrating`(`userid`, `eventid`) VALUES ('$userid','$eventid')";
      $stmt= $this->conn->prepare($sql1);
      $stmt->execute();
  $sql1="select * from `contestrating` where `eventid`='$eventid' ";
  $stmt1= $this->conn->prepare($sql1);
  $stmt1->execute();
  $count=$stmt1->rowCount();
  return $count;
  }
  else{
  $sql2="DELETE FROM `contestrating` WHERE `userid`='$userid' and`eventid`='$eventid'"; 
  $stmt= $this->conn->prepare($sql2);
  $stmt->execute();
  $sql2="select * from `contestrating` where `eventid`='$eventid' ";
  $stmt2= $this->conn->prepare($sql2);
  $stmt2->execute();
  $count1=$stmt2->rowCount();
  return $count1;
  
  }
 }
	 


	 public function getimage($uniqueID){
  $sql = "SELECT * FROM `event_log` WHERE  `ID` ='$uniqueID'";
  $stmt = $this->conn->prepare($sql);
  $stmt->execute();
  //echo $sql;
  $row=$stmt->fetch(PDO::FETCH_ASSOC);
  return  $row;
 }
	public function getlike($userid,$eventid){
		$sql="select * from `rating` where `eventid`='$eventid' and `userid`='$userid'";
		$stmt= $this->conn->prepare($sql);
		$stmt->execute();
		if($stmt->rowCount()==0){
		$sql1="INSERT INTO `rating`(`userid`, `eventid`) VALUES ('$userid','$eventid')";
		$stmt= $this->conn->prepare($sql1);
		$stmt->execute();
		$sql1="select * from `rating` where `eventid`='$eventid' ";
		$stmt1= $this->conn->prepare($sql1);
		$stmt1->execute();
		$count=$stmt1->rowCount();
		return $count;
		}
		else{
		$sql2="DELETE FROM `rating` WHERE `userid`='$userid' and`eventid`='$eventid'";	
		$stmt= $this->conn->prepare($sql2);
		$stmt->execute();
		$sql2="select * from `rating` where `eventid`='$eventid' ";
		$stmt2= $this->conn->prepare($sql2);
		$stmt2->execute();
		$count1=$stmt2->rowCount();
		return $count1;
		
		}
	}
	
	
	public function login($email,$upass){
	  try
	  {
		$sql = "SELECT * FROM `users` WHERE email= '$email'";
		$stmt = $this->conn->prepare($sql);
		$stmt->execute();
		//echo $sql;
		$userRow=$stmt->fetch(PDO::FETCH_ASSOC);
		if($stmt->rowCount() == 1)
		{
			$salt = $userRow['salt'];
			$encrypted_password = $userRow['encrypted_password'];
			$hash1=base64_encode(sha1($upass));
			$hash = $this->checkhashSSHA($salt, $upass);
			if ($encrypted_password == $hash)
			{ 
		//echo "hii";
				$_SESSION['userSession'] = $userRow['id'];      
				$_SESSION['userID'] = trim($userRow['id']);
				$_SESSION['unique_ID'] = $userRow['unique_id'];
				$_SESSION['userEmail'] = $userRow['email'];
				$_SESSION['name'] = $userRow['name'];
				return true;
			}
			else
			{
				
			}
		}
		else
		{
			
		}  
	  }
	  catch(PDOException $ex)
	  {
	   //echo $ex->getMessage();
	  }
	 }
	public function subscribers($name,$password,$phone,$email){
		 $hash = $this->hashSSHA($password);
		 $encrypted_password = $hash["encrypted"]; // encrypted password
		  $salt = $hash["salt"]; // salt
        $exdate= date('Y-m-d', strtotime("+3 month", strtotime($date)));
		$sql = "SELECT * FROM `users` WHERE `email`= '$email'";
		$stmt = $this->conn->prepare($sql);
		$stmt->execute();
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
		$id = $row['id'];
		if($stmt->rowCount() == 0)
		{
			try
			{   
				
				$sql1="INSERT INTO `users`( `unique_id`,`name`,`email`, `encrypted_password`,`salt`,`created_at`) VALUES ('$code','$fname','$email','$encrypted_password','$salt','NOW()')";
				$stmt1=$this->conn->prepare($sql1);
				$stmt1->execute();
				 $lastid = $this->lasdID();
				$sql2="INSERT INTO `subscribers`(`uniq_ID`,`user_ID`,`email`, `fname`, `lname`, `useraddress`, `phone`,`messenger_type`, `messenger_ID`,`expiry_date`)
				VALUES ('$code','$lastid ','$email','$fname','$lname','$address','$phone','$messengertype','$messengerID','$exdate')";
				$stmt2=$this->conn->prepare($sql2);
				$stmt2->execute();
                				
				return $lastid;
			}
			catch(PDOException $ex)
			{
				return "fail";
			}
		}else{
			$sql = "SELECT * FROM `subscribers` WHERE `email`= '$email'";
			$stmt12 = $this->conn->prepare($sql);
			$stmt12->execute();
			if($stmt12->rowCount() == 0){
				$sql4="UPDATE `users` SET `unique_id`='$code',`name`='$fname',`email`='$email',`encrypted_password`='$encrypted_password',`salt`='$salt',
				`updated_at`='NOW()' WHERE `id`='$id'";
				$stmt4=$this->conn->prepare($sql4);
				$stmt4->execute();
				$sql3="INSERT INTO `subscribers`(`uniq_ID`,`user_ID`,`email`, `fname`, `lname`, `useraddress`, `phone`, `plan_type`, `plan_reason`, `messenger_type`, `messenger_ID`,`expiry_date`) 
				VALUES ('$code','$id','$email','$fname','$lname','$address','$phone','$plantype','$planreason','$messengertype','$messengerID','$exdate')";
				$stmt3= $this->conn->prepare($sql3);
				$stmt3->execute();
				return $id;
			}				
		}
	}
	public function add_notification($event_id){
		
		$sql = "SELECT * FROM `event_log` WHERE `ID` = '$event_id'";
		$stmt = $this->runQuery($sql);
		$stmt->execute();
		$row = $stmt->fetch(PDO::FETCH_ASSOC);
		//print_r($row);
		$event_longitude = $row['Longitude'];
		$event_latitude = $row['Lattitude'];
		$event_city = $row['City'];
		$country = $row['Country'];
		$pin = $row['ZIP'];
		$state = $row['State'];
		$sql = "SELECT * FROM `subscribers` WHERE `state` = '$state' AND `country` = '$country'";
		$user_list = $this->runQuery($sql);
		$user_list->execute();
		while($user = $user_list->fetch(PDO::FETCH_ASSOC)){
			//echo"id:";
			 $user_ID = $user['user_ID'];
			//echo "hii";
			$user_city = $user['city'];
			$type = $user['plan_type'];
			$reason = $user['plan_reason'];
			$user_longitude = $user['Longitude'];
			$user_latitude = $user['Lattitude'];
			$email = $user['email'];
			$phone = $user['phone'];
			$uid='9505795061';
            $pwd='m5222N';
			if($type == 'RADIUS'){
				//echo"hello";
				$event_distance = $this->distance($user_latitude, $user_longitude, $event_latitude, $event_longitude, 'K');
				if($event_distance <= $reason ){
					//echo "distance";
					$notification_ID = uniqid(rand());
					$sql = "INSERT INTO `notifications`(`notification_ID`, `user_ID`, `event_ID`, `status`) VALUES ('$notification_ID','$user_ID','$event_id','ACTIVE')";
					$stmt = $this->conn->prepare($sql);
		            $stmt->execute();
					//echo $sql;
					$subject="Krimemonitor Notification";
					$message="Dear subscriber</br></br>
					          A crime video is uploaded near your area
							  ";
				    $sendemail=$this->send_mail($email,$subject,$message);
					//echo "nicky";
				    $msg1="Dear subscriber A crime video is uploaded near your area";
				    $res = sendWay2SMS($uid, $pwd, $phone, $msg1);
					//echo "viswa";
				}

			}elseif($type == 'AREA'){
				if($user_city == $event_city){
					$notification_ID = uniqid(rand());
					//echo "<br>";
					 $sql = "INSERT INTO `notifications`(`notification_ID`, `user_ID`, `event_ID`, `status`) VALUES ('$notification_ID','$user_ID','$event_id','ACTIVE')";
					$stmt = $this->conn->prepare($sql);
		            $stmt->execute();
       
					$subject="Krimemonitor Notification";
					$message="Dear subscriber</br></br>
					          A crime video is uploaded near your area
							  ";
				    $sendemail=$this->send_mail($email,$subject,$message);
				    $msg1="Dear subscriber A crime video is uploaded near your area";
				    $res = sendWay2SMS($uid, $pwd, $phone, $msg1);
				
				}
			}
			
		}
    }
	function distance($lat1, $lon1, $lat2, $lon2, $unit) {
	  $theta = $lon1 - $lon2;
	  $dist = sin(deg2rad($lat1)) * sin(deg2rad($lat2)) +  cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * cos(deg2rad($theta));
	  $dist = acos($dist);
	  $dist = rad2deg($dist);
	  $miles = $dist * 60 * 1.1515;
	  $unit = strtoupper($unit);

	  if ($unit == "K") {
		return ($miles * 1.609344);
	  } else if ($unit == "N") {
		  return ($miles * 0.8684);
		} else {
			return $miles;
		  }
	}
	public function runQuery($sql){
		$stmt = $this->conn->prepare($sql);
		return $stmt;
	}
	public function lasdID(){
		$stmt = $this->conn->lastInsertId();
		return $stmt;
	}
	public function storeUser($name, $email, $password) {
        $uuid = uniqid('', true);
        $hash = $this->hashSSHA($password);
        $encrypted_password = $hash["encrypted"]; // encrypted password
        $salt = $hash["salt"]; // salt

        $stmt = $this->conn->prepare("INSERT INTO users(unique_id, name, email, encrypted_password, salt, created_at) VALUES(?, ?, ?, ?, ?, NOW())");
        $stmt->bind_param("sssss", $uuid, $name, $email, $encrypted_password, $salt);
        $result = $stmt->execute();
        $stmt->close();

        // check for successful store
        if ($result) {
            $stmt = $this->conn->prepare("SELECT * FROM users WHERE email = ?");
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $user = $stmt->get_result()->fetch_assoc();
            $stmt->close();

            return $user;
        } else {
            return false;
        }
    }
    public function storeEvent($lat,$lng,$ip){
	
	    $stmt = $this->conn->prepare("INSERT INTO `event_log`(`latittude`, `logitude`,`user_ip`) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("sss", $lat, $lng, $ip);
        $result = $stmt->execute();
        $stmt->close();
	
	}
    public function getUserByEmailAndPassword($email, $password) {

        $stmt = $this->conn->prepare("SELECT * FROM users WHERE email = ?");

        $stmt->bind_param("s", $email);

        if ($stmt->execute()) {
            $user = $stmt->get_result()->fetch_assoc();
            $stmt->close();

            // verifying user password
            $salt = $user['salt'];
            $encrypted_password = $user['encrypted_password'];
            $hash = $this->checkhashSSHA($salt, $password);
            // check for password equality
            if ($encrypted_password == $hash) {
                // user authentication details are correct
                return $user;
            }
        } else {
            return NULL;
        }
    }
    public function isUserExisted($email) {
        $stmt = $this->conn->prepare("SELECT email from users WHERE email = ?");

        $stmt->bind_param("s", $email);

        $stmt->execute();

        $stmt->store_result();

        if ($stmt->num_rows > 0) {
            // user existed 
            $stmt->close();
            return true;
        } else {
            // user not existed
            $stmt->close();
            return false;
        }
    }
	public function checkForSubscribe($user_uniq_id) {
		$date = date("Y-m-d");
		$sql = "SELECT * from `".SUBSCRIBERS."` WHERE `uniq_ID` = '$user_uniq_id' AND `expiry_date` >= '$date'";
		$stmt = $this->conn->prepare($sql);
		$stmt->execute();
        if($stmt->rowCount() == 1){
			$userRow=$stmt->fetch(PDO::FETCH_ASSOC);
			$result['result'] = "TRUE"; 
			$result['data'] = $userRow; 
		}
		else{
			$result['result'] = "FALSE";
        }
		return $result;
		
    }
	public function hashSSHA($password) {

        $salt = sha1(rand());
        $salt = substr($salt, 0, 10);
        $encrypted = base64_encode(sha1($password . $salt, true) . $salt);
        $hash = array("salt" => $salt, "encrypted" => $encrypted);
        return $hash;
    }
    public function checkhashSSHA($salt, $password) {

       $hash = base64_encode(sha1($password . $salt, true) . $salt);

        return $hash;
    }
	public function is_logged_in(){
		if(isset($_SESSION['userSession']))
		{
			return true;
		}
	}
	public function redirect($url){
		$link = "<script>window.location.replace('$url');</script>";
		echo $link ;
	}
	public function openinwindow($url){
		$link = "<script>window.open('$url'); </script>";
		echo $link ;
	}
	public function alertmessage($msg){
		$link = "<script>alert('$msg'); </script>";
		echo $link ;
	}
	public function redirectwithjava($url){
		$link = "<script>window.location.replace('$url');</script>";
		echo $link ;
	}
	public function logout(){
		session_destroy();
		$_SESSION['userSession'] = false;
	}
	public function getlatlong($address){
    if(!empty($address)){
        //Formatted address
         echo $formattedAddr = str_replace(' ','+',$address);
        //Send request and receive json data by address
		$geocodeFromAddr = file_get_contents('http://maps.googleapis.com/maps/api/geocode/json?address='.$formattedAddr.'&sensor=true_or_false');
      //$geocodeFromAddr = file_get_contents('http://maps.googleapis.com/maps/api/geocode/json?address='.$formattedAddr.'&sensor=false&key=AIzaSyB2WZ_TIVtQiutmgyXLqdxiapCupvdOjUo'); 
        $output = json_decode($geocodeFromAddr);
        //Get latitude and longitute from json data
        $data['latitude']  = $output->results[0]->geometry->location->lat; 
        $data['longitude'] = $output->results[0]->geometry->location->lng;
        //Return latitude and longitude of the given address
        if(!empty($data)){
            return $data;
        }else{
            return false;
        }
    }else{
        return false;   
    }
    }
    public function send_mail($email,$subject,$message){						
		//require_once('mailer/class.phpmailer.php');
		require_once('PHPMailer/class.phpmailer.php');
		$mail = new PHPMailer();
		$mail->IsSMTP(); 
		$mail->SMTPDebug  = 0;                     
		$mail->SMTPAuth   = true;                  
		//$mail->SMTPSecure = "ssl";                 
		//$mail->Host       = "smtp.gmail.com";      
		//$mail->Port       = 465;  
		//$mail->SetLanguage("en", 'includes/phpMailer/language/');		
		$mail->AddAddress($email);
		//$mail->Username="ManoharPV@gmail.com";  // User User Email
		//$mail->Password="xxxxxx";            // Password
		$mail->SetFrom('elitecap@dinkhoo.com','naturesnap');  // Email
		$mail->AddReplyTo("elitecap@dinkhoo.com","naturesnap");  // email
		$mail->Subject    = $subject;
		$mail->MsgHTML($message);
		$mail->Send();
	}	
	function sendactive_mail($send,$subject,$message,$uploadfile){						
		//require_once('mailer/class.phpmailer.php');
		require_once('member/phpmailer/class.phpmailer.php');
		if (array_key_exists('userfile', $_FILES)) {
		$mail = new PHPMailer();
		$mail->IsSMTP(); 
		$mail->SMTPDebug  = 0;                     
		$mail->SMTPAuth   = true;                  
		//$mail->SMTPSecure = "ssl";                 
		//$mail->Host       = "smtp.gmail.com";      
		//$mail->Port       = 465;  
		//$mail->SetLanguage("en", 'includes/phpMailer/language/');		
		$mail->AddAddress(trim($send));
		$mail->AddBCC(trim($send));
		//$mail->Username="ManoharPV@gmail.com";  // User User Email
		//$mail->Password="xxxxxx";            // Password
		$mail->SetFrom('medicall@jwtechinc.com','Medicall');  // Email
		$mail->AddReplyTo("medicall@jwtechinc.com","Information");  // email
		$mail->Subject    = $subject;
		$mail->MsgHTML($message);
			  for ($ct = 0; $ct < count($_FILES['userfile']['tmp_name']); $ct++) {
        $uploadfile = tempnam(sys_get_temp_dir(), hash('sha256', $_FILES['userfile']['name'][$ct]));
        $filename = $_FILES['userfile']['name'][$ct];
        if (move_uploaded_file($_FILES['userfile']['tmp_name'][$ct], $uploadfile)) {
            $mail->addAttachment($uploadfile, $filename);
        } else {
            $msg .= 'Failed to move file to ' . $uploadfile;
        }
		
    }
		$mail->Send();
		$mail->ClearAddresses();
		$mail->ClearBCCs();
		}

	}
}