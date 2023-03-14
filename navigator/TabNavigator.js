import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import PodaciEkran from '../ekrani/PodaciEkran';
import RezervacijeEkran from '../ekrani/RezervacijeEkran';
import UnosEkran from '../ekrani/UnosEkran';
import PocetniEkran from '../ekrani/PocetniEkran';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

const Odjava = (props) => { 
    props.navigation.navigate('Prijava')
}

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Početna"
        component={PocetniEkran}
        options={() => ({tabBarIcon: () => {return <Ionicons name="home" size={25} color="navy" />;},
        })}     
      />
      <Tab.Screen
        name="Unos"
        component={UnosEkran}
        options={() => ({tabBarIcon: () => {return <Ionicons name="add-circle" size={25} color="navy" />;}, 
        })}
      />
      <Tab.Screen
        name="Sve rezervacije"
        component={RezervacijeEkran}
        options={() => ({tabBarIcon: () => {return <Ionicons name="list" size={25} color="navy" />;},    
        })}
      />
      <Tab.Screen
        name="Detalji"
        component={PodaciEkran}
        options={() => ({tabBarIcon: () => {return <Ionicons name="information-circle-sharp" size={25} color="navy"/>},      
        })}
      />
      <Tab.Screen
        name="Odjava"
        component={Odjava}
        options={() => ({tabBarIcon: () => {return <MaterialCommunityIcons name="location-exit" size={25} color="navy" />;},   
        })}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
