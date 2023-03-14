import { View, StyleSheet, Dimensions } from 'react-native';

const WIDTH =Dimensions.get('window').width;
const HEIGHT =Dimensions.get('window').height;

const Okvir = (props) => {
  return (
    <View style={stil.okvir}>
      {props.children}
    </View>
  );
  
};
const stil = StyleSheet.create({
  okvir: {
    flex: 1,
    backgroundColor: 'white',
    alignSelf: 'center',
    width: WIDTH-40,
    minHeight: HEIGHT-700,
    padding: 110,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: 'black',
    shadowRadius: 6,
    shadowOpacity: 2, 
    elevation: 20,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 15,
    paddingTop:20,
    paddingBottom: 15
  },
});

export default Okvir;
