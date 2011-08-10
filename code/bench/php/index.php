<?php
include "config.php";

$db = mysql_pconnect($host, $user, $pass);
$TEST_DB = "php_bench";
$TEST_TABLE = "test";


if (!$db) 
{
	die("No Connection: " . mysql_error());
}

if (!mysql_query("CREATE DATABASE IF NOT EXISTS ". $TEST_DB, $db))
{
	die("Couldn't make DB: " . mysql_error());
}

mysql_query("USE " . $TEST_DB);

$createQ = "CREATE TEMPORARY TABLE IF NOT EXISTS ".  $TEST_TABLE .
  " (id INT(11) AUTO_INCREMENT, ".
  "title VARCHAR(255), ".
  "text TEXT, ".
  "PRIMARY KEY (id))";

if (!mysql_query($createQ))
{
	die("Can't make table: " . mysql_error());
}

$insertQ = "INSERT INTO " . $TEST_TABLE . " " .
	"SET title = 'title', text = '" . rand() . "'";

mysql_query($insertQ);

$filename = "./data";

$handle = fopen($filename, "r");
$data = fread($handle, filesize($filename));
fclose($handle);

echo "Hello World";
?>
