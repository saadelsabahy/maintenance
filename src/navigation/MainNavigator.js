import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import {CustomMap} from '../components';


const MainNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
            <Stack.Screen name="Map" component={CustomMap} options={{headerShown: false}} />
        </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator