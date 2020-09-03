<?php 
session_start();
if(isset($_SESSION['username']))
{
    $page_title = "Startsida";
    include("includes/head.php");  
    include("includes/mainheader.php"); 
    include("includes/contentwindow.php");
    include("includes/funktion.php");
    
}
else
{
    header("Location: loginpage.php");
}
?>



<form method="post">
    <input type="submit" name="button1" value="Kör funktion"/> 
</form>

<?php 
if (isset($_POST['button1']))
{
    test();
}
?>

<?php include("includes/mainfooter.php"); ?>