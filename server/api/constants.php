<?php
 error_reporting(0);
 
 //databse
 define("HOST", 			"localhost"	);
 define("DATABASE", 		"api");
 define("USERNAME", 		"root"	);
 define("PASSWORD", 		"");
 
// uploads constants
 define("DIR", 				"http://apps.dinkhoo.com/"	);
 define("DIR_CURRENTFILE", 		DIR."uploads/content/naturesnap/");
 define("DIR_CURRENTUPLOAD", 		"../..");
 define("DIR_CURRENT", 		"http://localhost:8081/web/naturesnap/");
 define("DIR_PROFILE",     DIR_CURRENTUPLOAD."/uploads/content/naturesnap/profile/");
 define("DIR_UPLOADS",     DIR."/uploads/naturesnap/uploads/");
 define("DIR_BLOG",     DIR_CURRENTUPLOAD."/uploads/content/naturesnap/blog/");
 define("USERS", 			"users"	);
 define("NOTIFICATIONS",	"notifications"	);
 define("SUBSCRIBERS",		"subscribers"	);
 define("EVENTS",			"event_log"	);
 define("PAYMENTS",			"payment"	);
 define("PLAN",			"plan"	);
 define("CART",			"cart"	);
 define("DIR_CURRENT_PAY", 		"http://naturesnap.dinkhoo.com/naturesnap/");
 //define("DIR_CURRENT_PAY", 		"http://krimemonitor.dinkhoo.com/paypal/");
 define("DIR_PAYMENT", 		"https://test.payu.in");
 define("PAYPAL_EMAIL", 		"Abbey.pitta-facilitator@gmail.com");
 define("PAYPAL_URL", 		"https://www.sandbox.paypal.com/cgi-bin/webscr");
 //define("PAYPAL_URL", 		"https://www.paypal.com/cgi-bin/webscr");


?>