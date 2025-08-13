import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'; // Добавлено
import Home from "./pages/home";
import SearchPage from "./pages/search";

import './native-modules';
import {store} from "./store";
import {Provider} from "react-redux";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SearchPage" component={SearchPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

