
import React, { Component } from "react";
import {
  Pressable,
  Text,
  Box,
  HStack,
  Spacer,
  Flex,
  Center,
  NativeBaseProvider,
  Divider,
  Button,
  ScrollView,
  Heading,
  Link
} from "native-base";


// import io from 'socket.io-client/dist/socket.io';
// const socket = io('http://192.168.116.35:8085');


// socket.on('connect',()=>{
// console.log('Anu');
// });

// socket.on('connect', () => {
//   console.log('Socket Connect' + socket.id);
// });


import { useNavigation } from '@react-navigation/native';

import { View, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// window.navigator.userAgent = 'react-native';

class App extends Component {

  // const navigation = useNavigation();
  // const [data, setData] = useState([]);
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      data: [],
      dataa: [],
      itemcode: '',
      anu: [],
      att: [],
      name: 'Anubhav',


    };
    // this.socket = io('https://omapi.omlogistics.co.in', {jsonp: false});
    // this.socket  = io('localhost:8085',{jsonp: false});
    // this.socket.on('update',()=>this.setState({name:'Tripathi'}))
  }



  getAuction = () => {
    try {
      AsyncStorage.getItem('auctin').then(value => {
        // if (value != null) {
        //   this.itemcode(JSON.parse(value));
        // console.log(JSON.parse(value)[0].USER_USER_ID);
        // }
      });
    } catch (error) {
      console.log(error);
    }
  };
  getData = () => {
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
  /////bid rank by subject
  anuabhav = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const vanid = await AsyncStorage.getItem('userData');
    const auct = await AsyncStorage.getItem('auctin');

    var raw = JSON.stringify({
      "AUCTION_NO": auct,
      "AUCTION_VENDOR_CODE": JSON.parse(vanid)[0].USER_USER_ID,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch("https://omapi.omlogistics.co.in/api/purchase/getLowestBid", requestOptions)
      .then(response => response.text())
      .then(result => {
        //   console.log(JSON.parse(result).data);
        let extractDta = JSON.parse(result).data;
        this.state.dataa = extractDta;
        this.state.att.push(this.state.dataa);

        // console.log(this.state.att);


        const { dataa } = this.state;
        this.setState(dataa);
        console.log(dataa);


        let extractDAta = JSON.parse(result).bidRankItem.data;
        this.state.anu = extractDAta;
        const { anu } = this.state;
        this.setState(anu);

      }
      )
      .catch(error => console.log('error', error));

  }





  //////////




  initial = async () => {
 

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const valId = await AsyncStorage.getItem('userData');
    console.log(JSON.parse(valId)[0].USER_USER_ID);

    var raw = JSON.stringify({
      "AUCTION_VENDOR_CODE": JSON.parse(valId)[0].USER_USER_ID,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch("https://omapi.omlogistics.co.in/api/purchase/auctionSub", requestOptions)
      .then(response => response.text())
      .then(async (result) => {
        
        let extractDta = JSON.parse(result);
       
        this.showModal = false;

        this.state.data = extractDta.data.data;


        const { data } = this.state;
        this.setState(data);
      })
      .catch(error => console.log('error', error));

    let arr = this.state.data.map((el, los) => {
      el.isSelected = false;
      return { ...el };
    });
    this.setState({ data: arr });
  }

  componentDidMount() {
    //  const socket  = io('http://192.168.116.35:8085');
    console.log("anubhav");

    this.getAuction();
    this.getData();
    this.initial();
    this.anuabhav();
  }

  Final = (ind, AucNo) => {
    console.log(AucNo);
    const { data } = this.state;
    // eslint-disable-next-line no-unused-vars
    const { navigation } = this.props;
    let arr = data.map((el, los) => {
      if (ind == los) {
        el.isSelected = this.props.navigation.navigate('Myrequest', {
          auctionNo: AucNo,
        });
        // console.log(AucNo);
      }
      return { ...el };
    });

    this.setState({ data: arr });
  }

  refrees() {
    this.initial();
    this.anuabhav();
  }

  render() {
    const { data } = this.state;
    const { dataa } = this.state;
    return (

      <NativeBaseProvider>
        <Box style={styles.refreess} >
          <HStack alignItems="flex-start">
            <Heading size="lg" mt="1" px="3" color={'#002d56'}>
              {/* Bid Details */}
              Bid Details

            </Heading>
            <Spacer />

            {/* <Button mt="1" px="3" mx="10"
              style={{
                backgroundColor: "#690a03",
                borderColor: "#690a03",
              }}
              variant={"solid"} onPress={() => this.refrees()}> Refresh </Button> */}

            <Pressable _pressed={{
              bg: "#2b1414",
            }} bg="#9e0b06" py="2" rounded="sm" alignSelf="center" onPress={() => this.refrees()} mt="1" px="3" mx="10">
              <Text fontWeight="bold" color="white">
                Refresh
              </Text>
            </Pressable>





          </HStack>
        </Box>

        {this.showModal ? (
          <ActivityIndicator
            visible={this.showModal}
            //Text with the Spinner
            textContent={'Loading...'}
          />
        ) : (<ScrollView>
          {data.map((el, los) => {
            return (
              <View key={los}>
                <Center flex={1} px="3"  >
                  <Box style={styles.container}>
                    <Pressable
                      onPress={() => {
                        console.log("Hello world");
                      }}
                    >


                      <Box p="3" rounded={'xl'} bg="#002d56" shadow={'8'} >
                        <HStack alignItems="flex-start">

                          <Text color="cyan.50" fontWeight="medium" fontSize={16}>
                            {el.AUCTION_NO} ({el.AUCTION_SUB})
                          </Text>
                          <Spacer />
                          {dataa.map((lmm, index) => {
                            return (
                              <View key={index}>
                                <Text fontSize={14} fontWeight="bold" color={'#C5CEE0'} >
                                  Rank-{' '}
                                  <Text
                                    mt="2"
                                    style={{ color: '#FFFFFF', fontWeight: 'bold' }}
                                  >
                                    {lmm.MY_RANK}
                                  </Text>
                                </Text>
                              </View>
                            );
                          })}

                        </HStack>
                      </Box>
                      <Box p="3"
                        rounded={'xl'}
                        backgroundColor="#fff"
                        borderWidth="1"
                        mt={'0.5'}
                      >
                        <HStack alignItems="flex-start">
                          <Text fontSize={16} fontWeight="bold">
                            Bid Date-{' '}
                          </Text>
                          <Text fontSize={16}
                            style={{ color: '#9e0b06', fontWeight: 'bold' }}
                          >
                            {el.AUCTION_START_DATE}
                          </Text>
                          <Spacer />
                          <Text fontSize={16} fontWeight="bold">
                            StartTime-{' '}
                            <Text
                              mt="2"
                              fontSize={16}
                              style={{ color: '#9e0b06', fontWeight: 'bold' }}
                            >
                              {el.AUCTION_START_TIME}
                            </Text>
                          </Text>
                        </HStack>
                        <Text mt="3" fontWeight="medium" fontSize={18} style={{ color: "#002d56", fontWeight: 'bold' }}>
                          Bid Description
                        </Text>
                        <Text mt="2" fontSize={16} >
                          {el.AUCTION_DESC}
                        </Text>
                        <Divider my="1" />
                        <HStack alignItems="flex-start">
                          <Pressable _pressed={{
                            bg: "#868687",
                          }} bg="#002d56" py="2" rounded="sm" px="3" alignSelf="center"
                            onPress={() => this.Final(los, el.AUCTION_NO)} borderColor={'#690a03'} borderWidth={'2'}>
                            <Text fontWeight="bold" color="white">
                              {el.isSelected ? 'selected' : 'Live Bid'}
                            </Text>
                          </Pressable>
                        
                          <Flex>
                           
                            {/* <Button style={{
                              backgroundColor: "#002d56", borderColor: "#690a03", borderWidth: 2,
                              borderRadius: 4,
                            }} mt={'2'} size={'sm'} onPress={() => this.Final(los, el.AUCTION_NO)}>
                              {el.isSelected ? 'selected' : 'Bid Now'}</Button> */}


                            {/* <Pressable _pressed={{
      bg: "primary.800"
    }} bg="#002d56"    mt={'2'} size={'sm'}
     onPress={() => this.Final(los, el.AUCTION_NO)}  >
        <Text textTransform="uppercase" fontWeight="bold" color="white">
        {el.isSelected ? 'selected' : 'Bid Now'}
        </Text>
      </Pressable> */}

                          </Flex>
                          <Spacer />
                          <Spacer />
                          <Divider orientation="vertical" mx="1" />
                          {/* <Link  mt={'2'} href="http://omsanchar.omlogistics.co.in/oracle/eProcure/22000032.pdf" > */}
                          <Link  mt={'2'} href="#" >
                             <Text bold color={'#868687'}> Term & Condition</Text>
                             
                            </Link>
                            <Divider orientation="vertical" mx="1" />
                          <Spacer />
                        
                        
                          <Spacer />
                        
                            <Text mt="2" right={'56'} fontSize={16} fontWeight="bold"  >EndTime-{' '}</Text>
                          <Text
                            mt="2"
                            fontSize={16}
                            style={{ color: '#9e0b06', fontWeight: 'bold' }}
                          >
                            {el.AUCTION_BID_DURATION} Min
                          </Text>
                        </HStack>
                      </Box>
                    </Pressable>
                  </Box>
                </Center>
              </View>
            );
          })}




        </ScrollView>)}


      </NativeBaseProvider>
    );
  }
}

export default function (props) {
  const navigation = useNavigation();


  return <App {...props} navigation={navigation} />;
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 10,
    paddingBottom: 10,
  },

});
