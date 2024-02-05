<?php
 
$conn=mysqli_connect("localhost", "username", "password", "database");

 $json = file_get_contents('php://input');
 

 $dekodirani_json = json_decode($json,true);
 
$osoba = $dekodirani_json['osoba'];
$broj_osoba = $dekodirani_json['broj'];
$dolazak = $dekodirani_json['dolazak'];
$odlazak = $dekodirani_json['odlazak'];
$napomena = $dekodirani_json['napomena'];
$id_smjestaj = $dekodirani_json['smjestaj'];
$id_posrednik = $dekodirani_json['posrednik'];
$dolazak2 = str_replace('.','-',$dolazak);
$dolazak3 = date('Y-m-d',strtotime($dolazak2));
$odlazak2 = str_replace('.','-',$odlazak);
$odlazak3 = date('Y-m-d',strtotime($odlazak2));
 
$unesi_osobu = "INSERT INTO osoba (ime_prezime)
VALUES ('$osoba')";


 $unesi = mysqli_query($conn, $unesi_osobu);

    if ($unesi) {
        $id = $conn->insert_id;
        $unesi_rezervaciju = "INSERT INTO rezervacija (broj_osoba,dolazak,odlazak,napomena,id_smjestaj,id_osoba,id_posrednik)
VALUES ('$broj_osoba','$dolazak3','$odlazak3','$napomena','$id_smjestaj','$id','$id_posrednik')";
        $unesi = mysqli_query($conn, $unesi_rezervaciju);
        $Message = "Uspješan unos! ";}
    else 
        {$Message = "Pogreška. Molimo pokušajte kasnije. ";
}
   $Response[] = array("Message" => $Message);
    echo json_encode($Response);
        
?>