<?php

$conn=mysqli_connect("localhost", "username", "password", "database");

$json = file_get_contents('php://input');  
$dekodirani_json = json_decode($json, true);

$korisnikIme = $dekodirani_json['Korisnik'];
$KorisnikLoz2= $dekodirani_json['Lozinka']; 

$SQL = "SELECT * FROM korisnici WHERE korisnikIme = '$korisnikIme'";
$upitSQL = mysqli_query($conn, $SQL);
$bazaIme =  mysqli_num_rows($upitSQL);
if ($bazaIme != 0) {
    $podaciNiz = mysqli_fetch_array($upitSQL);
    if ($podaciNiz['korisnikLoz'] != $KorisnikLoz2) {
        $Poruka = "Kriva lozinka";
    } else {
        $Poruka = "Dobrodošli!";
    }
} else {
    $Poruka = "Neispravni korisnički podaci.";
}

$Response[] = array("Poruka" => $Poruka);
echo json_encode($Response, JSON_FORCE_OBJECT);
?>

