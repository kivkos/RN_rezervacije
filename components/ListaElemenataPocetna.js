import { View, Text, StyleSheet } from 'react-native';
import {
  MaterialCommunityIcons,
  Fontisto,
} from '@expo/vector-icons';

const ListaElemenataPocetna = (props) => {
  return (
    <View>
      <View style={stil.okvir}>
        <Fontisto name="holiday-village" size={25} color="orange" />
        <Text style={{ fontSize: 20, color: '#696969' }}> {props.smjestaj}</Text>
      </View>
      <View style={stil.okvir}>
        <MaterialCommunityIcons name="human-greeting" size={30} color="grey" />
        <Text style={stil.ime}>
          {'  '}
          {props.ime}
        </Text>
      </View>
    </View>
  );
};

const stil = StyleSheet.create({
  ime: {
    color: 'navy',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  okvir: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});

export default ListaElemenataPocetna;
