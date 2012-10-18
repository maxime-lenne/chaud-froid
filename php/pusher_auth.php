<?php
header('Content-Type: application/json');
require('Pusher.php');
$pusher = new Pusher("0a3b796957d21bc66fbd", "2b5efc0164e61b8ebffe", "29833");
// $pusher->socket_auth('private-channel', "0a3b796957d21bc66fbd");
$pusher->trigger('private-channel', 'client-someeventname', array('message' => 'hello world') );
?>