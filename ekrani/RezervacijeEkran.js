import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
  ImageBackground,
  Image,
  TouchableOpacity,
  CheckBox,
} from 'react-native';
import { Feather, MaterialCommunityIcons } from 'react-native-vector-icons';
import ListaElement from '../components/ListaElement';
import { SelectList } from 'react-native-dropdown-select-list';
import Okvir from '../components/Okvir';
import Moment from 'moment';
import { useState, useEffect } from 'react';

const RezervacijeEkran = () => {
  const [trazi, setTrazi] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [filtar, setFiltar] = useState(0);
  const [isSelected, setSelection] = useState(false);
  const [sortOdlazak, setOdlazak] = useState(true);
  
  const filtri = [
    { key: '1', value: 'Dolazak' },
    { key: '2', value: 'Odlazak' },
  ];

  const getData = async () => {
    try {
      const response = await fetch(
        'https://brainismelting.online/rezervacije.php'
      );
      const json = await response.json();
      setData(json.rezervacije);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [data]);

  const slikaPosrednik = (pos) => {
    switch (pos) {
      case 'Booking':
        return (
          <Image source={require('../slike/booking.png')} style={stil.ikona} />
        );
      case 'AirBnb':
        return (
          <Image source={require('../slike/airbnb.png')} style={stil.ikona} />
        );
      case 'Trip Advisor':
        return (
          <Image
            source={require('../slike/tripadvisor.png')}
            style={stil.ikona}
          />
        );
      case 'Expedia':
        return (
          <Image source={require('../slike/expedia.png')} style={stil.ikona} />
        );
      case 'osobno':
        return (
          <Image source={require('../slike/telefon.png')} style={stil.ikona} />
        );
      default:
        return null;
    }
  };

  const prikazRezervacija = () => {
    {
      return (
        <ImageBackground
          source={require('../slike/pozadina3.jpg')}
          style={{ width: '100%', height: '100%' }}>
          <View style={stil.ekran}>
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                placeholder="Traži..."
                style={stil.trazilica}
                value={trazi}
                onChangeText={setTrazi}
              />
              <Feather
                style={{ marginTop: 10 }}
                name="search"
                color="grey"
                size={30}
              />
            </View>
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                data={data}
                keyExtractor={({ id }) => id}
                renderItem={({ item }) =>
                  (item.ime_prezime
                    .toLowerCase()
                    .includes(trazi.toLowerCase()) ||
                    item.naziv.toLowerCase().includes(trazi.toLowerCase())) && (
                    <Okvir>
                      <ListaElement
                        id={item.id}
                        ime={item.ime_prezime}
                        villa={item.naziv}
                        broj={item.broj_osoba}
                        dolazak={Moment(item.dolazak).format('DD.MM.YYYY.')}
                        odlazak={Moment(item.odlazak).format('DD.MM.YYYY.')}
                        napomena={item.napomena}
                        posrednik={slikaPosrednik(item.naziv_posrednik)}
                      />
                    </Okvir>
                  )
                }
              />
            )}
          </View>
        </ImageBackground>
      );
    }
  };

  return prikazRezervacija();
};

const stil = StyleSheet.create({
  ekran: {
    flex: 1,
    marginBottom: 2,
  },
  trazilica: {
    borderWidth: 0.5,
    width: '80%',
    height: 40,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 5,
    marginTop: 10,
    backgroundColor: 'white',
    borderColor: 'grey',
  },
  dropdown: {
    borderWidth: 0.5,
    backgroundColor: 'white',
    paddingLeft: 15,
    marginBottom: 10,
    width: 150,
    marginRight: 5,
    marginLeft: 20,
  },
  ikona: {
    width: 50,
    height: 50,
    borderRadius: 10,
    paddingLeft: 20,
  },
});

export default RezervacijeEkran;
