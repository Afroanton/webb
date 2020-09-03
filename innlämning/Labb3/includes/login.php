<?php
session_start();
if(!empty($_REQUEST["loginbutton"]))
{
    $username = $_REQUEST["username"];
    $password = $_REQUEST["password"];
    print $username . $password ;
    if($username == "test" and $password == "123")
    {
        $_SESSION['username'] = $username;
        header("Location: ../index.php");
        
        
    }
    else
    {
        header("Location: ../loginpage.php?felAnvändarnamnEllerLösenord");
    }
}
?>