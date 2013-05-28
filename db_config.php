<?php 
$mysqli = new mysqli("localhost","root","" ,"blog");

if($mysqli ->connect_errno) 
	{
	 die("DB connection error! " . $mysqli -> connect_error );
	}
if (!$mysqli->set_charset("utf8")) {
    printf("Error loading character set utf8: %s\n", $mysqli->error);
}
?>
