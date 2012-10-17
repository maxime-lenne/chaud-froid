<?php 
		
require_once "php/colorlib.php";

//Fond
$bleu = convertColor("#6792E6");
$rouge = convertColor("#DE8782");

$legende = getMidColors($bleu,$rouge,9);
print_r($bleu . "<br />");
print_r($rouge);
print_r($legende);
//Array ( [1] => 115,145,220 [2] => 127,144,210 [3] => 139,143,200 [4] => 151,142,190 [5] => 163,141,180 [6] => 174,139,170 [7] => 186,138,160 [8] => 198,137,150 [9] => 210,136,140 )


//btn-disabled
$bleu = convertColor("#0044CC");
$rouge = convertColor("#BD362F");

$legende = getMidColors($bleu,$rouge,1);
print_r($bleu . "<br />");
print_r($rouge);
print_r($legende);
//Array ( [1] => 95,61,126 )

//btn
// rouge background-image: -webkit-linear-gradient(top,#EE5F5B,#BD362F);
$bleu = convertColor("#0088CC");
$rouge = convertColor("#EE5F5B");

$legende = getMidColors($bleu,$rouge,1);
print_r($bleu . "<br />");
print_r($rouge);
print_r($legende);
//Array ( [1] => 119,116,148 ) 

$bleu = convertColor("#002A80");
$rouge = convertColor("#802420");

$legende = getMidColors($bleu,$rouge,1);
print_r($bleu . "<br />");
print_r($rouge);
print_r($legende);

//Array ( [1] => 95,61,126 )


?> 