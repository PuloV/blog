<?php
 require_once  'db_config.php';
if(!array_key_exists('id', $_GET)) { die("no key"); }
$search = $_GET['id'];
$sql=
"SELECT cmt_user ,cmt_mail ,cmt_text FROM comment
WHERE tpc_id = ".(int) $search;
$result=$mysqli->query($sql);
if(!$result)
{
	die($mysqli->error);
}
$arr = array();
$i=0;
while($query = $result->fetch_array())
{
    $comments = array('cmt_user'=>$query['cmt_user'],'cmt_mail' => $query['cmt_mail'] ,'cmt_text' => $query['cmt_text']);

    $arr[] = array('id' => $i, 'cmt' => $comments);
    $i++;
}

echo json_encode($arr);