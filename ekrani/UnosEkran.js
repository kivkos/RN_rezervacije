import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
import ObrazacUnos from '../components/ObrazacUnos';
import Moment from 'moment';

import Okvir from '../components/Okvir';

const UnosEkran = () => {
  const [datum, setDatum] = useState('');
  const [checked, setChecked] = useState('Villa Adriatic');
  const [broj, postaviBroj] = useState(1);
  const [imePrezime, unesiImePrezime] = useState('');
  const [napomena, unesiNapomenu] = useState('');
  const [posrednik, setPosrednik] = useState('osobno');
  let s = 0;
  let p = 0;

  const unesiRezervaciju = () => {
    
    switch (posrednik) {
      case 'Booking':
        p = 1;
        break;
      case 'AirBnb':
        p = 2;
        break;
      case 'Trip Advisor':
        p = 4;
        break;
      case 'Expedia':
        p = 3;
        break;
      case 'osobno':
        p = 5;
        break;
      default:
        return null;
    }

    switch (checked) {
      case 'Villa Adriatic':
        s = 2;
        break;
      case 'Villa Mare':
        s = 1;
        break;
      case 'Apartman Palma':
        s = 3;
        break;
      default:
        return null;
    }

    var dolazak = datum.substr(0, 10);
    var odlazak = datum.substr(13, 22);

    if (imePrezime.length < 6 || !imePrezime.includes(' ')) {
      Alert.alert('Pogrešan unos', 'Unesite ispravno ime i prezime.');
      return;
    }

    if (!/^[a-zA-Z0-9]+$/.test(broj) || broj < 1 || broj > 9) {
      Alert.alert('Pogrešan unos', 'Unesite broj osoba.');
      return;
    }

    if (datum.length < 15 || odlazak === dolazak) {
      Alert.alert('Pogrešan unos', 'Unesite ispravan datum.');
      return;
    }

    var ispis =
      'Unesena rezervacija za ' +
      imePrezime +
      ' u smještaju ' +
      checked +
      ' za ' +
      broj +
      ' osoba u terminu ' +
      datum;

      var API = 'https://brainismelting.online/unos.php';
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      var Data = {
        osoba: imePrezime,
        broj: broj,
        dolazak: dolazak,
        odlazak: odlazak,
        napomena: napomena,
        smjestaj: s,
        posrednik: p,
      };
      fetch(API, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((response) => response.json())
        .then((response) => {
          Alert.alert(response[0].Message, ispis);
        })
        .catch((error) => {
          alert('Error' + error);
        });
    
    setDatum('');
    postaviBroj('');
    unesiImePrezime('');
    unesiNapomenu('');
  };

  return (
    <ImageBackground
      source={require('../slike/pozadina3.jpg')}
      style={{ width: '100%', height: '100%' }}>
      <View style={stil.ekran}>
        <Okvir>
          <ObrazacUnos
            datum={datum}
            childToParent={setDatum}
            checked={checked}
            adriaticChecked={() => setChecked('Villa Adriatic')}
            mareChecked={() => setChecked('Villa Mare')}
            palmaChecked={() => setChecked('Apartman Palma')}
            broj={postaviBroj}
            imePrezime={unesiImePrezime}
            imePrezimeValue={imePrezime}
            brojValue={broj}
            napomena={unesiNapomenu}
            napomenaValue={napomena}
            setPosrednik={setPosrednik}
            posrednikValue={posrednik}
          />
        </Okvir>
        <View>
          <TouchableOpacity style={stil.btn} onPress={unesiRezervaciju}>
            <Text style={{ color: 'white' }}>DODAJ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const stil = StyleSheet.create({
  ekran: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 30,
  },
  btn: {
    width: 200,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 25,
    backgroundColor: 'navy',
    paddingVertical: 10,
  },
});

export default UnosEkran;
