/* eslint-disable prettier/prettier */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/Home';
import Rerscreen from './screens/Registration';

import MyReverseAuctionscreen from './screens/component/ReverseAuction';
import MyForwordAuction from './screens/component/ForwardAuction';
import Profilescreen from './screens/component/Profile';
import Allauctionscreen from './screens/component/Allauction';
import Myrequestscreen from './screens/component/Myrequest';
import Footerscreen from './screens/component/Footer';
import Bidrankscreen from './screens/component/Bidrank';
import MyTimmscreen from './screens/component/comm/Timm';
import ProfileHelpscreen from './screens/ProfileHelp';



const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Registration"
          component={Rerscreen}
          options={{title: 'Registration Page'}}
        />
        
        <Stack.Screen
          name="ProfileHelp"
          component={ProfileHelpscreen}
          options={{title: 'Help Page'}}
        />
       

        <Stack.Screen
          name="ReverseAuction"
          component={MyReverseAuctionscreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Allauction"
          component={Allauctionscreen}
          options={{headerShown: false}}
        />
         
        <Stack.Screen
          name="ForwardAuction"
          component={MyForwordAuction}
          options={{
            title: 'MIS PAGE',
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: '#002d56',
            
            },headerTitleStyle:{color:'#fff'} }}
        />
        <Stack.Screen
          name="Profile"
          component={Profilescreen}
         
          options={{title: 'Profile'}}
        />

        <Stack.Screen
          name="Footer"
          component={Footerscreen}
          options={{title: 'Footer'}}
        />
         <Stack.Screen
          name="Timm"
          component={MyTimmscreen}
          options={{title: 'Timm'}}
        />
        <Stack.Screen
          name="Myrequest"
          component={Myrequestscreen}
          options={{
            title: 'BIDDING',
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: '#002d56',
            
            },headerTitleStyle:{color:'#fff'} }}
        />
         <Stack.Screen
          name="Bidrank"
          component={Bidrankscreen}
          options={{
            title: 'BID RANK',
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: '#002d56',
            
            },headerTitleStyle:{color:'#fff'} }}
        /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
