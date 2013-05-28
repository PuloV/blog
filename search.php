<?php
 require_once  'db_config.php';
if(!array_key_exists('search', $_POST)) { die("no key"); }
$search = $_POST['search'];
$sql=
"SELECT topics.tpc_id , topics.tpc_title 
 FROM `topics` LEFT JOIN (`topics_has_label` JOIN `label` ) on  (topics.tpc_id = topics_has_label.tpc_id and topics_has_label.lbl_id = label.lbl_id ) 
WHERE topics.tpc_title REGEXP  '".$search."'  OR label.lbl_name REGEXP  '" .$search. "'  LIMIT 0, 10";
$result=$mysqli->query($sql);
if(!$result)
{
	die($mysqli->error);
}
$arr = array();
$i=0;
while($query = $result->fetch_array())
{
	


	



    
    $res = array('tpc_id'=>$query['tpc_id'],'tpc_title' => $query['tpc_title']);

    $arr[] = array('id' => $i, 'res' => $res);
    $i++;
}

echo json_encode($arr);
