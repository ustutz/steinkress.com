<?php
$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];
$formcontent=" Von: $name \n Email: $email \n Nachricht: $message";
$recipient = "vweb@ls3d.de";
$subject = $_POST['subject'];;
$mailheader = "From: $email \r\n";
if(!isset($_POST['privacy'])) {
	echo "Vielen Dank. Bitte bestätigen Sie noch, dass Sie der Datenschutzerklärung zustimmen.";
} else {
	if(isset($_POST['url']) && $_POST['url'] == ''){
		if(isset($_POST['message']) && $_POST['message'] != '') {
			mail($recipient, $subject, $formcontent, $mailheader) or die("Error!");
			echo "Vielen Dank!" . " -" . "<a href='index.html' style='text-decoration:none;color:#ff0099;'> Zur Webseite</a>";
		} else {
			echo "Vielen Dank aber das hat nicht funktioniert weil im Nachricht Feld nix drinstand!" . " -" . "<a href='index.html' style='text-decoration:none;color:#ff0099;'> Zur Webseite</a>";
		}
	} else {
		echo "Vielen Dank aber das hat nicht funktioniert weil im Url Feld was drinstand!" . " -" . "<a href='index.html' style='text-decoration:none;color:#ff0099;'> Zur Webseite</a>";
	}
}
?>
