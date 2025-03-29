/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
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
  Input,
  FormControl,
  VStack
} from "native-base"

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { View, StyleSheet } from 'react-native';

class ForwardAuction extends Component {

  // const navigation = useNavigation();
  // const [data, setData] = useState([]);
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      anu: [],
      att:[],

    };
  }
  getDta = () => {
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

  anuabhav = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const vanid = await AsyncStorage.getItem('userData');
    const auct = await AsyncStorage.getItem('auctin');

    var raw = JSON.stringify({
      "AUCTION_NO": auct,
      "AUCTION_VENDOR_CODE": JSON.parse(vanid)[0].USER_USER_ID
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://omapi.omlogistics.co.in/api/purchase/getLowestBid", requestOptions)
      .then(response => response.text())
      .then(result => {
        //   console.log(JSON.parse(result).data);
        let extractDta = JSON.parse(result).data
        this.state.data = extractDta
        this.state.att.push(this.state.data);

        console.log(this.state.att);


        const { data } = this.state;
        this.setState(data);
        // console.log(data);
        // console.log(JSON.parse(result).bidRankItem.data);

        let extractDAta = JSON.parse(result).bidRankItem.data
        this.state.anu = extractDAta
        const { anu } = this.state;
        this.setState(anu);
        // console.log(anu);

      }
      )
      .catch(error => console.log('error', error));

  }

  componentDidMount() {
    this.getAuction();
    this.getDta();
    this.anuabhav();
  }




  render() {
    const { data } = this.state;
    return (
      <NativeBaseProvider>
        <ScrollView>
          {data.map((lmm, ppp) => {
            return (
              <View key={ppp} >
                <Center flex={1} px="3"  >
                  <Box style={styles.container}>
                    <Pressable
                      onPress={() => {
                        console.log("Hello world")
                      }}
                    >


                      <Box p="3" rounded={'xl'} bg="#002d56" shadow={'8'} >

                        <HStack alignItems="flex-start">
                          <Text color="#c4c4c0" fontWeight="medium" fontSize={20}>
                            Vender Id-{' '}
                          </Text>
                          <Text

                            style={{ color: '#fff', fontWeight: 'bold' }}
                            fontSize={20}
                          >
                            {/* {this.state.data.AUCTION_BRANCH} */}
                            {lmm.AUCTION_VENDOR_CODE}
                          </Text>
                        </HStack>
                      </Box>
                      <Box p="3"
                        rounded={'xl'}
                        backgroundColor='#fff'
                        borderWidth='1'
                      >
                        <HStack alignItems="flex-start">
                          <Text fontSize={10} fontWeight="bold">
                            Vendor Rate-{' '}
                            <Text
                              mt="2"
                              style={{ color: '#cc080b', fontWeight: 'bold' }}
                            >
                              {lmm.TOTAL_AMT}
                            </Text>
                          </Text>
                          <Spacer />
                          <Text fontSize={12} fontWeight="bold"  highlight >
                            Rank-{' '}
                            <Text
                              mt="2"
                              style={{ color: '#cc080b', fontWeight: 'bold' }}
                            >
                              {lmm.MY_RANK}
                            </Text>
                          </Text>
                        </HStack>
                        <Text mt="3" fontWeight="medium" fontSize={20} style={{ color: "#002d56", fontWeight: 'bold' }}>
                          {lmm.AUCTION_SUB}
                        </Text>
                        <Text mt="2" fontSize={14}  >
                          About Item-{lmm.AUCTION_DESC}
                        </Text>
                        <Divider my="1" />
                        <HStack alignItems="flex-start">


                            <Flex>

                              <Button style={{
                                backgroundColor: "#002d56", borderColor: "#690a03", borderWidth: 2,
                                borderRadius: 4,
                              }} mt={'2'} size={'sm'}  onPress={() => { this.props.navigation.navigate('Bidrank') }} >Details</Button>
                            </Flex>
                            <Divider orientation="vertical" mx="4" />
                            <Spacer />
                            <Text mt="3" fontSize={9} fontWeight="bold" right={'3.5'} alignSelf={'center'} >Total Amt-{' '}</Text>
                            <Text
                              mt="3"
                              style={{ color: '#cc080b', fontWeight: 'bold' }}
                              fontSize={11}
                              right={'3'} alignSelf={'center'}
                            >
                              {lmm.TOTAL_AMT}
                            </Text>
                            <Divider orientation="vertical" mx="1" />
                            <Spacer />
                            <Text mt="5" fontSize={9} right={'4'} fontWeight="bold"  >V.Name-{' '}</Text>
                            <Text
                              mt="1"
                              style={{ color: '#cc080b', fontWeight: 'bold' }}
                              fontSize={11} right={'3.5'} alignSelf={'center'}
                            >
                              {lmm.AUCTION_VENDOR_NAME}
                            </Text>


                            <Flex>
                              {/* <Button style={{
                     backgroundColor: "#002d56", borderColor: "#690a03", borderWidth: 4,
                     borderRadius: 4,
                   }} mt={'2'} size={'sm'} right={'3.5'} alignSelf={'center'} onPress={() =>this.logestics(lose)}>{elm.isSelected ?  "select" : 'press me'}</Button> */}

                            </Flex>
                          </HStack>

                      </Box>
                    </Pressable>
                  </Box>
                </Center>
              </View>
            )
          })}
        </ScrollView>
      </NativeBaseProvider>
    )
  }
}

export default function(props) {
  const navigation = useNavigation();


  return <ForwardAuction {...props} navigation={navigation} />;
}




const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 10,
    paddingBottom: 10,
  },
});
