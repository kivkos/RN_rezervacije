import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {
  FontAwesome,
  MaterialIcons,
  Fontisto,
  MaterialCommunityIcons,
  Alert
} from '@expo/vector-icons';
import { useState, useEffect } from 'react';

const ListaElement = (props) => {
  
  const brisi = (id) => {
    fetch('https://brainismelting.online/brisi.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        rezervacija_id: id,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        Alert.alert(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  };
    useEffect(() => {
    brisi();
  }, []);

  return (
    <View>
      <View style={{ flex: 1, flexDirection: 'row', marginBottom: 15 }}>
        <View style={{ flex: 1.2 }}>
          <Fontisto name="holiday-village" size={40} color="orange" />
        </View>
        <View style={{ flex: 4 }}>
          <Text style={{ fontSize: 20, color: '#696969' }}> {props.villa}</Text>
        </View>
        <View style={{ flex: 1 }}>{props.posrednik}</View>
      </View>
      <Text style={stil.ime}>{props.ime}</Text>
      <View style={stil.ime}>
        <FontAwesome name="calendar" size={20} color="black" />
        <Text style={{ fontWeight: 'bold' }}>
          {' '}
          {props.dolazak} - {props.odlazak}
        </Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <MaterialIcons name="groups" size={25} color="black" />
        <Text> {props.broj}</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <MaterialCommunityIcons
          name="note-edit-outline"
          size={20}
          color="black"
        />
        <Text style={{ fontWeight: 'bold' }}>Napomena: </Text>
        <Text>{props.napomena}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <TouchableOpacity>
          <FontAwesome
            name="trash-o"
            size={30}
            color="grey"
            onPress={ () => brisi(props.id)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const stil = StyleSheet.create({
  ime: {
    flexDirection: 'row',
    color: 'navy',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default ListaElement;
