<?php
session_start();
require('./config.php');

if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {

    if (!$_POST['name']) {
        echo "Укажите Ваше имя";
        die;
    }

    if (!$_POST['email']) {
        echo "Укажите Ваш e-mail";
        die;
    }

    if (!$_POST['message']) {
        echo "Напишите сообщение";
        die;
    }

    ob_start();
    require_once('./msg_request.php');
    $mail = ob_get_clean();


    if (send($config['mail'], 'Новая заявка', $mail)) {
        echo "success";
        die;
    }


}


function send($to, $subject, $body, $files = array(), $type = 'html', $from = false)
{

    $separators = array(';', ',', "\n");


    require_once('../PhpMailer/class.phpmailer.php');
    require_once('../PhpMailer/class.smtp.php');
    require('./config.php');


    if (!$from) {
        $from = $config['from'];
    }


    $mail = new PHPMailer(false); // the true param means it will throw exceptions on errors, which we need to catch

    $mail->CharSet = 'utf-8';

    if ($config['use_smtp']) {
        $mail->IsSMTP(); // telling the class to use SMTP

        $mail->SMTPDebug = 1;
        $mail->Host = $config['smtp']['host']; // SMTP server
        $mail->Port = $config['smtp']['port']; // set the SMTP port for the GMAIL server
        $mail->Username = $config['smtp']['username']; // GMAIL username
        $mail->Password = $config['smtp']['password']; // GMAIL password
        $mail->SMTPAuth = true; // enable SMTP authentication
        $mail->SMTPSecure = $config['smtp']['auth']; // sets the prefix to the servier
    }


    foreach ($separators as $separator) {
        if (strstr($to, $separator)) {
            $to = explode($separator, $to);
            break;
        }
    }

    if (is_string($to)) {
        $mail->AddAddress($to);
    }


    if (is_array($to)) {
        foreach ($to as $t) {
            if (trim($t) != '') {
                $mail->AddAddress(trim($t));
            }

        }
    }

    $mail->SetFrom($from);

    $mail->Subject = $subject;

    if ($type == 'html') {
        $mail->AltBody = 'To view the message, please use an HTML compatible email viewer!'; // optional - MsgHTML will create an alternate automatically
        $mail->MsgHTML($body);
    } else {
        $mail->Body = $body;
    }

    if (!empty($files)) {
        foreach ($files as $path => $name) {
            $mail->AddAttachment($path, $name);
        }
    }

    try {
        $mail->Send();
        return true;
        //echo "Message Sent OK</p>\n";
    } catch (phpmailerException $e) {
        return false;
        echo $e->errorMessage(); //Pretty error messages from PHPMailer
    } catch (Exception $e) {
        return false;
        echo $e->getMessage(); //Boring error messages from anything else!
    }
}

?>