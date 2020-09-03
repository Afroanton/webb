<?php
    session_start();
    if(isset($_SESSION['username']))
    {
         $page_title = "Startsida"; 
         include("includes/head.php"); 
         include("includes/mainheader.php"); 
         include("includes/contentwindow.php"); 
         include("includes/content/phpquestions.php"); 
         include("includes/mainfooter.php"); 

    }
    else
    {
        header("Location: loginpage.php");
    }
?>