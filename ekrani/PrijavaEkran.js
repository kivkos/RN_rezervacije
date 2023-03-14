import { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

export default class PrijavaEkran extends Component {
  constructor(props) {
    super(props);
    this.state = {
      korisnik: '',
      lozinka: '',
      check_textInputChange: false,
    };
  }
  Prijava = () => {
    var Korisnik = this.state.korisnik;
    var Lozinka = this.state.lozinka;

    if (Korisnik.length == 0 || Lozinka.length == 0) {
      Alert.alert('Molimo unesite podatke');
    } else {
      var APIURL = 'https://brainismelting.online/login.php';
      var headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      var Data = {
        Korisnik: Korisnik,
        Lozinka: Lozinka,
      };
      fetch(APIURL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(Data),
      })
        .then((Response) => Response.json())
        .then((Response) => {
          Alert.alert(Response[0].Poruka);
          if (Response[0].Poruka == 'Dobrodošli!') {
            this.props.navigation.navigate('Pocetna');
          }
          console.log(Data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.slika} source={require('../slike/login.png')} />
        <Text style={styles.tekst}>Prijava u sustav</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Korisničko ime"
          placeholderTextColor="#707B7C"
          color="white"
          onChangeText={(korisnik) => this.setState({ korisnik })}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Lozinka"
          placeholderTextColor="#707B7C"
          secureTextEntry={true}
          color="white"
          onChangeText={(lozinka) => this.setState({ lozinka })}
        />
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => {
            this.Prijava();
            //this.props.navigation.navigate('Pocetna');
          }}>
          <Text style={styles.loginText}>PRIJAVI SE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'navy',
    alignItems: 'center',
  },
  tekst: {
    color: 'white',
    fontSize: 22,
  },
  slika: {
    width: 100,
    height: 120,
    marginBottom: 10,
    marginTop: '40%',
  },

  textInput: {
    width: '80%',
    height: 50,
    paddingLeft: 10,
    marginTop: 20,
    paddingRight: 15,
    borderWidth: 0.5,
    borderRadius: 30,
    borderColor: 'white',
  },
  loginBtn: {
    width: '50%',
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 25,
    backgroundColor: '#F4D03F',
    paddingVertical: 10,
  },
});
