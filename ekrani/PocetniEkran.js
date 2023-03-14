import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { useState, useEffect } from 'react';
import Moment from 'moment';
import { Feather } from 'react-native-vector-icons';
import ListaElemenataPocetna from '../components/ListaElemenataPocetna';
import Naslov from '../components/Naslov';
import Okvir from '../components/Okvir';

const PocetniEkran = () => {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

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

  var datum_danas = Moment(new Date().toDateString()).format('DD.MM.YYYY.');
  

  //data
  //izvještaj dolasci
  var odlasci = [];
  var dolasci = [];
  var datum2 = Moment(new Date().toDateString()).format('YYYY-MM-DD');

  try {
    dolasci = data
      .filter(function (item) {
        return item.dolazak === datum2;
      })
      .map(function ({ ime_prezime, naziv }) {
        return { ime_prezime, naziv };
      });
  } catch {
    return null;
  }

  const dnevniDol = () => {
    if (dolasci.length === 0)
      return <Text style={stil.tekst}>Danas nema dolazaka.</Text>;
    return null;
  };

  try {
    odlasci = data
      .filter(function (item) {
        return item.odlazak === datum2;
      })
      .map(function ({ ime_prezime, naziv }) {
        return { ime_prezime, naziv };
      });
  } catch {
    return null;
  }

  const dnevniOdl = () => {
    if (odlasci.length === 0)
      return <Text style={stil.tekst}>Danas nema odlazaka.</Text>;
    return null;
  };

  return (
    <ImageBackground
      source={require('../slike/pozadina3.jpg')}
      style={{ width: '100%', height: '100%' }}>
      <Naslov naslov={'Dnevni izvještaj za ' + datum_danas} />
      <ScrollView>
        <View style={{ alignItems: 'center' }}>
          <Image
            style={stil.slika}
            source={require('../slike/recepcija.png')}
          />
        </View>
        <View style={stil.container}>
          <Feather name="log-in" color="green" size={40} />
          <Text style={stil.naslov}>Dolasci</Text>
        </View>
        <View>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={dolasci}
              keyExtractor={({ id }) => id}
              renderItem={({ item }) => (
                <Okvir>
                  <ListaElemenataPocetna
                    ime={item.ime_prezime}
                    smjestaj={item.naziv}
                  />
                </Okvir>
              )}
            />
          )}
          {dnevniDol()}
        </View>
        <View style={stil.container}>
          <Feather name="log-out" color="red" size={40} />
          <Text style={stil.naslov}>Odlasci</Text>
        </View>
        <View>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={odlasci}
              keyExtractor={({ id }) => id}
              renderItem={({ item }) => (
                <Okvir>
                  <ListaElemenataPocetna
                    ime={item.ime_prezime}
                    smjestaj={item.naziv}
                  />
                </Okvir>
              )}
            />
          )}
        </View>
        {dnevniOdl()}
      </ScrollView>
    </ImageBackground>
  );
};

const stil = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingLeft: 20,
    paddingBottom: 10,
    paddingTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  naslov: {
    paddingLeft: 15,
    fontWeight: 'bold',
    fontSize: 25,
  },
  tekst: {
    fontSize: 16,
    marginLeft: 60,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  slika: {
    width: 200,
    height: 200,
    marginBottom: 10,
    marginTop: 20,
  },
});

export default PocetniEkran;
