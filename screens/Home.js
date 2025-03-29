
import React, { useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ImageBackground,
  ScrollView,
  Dimensions,
  Text,
  StyleSheet,
  View,
  Image,
  RefreshControl,
  LogBox,
} from 'react-native';
import {
  NativeBaseProvider,
  FormControl,
  Input,
  Button,
  HStack,
  Pressable,
Box
} from 'native-base';
import {useNavigation} from '@react-navigation/native';

const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
LogBox.ignoreAllLogs();
 const Home = (props) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation();
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [code, setCode] = React.useState("");
  const [mydata, setMydata] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [shu,setShu]=React.useState("");

  // useEffect(() => {

  //   const _retrieveData = async () => {
  //      try {
  //        const value = await AsyncStorage.getItem('userData');
  //        if (value !== null) {
  //         navigation.navigate('ReverseAuction') 
           
  //        }else {
  //         navigation.navigate('Home')
  //        }
  //      } catch (error) {
        
  //      }
  //   };

  //      _retrieveData()

  // },[])

  useEffect(()=>{
    removeData()
  },[])


  const removeData = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      

    } catch (error) {
      console.log(error);
    }
  };

  const Anu = async () => {
    if (code != "" & password != "") {
        await fetch('https://omapi.omlogistics.co.in/api/auth/bid_login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "uid": code,
                "pass": password,

            })
        }).then(res =>res.json()).then(async (resp)=>{
          console.log(resp)
          if (resp.error == false) {
            // resp.data.USER_USER_ID = code;
            // console.log(resp.data.USER_USER_ID );
            // console.log(code);
            await AsyncStorage.setItem("userData", JSON.stringify(resp.data));
            const shu =resp.data[0]

            setShu(shu);
            // console.log(shu.USER_USER_CITY)
            props.navigation.navigate('ReverseAuction',{
              itm:1,
            });

            // navigation.navigate('Details', alert([res.user.Name, res.user.COMP_NAME]))
            // await AsyncStorage.setItem('isLoggedIn','1')
            // navigation.navigate('Details')
        } else {
            alert ('Enter Valid Data');
        }
        }).catch(err => console.log(err));
    }
    // const isValid=formvalidation();

    // if(user_id===code && password===password ){
    //     await AsyncStorageStatic.setItem('isLoggedIn','1');

    // }


}



  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (

    <NativeBaseProvider>
      {/* <Text>{code}</Text> */}


      <ScrollView
       keyboardShouldPersistTaps='handled'
        style={{flex: 1, backgroundColor: '#ffffff'}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
          <View style={styles.container}>
        <ImageBackground
          source={require('./assets/bglog.jpg')}
          style={{height: Dimensions.get('window').height / 2.8}}>
          <View style={styles.logo}>
            {/* <CheckCircleIcon size="80px" color="#ffffff" /> */}
            <Image
              source={require('./assets/jk.png')}
              style={styles.img} />
            <Text style={styles.logotext}>OM LOGISTICS LTD</Text>
          </View>
        </ImageBackground>
        <View style={styles.form}>
          <View style={{padding: 30}}>
            <Text style={{color: '#002d56', fontSize: 34,textAlign:'center'}}>Welcome</Text>
            <Text style={{color:'#8c8787',textAlign:'center'}} >
              If you have a Password?
              <Text style={{color: 'red', fontStyle: 'italic',textAlign:'center'}}>
                {' '}
                Login now
              </Text>
            </Text>
            <View style={{marginTop: 50}} >
                <Box alignSelf={'center'}>
              <FormControl isRequired >
                <FormControl.Label _text={{bold: true,color:'#002d56'}}>User ID</FormControl.Label>
                <Input  borderColor={'#002d56'} placeholder="Enter User ID"  value={code}
                            onChangeText={(code) => setCode(code)}   keyboardType='numeric' height={'9'} />
              
              </FormControl >
              <FormControl isRequired mt={'2'} >
                <FormControl.Label _text={{bold: true,color:'#002d56'}}>Password</FormControl.Label>
                <Input
                 borderColor={'#002d56'}
                  type={show ? 'text' : 'password'}
                
                  InputRightElement={
                    <Button
                      size="xs"
                      rounded="none"
                      w="1/6"
                      h="full"
                      background={'#002d56'}
                      onPress={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  }
                  placeholder="Enter Password"
                  height={'9'}

                  onChangeText={(password) => setPassword(password)}
                            value={password}


                />
                {/* {'password' in errors ?
        <FormControl.ErrorMessage _text={{fontSize: 'xs', color: 'error.500', fontWeight: 500}}>Error</FormControl.ErrorMessage>
:

        <FormControl.HelperText _text={{fontSize: 'xs'}}>
        </FormControl.HelperText>
        } */}
              </FormControl>
              {/* <Button
                mt="2"
                style={styles.click}
                onPress={Anu}
                >
                Login
              </Button> */}
              <HStack mt={'3'}>
              <Pressable _pressed={{
        bg: "#868687",
      }} bg="#002d56" py="2" rounded="sm" px="125px" alignSelf="center"
      onPress={Anu} borderColor={'#690a03'} borderWidth={'2'}>
          <Text  fontWeight="bold" style={{color:'#FFFFFF'}}>
         Login
          </Text>
        </Pressable>
        
        </HStack>
        </Box>
              {/* <label>Email-Id</label> */}
              <HStack mt="7" justifyContent="center">
                <Text
                  fontSize="sm"
                  style={{color:'#8c8787'}}
                  _dark={{
                    color: 'red.200',
                  }}>
                  Generate Password.{' '}
                </Text>
                {/* <Link
            _text={{
              color: "indigo.500",
              fontWeight: "medium",
              fontSize: "sm",
            }}
            href="#"
          >
            Sign Up
          </Link> */}
                <Text
                 style={{color: 'red', fontWeight:'bold'}}
                  onPress={() => navigation.navigate('Registration')}
                >
                  Click Me
                </Text>
                {/* <Button size="xs" variant="ghost" colorScheme="secondary">
            SECONDARY
          </Button> */}
              </HStack>
            </View>
          </View>
        </View>
        </View>
      </ScrollView>

    </NativeBaseProvider>
  );
};
export default Home;

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logotext: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  form: {
    flex: 1.5,
    backgroundColor: '#ffffff',
    bottom: 50,
    borderTopStartRadius: 60,
    borderTopEndRadius: 60,
  },
  img: {
    height: 110,
    width: 100,
  },
  click:{

    backgroundColor:'#002d56',
    // TouchableOpacity:0.3,
  },
  scrollView: {
    justifyContent: 'center',
  },
  container:{
    height: '119%',
  } //you can hide this it is use for page height

});

