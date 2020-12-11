<?php
$subject = "sendtest.php";
$formcontent = "Von: sendtest.php\nEmail: test@test.de\nBetreff: Testbetreff\nNachricht: Testnachricht";
$recipient = "test@steinkress.ls3d.de";
$mailheader = "From: test@test.de\r\n";

$response = mail($recipient, $subject, $formcontent, $mailheader) or die("error");
echo($response);

?>
