/* eslint-disable prettier/prettier */



import React,{Component} from "react";
import {
  StyleSheet,
  Text, Image,View,TouchableOpacity,Vibration
} from 'react-native';
import {Pressable,Center,HStack} from 'native-base';
import {useNavigation} from '@react-navigation/native';


export default function Footer() {
  const [selected, setSelected] = React.useState(1);
  const navigation = useNavigation();
     return(
       <View style={styles.foo}>
          <HStack bg="#002d56"  shadow={'8'} alignItems="center" >
         <Pressable
            cursor="pointer"
            opacity={selected === 0 ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => setSelected(0)}
           
            >
            <Center >
              <TouchableOpacity onPress={() => navigation.navigate('ForwardAuction')}>
                  <Image source={require('../assets/home-page.png')} 
                  resizeMode='contain'
                  style={{
                      width:40,
                      height:25,
                      tintColor:selected ? '#ffffff' : '#ffffff'
                    
                  }}></Image>
          
              <Text style={{color:'white',fontWeight:'bold'}}  onPress={() => navigation.navigate('ForwardAuction')} >
               Rank
              </Text>
              </TouchableOpacity>
            </Center>
          </Pressable>
         
          <Pressable
            cursor="pointer"
            opacity={selected === 0 ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => setSelected(0)}
           
            >
            <Center >
              <TouchableOpacity onPress={() => navigation.navigate('ReverseAuction')}>
                  <Image source={require('../assets/RA.png')}
                  resizeMode='contain'
                  style={{
                      width:100,
                      height:25,
                      tintColor:selected ? '#ffffff' : '#ffffff'
                    
                  }}></Image>
          
              <Text style={{color:'white',fontWeight:'bold'}}  onPress={() => navigation.navigate('ReverseAuction')} >
              Reverse Auction
              </Text>
              </TouchableOpacity>
            </Center>
          </Pressable>
          {/* <Pressable
            cursor="pointer"
            opacity={selected === 0 ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => setSelected(0)}
           
            >
            <Center >
              <TouchableOpacity onPress={() => navigation.navigate('ForwardAuction')}>
                  <Image source={require('../assets/FA.png')}
                  resizeMode='contain'
                  style={{
                      width:50,
                      height:25,
                    tintColor:selected ? '#ffffff' : '#fc0303'
                    
                  }}></Image>
          
              <Text style={{color:'white',fontWeight:'bold'}}  onPress={() => navigation.navigate('ForwardAuction')} >
               Ranking
              </Text>
              </TouchableOpacity>
            </Center>
          </Pressable> */}
          <Pressable
            cursor="pointer"
            opacity={selected === 0 ? 1 : 0.5}
            py="2"
            flex={1}
            onPress={() => setSelected(0)}
           
            >
            <Center >
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                  <Image source={require('../assets/man-user.png')} 
                  resizeMode='contain'
                  style={{
                      width:50,
                      height:25,
                      tintColor:selected ? '#ffffff' : '#ffffff'
                    
                  }}></Image>
          
              <Text style={{color:'white',fontWeight:'bold'}}  onPress={() => navigation.navigate('Profile')} >
              Profile
              </Text>
              </TouchableOpacity>
            </Center>
          </Pressable>
          </HStack>
       </View>
     );
   }


const styles = StyleSheet.create({
  foo:{
 
    
    height:60,


  }
})

