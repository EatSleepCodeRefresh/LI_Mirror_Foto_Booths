<?php
	$name = $_POST['name'];
	$phone = $_POST['phone'];
	$email = $_POST['email'];
	$salary = $_POST['salary'];
	$start_date = $_POST['start_date'];
	$availabiltymf = $_POST['availabiltymf'];
	$availabiltywo = $_POST['availabiltywo'];
	$availabiltyoa = $_POST['availabiltyoa'];
	$availabiltyot = $_POST['availabiltyot'];
	$company = $_POST['company'];
	$contacty = $_POST['contacty'];
	$contactn = $_POST['contactn'];
	$reference1 = $_POST['reference1'];
	$addphone1 = $_POST['addphone1'];
	$reference2 = $_POST['reference2'];
	$addphone2 = $_POST['addphone2'];
	$reference3 = $_POST['reference3'];
	$addphone3 = $_POST['addphone3'];
	
	$formContent= "From: $name \n Phone: $phone \n Email: $email \n Desired Salary: $salary \n Start Date: $start_date \n Availability: $availabilty \n Former/Current Company: $company \n Able to contact old or current employer: $contacty $contactn \n Reference1: $reference1 \n $addphone1 \n $reference2 \n $addphone2 \n $reference3 \n $addphone3";
	$recipient = "nr4enal@yahoo.com";
	$subject = "Employee Application";
	mail($recipient, $subject, $formContent, $mailheader) or die ("Error");
	echo "Thank You!";
 ?>