import { View, Text, StyleSheet, TextInput, ScrollView, Image, TouchableOpacity} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Kalendar from './Kalendar';
import React from 'react';

const ObrazacUnos = (props) => {
  const [odabran, setOdabran] = React.useState('');

  return (
    <ScrollView>
      <Text style={stil.tekst}>Ime i prezime: </Text>
      <TextInput
        style={stil.txtInput}
        onChangeText={props.imePrezime}
        value={props.imePrezimeValue}
      />
      <Text style={stil.tekst}>Smještaj: </Text>
      <View style={{ flexDirection: 'row' }}>
        <RadioButton
          value="Villa Adriatic"
          status={props.checked === 'Villa Adriatic' ? 'checked' : 'unchecked'}
          onPress={props.adriaticChecked}
          color="orange"
        />
        <Text>Villa Adriatic</Text>
        <RadioButton
          value="Apartman Palma"
          status={props.checked === 'Apartman Palma' ? 'checked' : 'unchecked'}
          onPress={props.palmaChecked}
          color="orange"
        />
        <Text>Apartman Palma</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <RadioButton
          value="Villa Mare"
          status={props.checked === 'Villa Mare' ? 'checked' : 'unchecked'}
          onPress={props.mareChecked}
          color="orange"
        />
        <Text>Villa Mare</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={stil.tekst}>Broj osoba: </Text>
        <TextInput
          style={stil.txtInput_osobe}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={props.broj}
          value={props.brojValue}
        />
      </View>
      <Text style={stil.tekst}>Datum dolaska i odlaska:</Text>      
      <Kalendar childToParent={props.childToParent} />
      <View style={{ flexDirection: 'row' }}>
        <View style={{ paddingRight: 5 }}>
          <TouchableOpacity
            onPress={() => {
              props.setPosrednik('AirBnb');   
              setOdabran('AirBnb')    
            }}>
            <Image
              style={(odabran === 'AirBnb') ? (stil.slikaLogoOdabran) : (stil.slikaLogo)}
              source={require('../slike/airbnb.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{ paddingRight: 5 }}>
          <TouchableOpacity
            onPress={() => {
              props.setPosrednik('Booking');  
              setOdabran('Booking');
            }}>
            <Image
              style={(odabran === 'Booking') ? (stil.slikaLogoOdabran) : (stil.slikaLogo)}
              source={require('../slike/booking.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{ paddingRight: 5 }}>
          <TouchableOpacity
            onPress={() => {
              props.setPosrednik('Expedia'); 
              setOdabran('Expedia');
            }}>
            <Image
              style={(odabran === 'Expedia') ? (stil.slikaLogoOdabran) : (stil.slikaLogo)}
              source={require('../slike/expedia.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{ paddingRight: 5 }}>
          <TouchableOpacity
            onPress={() => {
              props.setPosrednik('Trip Advisor');
              setOdabran('Trip Advisor');              
            }}>
            <Image
              style={(odabran === 'Trip Advisor') ? (stil.slikaLogoOdabran) : (stil.slikaLogo)}
              source={require('../slike/tripadvisor.png')}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            props.setPosrednik('osobno');
            setOdabran('osobno');
          }}>
          <Image
            style={(odabran === 'osobno') ? (stil.slikaLogoOdabran) : (stil.slikaLogo)}
            source={require('../slike/telefon.png')}
          />
        </TouchableOpacity>
      </View>      
      <Text style={stil.tekst}>Napomena: </Text>
      <TextInput
        placeholder="Upiši tekst..."
        multiline
        numberOfLines={4}
        maxLength={40}
        onChangeText={props.napomena}
        value={props.napomenaValue}
        style={stil.txtInput_napomena}
      />
    </ScrollView>
  );
};

const stil = StyleSheet.create({
  txtInput: {
    width: '95%',
    borderRadius: 10,
    height: 40,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: 'grey',
    textAlign: 'center',
  },
  txtInput_osobe: {
    width: '20%',
    borderRadius: 10,
    height: 40,
    marginBottom: 5,
    borderWidth: 0.5,
    borderColor: 'grey',
    textAlign: 'center',
  },
  txtInput_napomena: {
    width: '95%',
    marginBottom: 5,
    paddingLeft: 5,
    borderWidth: 0.5,
    borderColor: 'grey',
  },
  tekst: {
    fontFamily: 'Cochin',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    marginTop: 5,
  },
  slikaLogo: {
    paddingLeft: 15,
    width: 55,
    height: 55,
    borderRadius: 10,
  },
  slikaLogoOdabran: {
    paddingLeft: 15,
    width: 62,
    height: 62,
    borderColor: '#90EE90',
    borderRadius: 10,
    borderWidth: 3,
    borderStyle: 'dashed',    
  },
});

export default ObrazacUnos;
