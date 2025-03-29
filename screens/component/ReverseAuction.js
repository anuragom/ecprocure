/* eslint-disable prettier/prettier */
// import * as React from 'react';
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Animated,
  Pressable,
} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { NativeBaseProvider, Box, Text, Center } from 'native-base';
import Footer from './Footer';
import Allauction from './Allauction';



class FirstRoute extends Component {
  render() {
    return (
      <Allauction />
    );
  }
}

const SecondRoute = () => <Center flex={1}><Text bold>Comming Soon..</Text></Center>;

// class SecondRoute extends Component {
//   render() {
//     return (
//       <UpcomingAuction />
//     );
//   }
// }





const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,


});

export default function TabViewExample() {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Today Auction' },
    { key: 'second', title: 'Upcoming Auction' },


  ]);

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          });
          const color = index === i ? '#fff' : '#fff';
          const borderColor = index === i ? '#f7142b' : '#fff';

          return (
            <Box
              borderBottomWidth="1"
              borderColor={borderColor}
              backgroundColor={'#002d56'}
              flex={1}
              alignItems="center"
              p="5"

              cursor="pointer">
              <Pressable
                onPress={() => {
                  console.log(i);
                  setIndex(i);
                }}>
                <Animated.Text style={{ color }}>{route.title}</Animated.Text>
              </Pressable>
            </Box>
          );
        })}
      </Box>
    );
  };

  return (
    <NativeBaseProvider>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      // style={{ marginTop: StatusBar.currentHeight }}
      />
      <Footer />
    </NativeBaseProvider>
  );
}


