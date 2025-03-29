/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
} from 'react-native';
import { Button, NativeBaseProvider, Box } from 'native-base';


import { useNavigation } from '@react-navigation/native';
import Footer from "./Footer";
const UserProfileView = () => {
  const navigation = useNavigation();
  const [dta, setDta] = useState('');
  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      navigation.navigate('Home');

    } catch (error) {
      console.log(error);
    }
  };
  const getDta = () => {
    try {
      AsyncStorage.getItem('userData').then(value => {
        // if (value != null) {
        //   this.itemcode(JSON.parse(value));
        // console.log(JSON.parse(value)[0].USER_USER_ID);
        // }
      });
    } catch (error) {
      console.log(error);
    }
  };




  useEffect(() => {
    getDta();
    (async () => {
      var myHeaders = new Headers();
      const vanid = await AsyncStorage.getItem('userData');
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        "USER_USER_ID": JSON.parse(vanid)[0].USER_USER_ID
      });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      fetch("https://omapi.omlogistics.co.in/api/purchase/vendor_profile", requestOptions)
        .then(response => response.text())
        .then(async (result) => {
          let extractD = JSON.parse(result);
          const dta = extractD.data.data[0]
          setDta(dta);
          console.log(dta);
          console.log(dta.USER_USER_NAME);
        }
        )
        .catch(error => console.log('error', error));
    })();
  }, []);

  // shu[0].USER_USER_CITY

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image style={styles.avatar}
              source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar6.png' }} />

            <Text style={styles.name}>{dta.USER_USER_NAME} </Text>
            <Text style={styles.userInfo}>{dta.USER_USER_EMAIL}</Text>
            <Button marginTop={'1'} background={'#002d56'} style={{
              backgroundColor: "#778899", borderColor: "#690a03", borderWidth: 4,
              borderRadius: 4,
            }} onPress={removeData}>Logout</Button>
                  {/* <Pressable _pressed={{
        bg: "#868687",
      }} bg="#002d56" py="2" rounded="sm" px="3" alignSelf="center"
      onPress={removeData} borderColor={'#690a03'} borderWidth={'2'}>
          <Text  fontWeight="bold" color="white">
          Logout
          </Text>
        </Pressable> */}
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.body1}>

            <Grid>
              <Col >
                <Box width="90%" height="20%" bg="#dededc" top={'1.5'} left={'1.5'} borderRadius={'lg'} mt={'2'}
                  shadow={'9'} _text={{
                    fontSize: "md",
                    fontWeight: "bold",
                    color: "white"
                  }} >
                  <Text style={styles.text}>Vender-Id</Text><Text style={styles.text1}>{dta.USER_USER_ID}</Text>
                </Box>
                <Box width="90%" height="20%" bg="#dededc" top={'1.5'} left={'1.5'} borderRadius={'lg'} mt={'5'}
                  shadow={'9'} _text={{
                    fontSize: "md",
                    fontWeight: "bold",
                    color: "white"
                  }} >
                  <Text style={styles.text3}>Company</Text><Text style={styles.text1}>{dta.USER_USER_COMPANY_NAME}</Text>
                </Box>
                <Box width="90%" height="20%" bg="#dededc" top={'1.5'} left={'1.5'} borderRadius={'lg'} mt={'5'}
                  shadow={'9'} _text={{
                    fontSize: "md",
                    fontWeight: "bold",
                    color: "white",
                  }} >
                  <Text style={styles.text}>Contact Number</Text><Text style={styles.text1}>{dta.USER_USER_MOBILE_NO}</Text>
                </Box>
              </Col>
              <Col>
                <Box width="90%" height="20%" bg="#dededc" top={'1.5'} left={'1.5'} borderRadius={'lg'} mt={'2'}
                  shadow={'9'} _text={{
                    fontSize: "md",
                    fontWeight: "bold",
                    color: "white",
                  }} >
                  <Text style={styles.text2}>GST Number</Text><Text style={styles.text1}>{dta.USER_USER_COMPANY_GST_NO}</Text>
                </Box>
                <Box width="90%" height="20%" bg="#dededc" top={'1.5'} left={'1.5'} borderRadius={'lg'} mt={'5'}
                  shadow={'9'} _text={{
                    fontSize: "md",
                    fontWeight: "bold",
                    color: "white"
                  }} >
                  <Text style={styles.text}>State</Text><Text style={styles.text1}>{dta.USER_USER_CITY}</Text>
                </Box>
                <Box width="90%" height="20%" bg="#dededc" top={'1.5'} left={'1.5'} borderRadius={'lg'} mt={'5'}
                  shadow={'9'} _text={{
                    fontSize: "md",
                    fontWeight: "bold",
                    color: "white"
                  }} >
                  <Text style={styles.text4}>Address</Text><Text style={styles.text1}>{dta.USER_USER_ADDRESS}</Text>
                </Box>
              </Col>
            </Grid>

          </View>
         
        </View>
        <Footer />
      </View>
    </NativeBaseProvider>
  );
};
export default UserProfileView;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#002d56",
    height: 265
  },
  headerContent: {
    padding: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "#ffffff",
    fontWeight: '600',
    // fontFamily:'italic'
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: '600',
  },
  body: {
    // backgroundColor: "#002d56",
    // height:500,
    alignItems: 'center',
  },
  body1: {
    // backgroundColor: "#002d56",
    height: 373,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize:15,
    marginTop: 20,
    color: "#FFFFFF",
  },
  text: {
    fontSize:15,
    marginTop: 0,
    marginLeft: 10,
    color: "#140106"
  },
  text1: {
    color: "#5c0e23",
    fontSize: 11,
    marginTop: 1,
    marginLeft: 10,

  },
  text2: {
    fontSize:15,
    marginTop: 0,
    marginLeft: 10,
    color: "#140106"
  },
  text3: {
    fontSize:15,
    marginTop: 5,
    marginLeft: 10,
    color: "#140106"
  },
  text4: {
    fontSize:15,
    marginTop: 5,
    marginLeft: 10,
    color: "#140106"
  },
  butt: {
    color: "red"
  }
});
