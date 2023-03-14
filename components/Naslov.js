import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Naslov = (props) => {
  return (
    <View style={stil.pozadina}>
      <Text style={stil.naslov}>{props.naslov}</Text>
    </View>
  );
};

const stil = StyleSheet.create({
  pozadina: {
    width: '100%',
    height: 80,
    paddingTop: 30,
    paddingBottom:  10,
    backgroundColor: 'navy',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
  naslov: {
    color: 'white',
    fontSize: 26,
  },
});

export default Naslov;
