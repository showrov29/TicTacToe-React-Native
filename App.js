import 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Game from "./src/components/Game";
import {Provider} from "react-redux";
import store from "./src/redux/store";

const Stack = createStackNavigator();


export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    mode={'modal'}
                    headerMode={"float"}
                    screenOptions={{
                        headerTitleAlign: 'center', // Center the title
                      }}
                >
                    <Stack.Screen
                        name={'Game'}
                        component={Game}
                        
                        options={{
                            animationTypeForReplace: 'push',
                            title: 'Tic-Tac-Toe',
                            headerStyle: {
                                // backgroundColor: 'transparent',
                                alignContent: 'center',
                                justifyContent: 'center',
                                
                            },
                        }}
                    />
                </Stack.Navigator>
                <StatusBar style={'auto'}/>
            </NavigationContainer>
        </Provider>
    );
}


