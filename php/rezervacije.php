<?php

$conn=mysqli_connect("localhost", "username", "password", "database");
$sql="SELECT rezervacija.id,broj_osoba,dolazak,odlazak,napomena,smjestaj.naziv,osoba.ime_prezime,posrednici.naziv_posrednik FROM rezervacija
INNER JOIN osoba ON rezervacija.id_osoba = osoba.id_osoba
INNER JOIN smjestaj ON rezervacija.id_smjestaj=smjestaj.id_smjestaj
INNER JOIN posrednici ON rezervacija.id_posrednik=posrednici.id_posrednik
ORDER BY dolazak, odlazak";
 $rezultat = mysqli_query($conn,$sql);
 $redak = array();
   while($r = mysqli_fetch_assoc($rezultat)) {
     $redak['rezervacije'][] = $r;
   }
 print json_encode($redak);

 ?>
 
 