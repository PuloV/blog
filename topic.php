<?php
 require_once  'db_config.php';
if(!array_key_exists('id', $_GET)) { die("no key"); }
$search = $_GET['id'];
$sql=
"SELECT tpc_id ,tpc_title ,tpc_text FROM topics
WHERE tpc_id = ".(int) $search. " LIMIT 0, 1";
$result=$mysqli->query($sql);
if(!$result)
{
	die($mysqli->error);
}
$arr = array();

while($query = $result->fetch_array())
{
	


	



    
    $res = array('tpc_id'=>$query['tpc_id'],'tpc_title' => $query['tpc_title'] , 'tpc_text' => $query['tpc_text'] );

   
}
echo json_encode($res);