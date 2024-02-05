<?php
 
$conn=mysqli_connect("localhost", "username", "password", "database");
 
$json = file_get_contents('php://input');
$dekodirani_json = json_decode($json,true);
$rezervacija_id = $dekodirani_json['rezervacija_id'];
 
$SQL_brisi= "DELETE FROM rezervacija WHERE id = '$rezervacija_id'" ;
 
if(mysqli_query($conn,$SQL_brisi)){
    $Poruka = 'Izbrisano!' ;
    $json = json_encode($Poruka);
    echo $json ;
 }
else {echo 'Pokušajte ponovno.';};
mysqli_close($con);
?>
