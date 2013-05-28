<?php
 require_once  'db_config.php';

if(!array_key_exists('uname', $_POST) ||!array_key_exists('email', $_POST) ||!array_key_exists('comment', $_POST) ) { die("no key"); }

$sql=
"INSERT INTO `blog`.`comment`  (`cmt_id`, `cmt_user`, `cmt_mail`, `cmt_text`, `tpc_id`) VALUES (NULL, '".$_POST['uname']."' , '".$_POST['email']."', '".$_POST['comment']."', '".(int)$_GET['id']."')";
$result=$mysqli->query($sql);
if(!$result)
{
	die($mysqli->error);
}
else var_dump($result);

