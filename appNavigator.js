// AppNavigator.js
import React from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/pages/Home';
import ExamPage from './src/pages/ExamPage';
import Review from './src/pages/Review';
import Results from './src/pages/Results';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" 
        component={Home} 
        options={{
          title:'Simulados Anbima',
          headerStyle: {
            backgroundColor: '#222',
          },
          headerTintColor: '#fff'
        }}  
      />
      <Stack.Screen name="ExamPage" component={ExamPage} 
              options={{
                title:'CEA',
                headerStyle: {
                  backgroundColor: '#222',
                },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                headerLeft: () => null
              }}  />
      <Stack.Screen name="Review" component={Review} 
              options={({ navigation }) => ({
                title:'',
                headerStyle: {
                  backgroundColor: '#222',
                },
                headerTintColor: '#fff',
                headerLeft: () => (
                  <Button
                    onPress={() => navigation.navigate('Home')}
                    style={{marginLeft: 10}}
                    title="Retornar para tela principal"
                    color="#222"
                  />
                )
              })}   />
      <Stack.Screen name="Results" component={Results}
              options={{
                title:'Resultados',
                headerStyle: {
                  backgroundColor: '#222',
                },
                headerTintColor: '#fff'
              }}  />
    </Stack.Navigator>
  );
}

export default AppNavigator;