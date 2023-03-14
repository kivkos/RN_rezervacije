import { NavigationContainer } from '@react-navigation/native';
import TabNavigator from './navigator/TabNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PrijavaEkran from './ekrani/PrijavaEkran';
const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Pocetna"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
      <Stack.Screen
          name="Prijava"
          component={PrijavaEkran}
          options={{ headerShown: false }}
        />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
