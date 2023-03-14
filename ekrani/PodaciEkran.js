import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import Okvir from '../components/Okvir';
import Naslov from '../components/Naslov';
import Moment from 'moment';
import { Calendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

const WIDTH = Dimensions.get('window').width;

LocaleConfig.locales['hr'] = {
  monthNames: [
    'Siječanj',
    'Veljača',
    'Ožujak',
    'Travanj',
    'Svibanj',
    'Lipanj',
    'Srpanj',
    'Kolovoz',
    'Rujan',
    'Listopad',
    'Studeni',
    'Prosinac',
  ],
  dayNames: [
    'Nedjelja',
    'Ponedjeljak',
    'Utorak',
    'Srijeda',
    'Četvrtak',
    'Petak',
    'Subota',
  ],
  dayNamesShort: ['Ned', 'Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub'],
};
LocaleConfig.defaultLocale = 'hr';

Date.prototype.addDays = function (days) {
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
};

const PodaciEkran = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selected, setSelected] = useState('Villa Adriatic');

  const smjestaji = [
    { key: '1', value: 'Villa Adriatic'},
    { key: '2', value: 'Villa Mare'},
    { key: '3', value: 'Apartman Palma'},
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


  let markedDay = {};
  let noc = [];
  var dateArray = new Array();
  for (var i = 0; i < data.length; i++) {
    if (data[i].naziv === selected) {
      var trenutniDatum = new Date(data[i].dolazak);
      var br = 0;
      while (trenutniDatum <= new Date(data[i].odlazak)) {
        dateArray.push({ datum: Moment(trenutniDatum).format('YYYY-MM-DD') });
        trenutniDatum = trenutniDatum.addDays(1);
        br++;
      }
      noc.push(br - 1);
    }
    dateArray.map((item) => {
      markedDay[item.datum] = {
        selected: true,
        selectedColor: 'red',
      };
    });
  }

  var iznos=0;
  switch (selected) {
      case 'Villa Adriatic':
        iznos=220;
        break;
      case 'Villa Mare':
        iznos=150;
        break;
      case 'Apartman Palma':
        iznos=90;
        break;
      default:
        return null;
    }

  var n=-1;
  const Ispis = ({ item }) => {
    if (item.naziv === selected) {
      n++;
      return (
        <View style={{ flexDirection: 'row', marginBottom: 5 }}>
          <View style={{ flex: 3 }}>
            <Text style={stilovi.tekst}>{item.ime_prezime}</Text>
          </View>
          <View style={{ flex: 3 }}>
            <Text style={stilovi.tekst}>{noc[n]} noćenja</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={stilovi.tekst}>{iznos*noc[n]}</Text>
          </View>
        </View>
      );
    }
  };

  return (
    <ImageBackground
      source={require('../slike/pozadina3.jpg')}
      style={{ width: '100%', height: '100%' }}>
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={smjestaji}
        placeholder="Odaberi smještaj "
        save="value"
        search={false}
        boxStyles={stilovi.dropdown}
        defaultOption="1"
      />
      <ScrollView>
        <View>
          <Naslov naslov={selected} />
          <Okvir>
            <View>
              {isLoading ? (
                <ActivityIndicator />
              ) : (
                <Calendar
                  hideExtraDays={true}
                  enableSwipeMonths={true}
                  markedDates={markedDay}
                />
              )}
            </View>
          </Okvir>
          <Okvir>
            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
              <View style={{ flex: 3 }}>
                <Octicons name="feed-person" size={35} color="navy" />
              </View>
              <View style={{ flex: 3 }}>
                <MaterialIcons name="night-shelter" size={40} color="orange" />
              </View>
              <View style={{ flex: 1 }}>
                <MaterialIcons name="euro" size={35} color="green" />
              </View>
            </View>
            <FlatList
              data={data}
              keyExtractor={({ id }) => id}
              renderItem={({ item }) => <Ispis item={item} />}
            />
          </Okvir>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const stilovi = StyleSheet.create({
  tekst: {
    fontFamily: 'Cochin',
    fontSize: 15,
    fontWeight: 'bold',
  },
  dropdown: {
    borderWidth: 0.5,
    marginTop: 10,
    backgroundColor: 'white',
    paddingLeft: 15,
    marginBottom: 10,
    width: WIDTH - 80,
    marginRight: 5,
    marginLeft: 20,
  },
});

export default PodaciEkran;
