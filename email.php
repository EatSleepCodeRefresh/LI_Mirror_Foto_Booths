<?php
	$name = $_POST['name'];
	$email = $_POST['email'];
	$package = $_POST['dropdown'];
	$trip_date = $_POST['trip_date'];
	$message = $_POST['message'];
	$formContent= "From: $name \n Message: $message";
	$recipient = "nr4enal@yahoo.com";
	$subject = "Contact Form";
	mail($recipient, $subject, $formContent, $mailheader) or die ("Error");
	echo "Thank You!";
 ?>
 
 
 
 
 
 