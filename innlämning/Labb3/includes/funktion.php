<?php
function test() 
{
    $date = date("Y/m/d h:i:s");
    $day = date("w");
    $ip = $_SERVER['REMOTE_ADDR'];
    $backtrace = debug_backtrace();
    $file_name = realpath($backtrace[0]['file']);
    $useragent = $_SERVER['HTTP_USER_AGENT'];
    if($day == "5")
    {
        echo "Datum/klockslag: " . $date . " Äntligen fredag! <br>";
    }
    else
    {
        echo "Datum/klockslag: " . $date . "<br>";
    }
    
    echo "Din IP-adress: " . $ip . "<br>" ;
    echo "Sökväg/filnamn: " . $file_name . "<br>";
    echo  "User agent-sträng: ".$useragent;  
}
?>