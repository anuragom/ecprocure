
import React, { useEffect, useState } from 'react';

import {
  ImageBackground,
  ScrollView,
  Dimensions,
  Text,
  StyleSheet,
  View,
  input
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  NativeBaseProvider,
  FormControl,
  Input,
  Button,
  TextArea,
  Modal,
  HStack,
  Pressable,
  Box,
} from 'native-base';
import { useNavigation } from '@react-navigation/native';

const Registration = () => {
  const navigation = useNavigation();

  const [vid, setVid] = useState("");
  const [reg, setReg] = useState([]);
  const [pass, setPass] = useState("");
  const [passs, setPasss] = useState("")
  const [showModal, setShowModal] = useState(false);
  const MAX_LEN = 15,
    MIN_LEN = 8,
    PASS_LABELS = ["Too Short", "Weak", "Normal", "Strong", "Secure"];





  const Vendid = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "USER_USER_ID": vid,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://omapi.omlogistics.co.in/api/purchase/Detailvender", requestOptions)
      .then(response => response.text())
      .then(async (result) => {
        let extract = JSON.parse(result);
        // console.log(extract.data.error);
        if (extract.data.error == true) {
          alert("Enter Valid User-Id");

        }
        const reg = extract.data.data[0];
        console.log(reg);
        setReg(reg)

      })
      .catch(error => console.log('error', error));
  }

  
  const isSubmitDisabled =
    !pass ||
    !passs ||
    pass !== passs;
  const updatepass = async () => {
    if (pass != "") {
      await fetch('https://omapi.omlogistics.co.in/api/purchase/Updatepassword', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "USER_USER_PASSWORD": pass,
          "USER_USER_ID": vid

        })
      }).then(res => res.json()).then(async (resp) => {
        console.log(resp)
        if (resp.error_status == false) {

          alert('Registration Failed - Enter Details again');


        
        } else {
          navigation.navigate('Home')
          alert("Successfully Genrate Password" + "\n" + " Enter User-Id & Password");
          // alert("Hello again! This is how we"+"\\n"+"add line breaks to an alert box!");
        }
      }).catch(err => console.log(err));
    }
  }
  return (

    <NativeBaseProvider>
      <ScrollView
        style={{ flex: 1, backgroundColor: '#ffffff' }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps='handled'>
        <ImageBackground
          source={require('./assets/bglog.jpg')}
          style={{ height: Dimensions.get('window').height / 12 }}>
          <View style={styles.logo}>
            {/* <CheckCircleIcon size="80px" color="#ffffff" /> */}
            {/* <Image
              source={require('./assets/jk.png')}
              style={styles.img} /> */}
            {/* <Text style={styles.logotext}>Registration Page</Text> */}
          </View>
        </ImageBackground>
        <View style={styles.form}>
          <View style={{ padding: 30, marginTop: 5 }}>
            <Text style={{ color: '#002d56', fontStyle: 'italic' }}>Welcome</Text>
            <Text>
              Generate Password
              <Text style={{ color: 'red', fontSize: 14 }} onPress={() => setShowModal(true)}>
                {' '}
                Help
              </Text>
            </Text>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)} size={'lg'}>
              <Modal.Content maxWidth={'2xl'}>
                <Modal.CloseButton bgColor={'amber.200'} />
                <Modal.Header backgroundColor={'#002d56'} color><Text style={{ color: '#ffffff', fontSize: 18 }}>CONTACT US</Text></Modal.Header>
                <Modal.Body >
                  {/* <FormControl>
              <FormControl.Label>Name</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Email</FormControl.Label>
              <Input />
            </FormControl> */}
                  <Text style={{ fontWeight: 'bold' }}>GET IN TOUCH</Text>
                  <HStack alignItems="flex-start" mt={3}>

                    <Text fontWeight="bold" style={{ color: '#cc080b', fontWeight: 'bold' }}>
                      Mobile No:{' '}
                    </Text>
                    <Text style={{ color: '#242222', fontWeight: 'bold' }}>
                      9211783487
                    </Text>


                  </HStack>
                  <HStack alignItems="flex-start">
                    <Text fontWeight="bold" style={{ color: '#cc080b', fontWeight: 'bold' }}>
                      Landline No:{' '}
                    </Text>
                    <Text style={{ color: '#242222', fontWeight: 'bold' }}>
                      011-45970182
                    </Text>
                  </HStack>
                  <HStack alignItems="flex-start">
                    <Text fontWeight="bold" style={{ color: '#cc080b', fontWeight: 'bold' }}>
                      Email id:{' '}
                    </Text>
                    <Text style={{ color: '#242222', fontWeight: 'bold' }}>
                      purchase8@omlogistics.co.in
                    </Text>
                  </HStack>
                </Modal.Body>
              </Modal.Content>
            </Modal>
            <View style={{ marginTop: 20 }}>
              <Input w="65%" maxW="300px" py="0" value={vid} onChangeText={setVid} borderColor={'#222B45'}
                InputRightElement={
                  //   <Button size="xs" rounded="none" w="1/3" h="full"  background={'#002d56'}
                  //    colorScheme="indigo" onPress={Vendid}>
                  //  Search
                  // </Button>
                  <Pressable _pressed={{
                    bg: "#868687",
                  }} bg="#002d56" py="1" rounded="sm" px="3" alignSelf="center"
                    onPress={Vendid} borderColor={'#8c1c1c'} borderWidth={'2'} >
                    <Text style={{ color: '#ffffff' }}>
                      Search
                    </Text>
                  </Pressable>
                } placeholder="Enter User ID here" />
              {/* <Text>{reg.USER_USER_NAME}</Text> */}


              <FormControl isRequired mt={'1.5'}>
                <FormControl.Label _text={{ bold: true, color: '#002d56' }}>User Name</FormControl.Label>
                <Input placeholder="User Name" borderColor={'#002d56'} value={reg.USER_USER_NAME} isDisabled height={'9'}
                />
              </FormControl>
              <FormControl isRequired mt={'1.5'}>
                <FormControl.Label _text={{ bold: true, color: '#002d56' }}>Company Name</FormControl.Label>
                <Input placeholder="Company Name" borderColor={'#002d56'} value={reg.USER_USER_COMPANY_NAME} isDisabled height={'9'}
                />
              </FormControl>
              <FormControl isRequired mt={'1.5'}>
                <FormControl.Label _text={{ bold: true, color: '#002d56' }}>Email-Id</FormControl.Label>
                <Input type='email' placeholder="xyz@gmail.com" borderColor={'#002d56'} value={reg.USER_USER_EMAIL} isDisabled height={'9'}
                />
              </FormControl>
              <FormControl isRequired mt={'1.5'}>
                <FormControl.Label _text={{ bold: true, color: '#002d56' }}>GSTIN</FormControl.Label>
                <Input placeholder="Gst Number" borderColor={'#002d56'} value={reg.USER_USER_COMPANY_GST_NO} isDisabled height={'9'}

                  maxLength={15} />
              </FormControl>
              <FormControl isRequired mt={'1.5'}>
                <FormControl.Label _text={{ bold: true, color: '#002d56' }}>Mobile No.</FormControl.Label>
                <Input placeholder="Mobile Number" borderColor={'#002d56'} value={reg.USER_USER_MOBILE_NO} isDisabled height={'9'}

                  maxLength={10} />
              </FormControl>
              <FormControl isRequired mt={'1.5'}>
                <FormControl.Label _text={{ bold: true, color: '#002d56' }}>Address</FormControl.Label>
                <TextArea placeholder="User Address" borderColor={'#002d56'} value={reg.USER_USER_ADDRESS} isDisabled
                />
              </FormControl>

              <FormControl isRequired mt={'1.5'}>
                <FormControl.Label _text={{ bold: true, color: '#002d56' }}>state</FormControl.Label>
                <Input placeholder="User State Name" borderColor={'#002d56'} value={reg.USER_USER_STATE} isDisabled height={'9'}
                />
              </FormControl>
              <FormControl isRequired mt={'1.5'}>
                <FormControl.Label _text={{ bold: true, color: '#002d56' }}>City</FormControl.Label>
                <Input placeholder="User City Name" borderColor={'#002d56'} value={reg.USER_USER_CITY} isDisabled height={'9'}
                  isRequired />
              </FormControl >
              <FormControl isRequired mt={'1.5'}>
                <FormControl.Label _text={{ bold: true, color: '#002d56' }}>PinCode</FormControl.Label>
                <Input placeholder="User PinCode" borderColor={'#002d56'}
                  value={reg.USER_USER_PINCODE} isDisabled height={'9'} />
              </FormControl>
              <FormControl isRequired mt={'1.5'}>
                <FormControl.Label _text={{ bold: true, color: '#002d56' }}>User Id</FormControl.Label>
                <Input placeholder="User UserId" borderColor={'#002d56'}
                  value={reg.USER_USER_ID} isDisabled height={'9'} />
              </FormControl >
              <FormControl isRequired mt={'1.5'}>
                <FormControl.Label _text={{ bold: true, color: '#002d56' }}>Password</FormControl.Label>
                <Input placeholder="Enter Password Here" borderColor={'#002d56'} value={pass} onChangeText={setPass} height={'9'}
                />
              </FormControl>
            
              <FormControl isRequired mt={'1.5'}>
                <FormControl.Label _text={{ bold: true, color: '#002d56' }}>Confirm Password</FormControl.Label>
                <Input placeholder="Re-Enter Password Here" borderColor={'#002d56'} value={passs} onChangeText={setPasss} height={'9'} />
              </FormControl>
              <Button
                mt="4"
                size={'md'}
                background={'#002d56'}
                onPress={updatepass}
                colorScheme="indigo"
                isDisabled={isSubmitDisabled}
              >
                Submit
              </Button>
              {/* <Pressable _pressed={{
        bg: "#868687",
      }} bg="#002d56" py="2" rounded="sm" px="125px" alignSelf="center"
      onPress={updatepass} borderColor={'#690a03'} borderWidth={'2'}  mt="4">
          <Text  fontWeight="bold" style={{color:'#FFFFFF'}}>
         Login
          </Text>
        </Pressable> */}


            </View>
          </View>
        </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};
export default Registration;

const styles = StyleSheet.create({
  logotext: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    justifyContent: 'center',
    alignItems: 'center',
    left: 32,
  },
  form: {
    flex: 1.5,
    backgroundColor: '#ffffff',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
  img: {
    height: 55,
    width: 60,
    left: 145,
    bottom: 4,
  },
  ssll: {
    width: 60,

  }
});
