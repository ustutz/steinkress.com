<?php
$name = $_POST['name'];
$email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];
$formcontent="Von: $name\nEmail: $email\nBetreff: $subject\nNachricht: $message";
$recipient = "test@steinkress.ls3d.de";
$mailheader = "From: $email\r\n";

$response = mail($recipient, $subject, $formcontent, $mailheader) or die("error");
echo($response);

?>
