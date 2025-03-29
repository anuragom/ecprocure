/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable no-alert */
/* eslint-disable semi */
/* eslint-disable jsx-quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */

import React, { Component, createContext } from "react";
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
  FormControl,
  Modal,
  Input,
  VStack
} from "native-base"

// import {Modal} from "react-native";
// import Moment from 'moment';
import moment from "moment";
// import Timmer from "./Timmer";
import Timm from "./comm/Timm";



const {height,width} = Dimensions.get('window')
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { View, StyleSheet, Dimensions } from 'react-native';
import Footer from "./Footer";



class Myrequest extends Component {
  // const navigation = useNavigation();
  // const [data, setData] = useState([]);
  // const [bidd,setBidd] = useState(false);
  // const [loo,setLoo] = useState('');
  // const [showModal,setShowModal] =useState(false);

  constructor(props) {
    super(props)
    this.state = {

      showModal: false,
      data: [],
      loo: "",
      bidd: "0",
      tex: "",
      omm: [],
      oml: " ",
      pune: [],
      timeleft: [],
      tleft: "",
      activetime: [],
      isshoww: false,
      pun: [],
      del: "",
      least: [],
      timmers: [],
      widthss: []
    };
  }

////width

screenwidth =()=>{
  // setWidths(Dimensions.get('window').width);
  // console.log(Dimensions.get('window').width);
  this.state.widthss = Dimensions.get('window').width;
  console.log(this.state.widthss);
  // const { widthss } = this.state;
  // this.setState(this.state.widthss);
  // console.log(this.state.widthss);
  // console.log(widthss);
  // console.log(widths);
  // console.log({
  //   width: Dimensions.get('window').width,
  //   height: Dimensions.get('window').height
  // })
}


/////



  // Alla=async()=>{
  //   const userData = await AsyncStorage.getItem('userData');
  //   console.log(userData);
  // }
  getData = () => {
    try {
      AsyncStorage.getItem('userData').then(value => {
        // if (value != null) {
        //   this.itemcode(JSON.parse(value));
        // console.log(JSON.parse(value)[0].USER_USER_ID);
        // }
      });
    } catch (error) {
      // console.log(error);
    }
  };

  lowestrate = async () => {
    const { auctionNo } = this.props.route.params;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "AUCTION_NO": auctionNo
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://omapi.omlogistics.co.in/api/purchase/venderLowestPrice", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(JSON.parse(result).data.data);
        // console.log(JSON.parse(result).data);
        let extractDta = JSON.parse(result).data.data;
        this.state.del = extractDta;
        const { del } = this.state;
        this.setState(del);






      }
      )
      .catch(error => console.log('error', error));
  }

  shubham = async () => {
    var ltt = [];
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const vanid = await AsyncStorage.getItem('userData');
    const { auctionNo } = this.props.route.params;

    var raw = JSON.stringify({
      "AUCTION_NO": auctionNo,
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

        let extractDAta = JSON.parse(result).bidRankItem.data
        // console.log(extractDAta);
        this.state.omm = extractDAta
        const { omm } = this.state;
        this.setState(omm);
        let duedata = JSON.parse(result).checkEndTime.data
        this.state.pun = duedata
        const { pun } = this.state;
        this.setState(pun);




      })
      .catch(error => console.log('error', error));

  }

  // componentDidUpdate(){
  //   this.componentDidMount()
  //   console.log('componentDidUpdate');
  // }
  // componentWillUnmount(){
  //   this.componentDidMount()
  //   console.log('componentWillUnmount');
  // }
  // componentDidCatch(){
  //   this.componentDidMount()
  //   console.log('componentDidCatch');
  // }


  componentDidMount() {

    this.screenwidth();
    console.log(this.timmers);
    // setInterval(() => {
    this.biddingtime();
    // },1000)
    this.getData();

    this.shubham();
    // this.lowestrate();
    const { auctionNo } = this.props.route.params;
    // console.log(auctionNo);


    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ auctionNo })
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };


    fetch("https://omapi.omlogistics.co.in/api/purchase/Detailauction", requestOptions)
      .then(response => response.text())
      .then(async (result) => {

        let extractDta = JSON.parse(result);
        this.state.data = extractDta.data.data;
        // console.log(this.state.data[0].AUCTION

        await AsyncStorage.setItem("auctin", JSON.stringify(this.state.data[0].AUCTION_NO));
        // setData(abc);
        const { data } = this.state;
        this.setState(data)
        // data.map(resp => {
        //   resp['input'] = 0
        // });
        // console.log(data);
      })
      .catch(error => console.log('error', error));

    let arr = this.state.data.map((elm, lose) => {
      elm.isSelected = false
      return { ...elm };
    })
    this.setState({ data: arr })


    setInterval(() => {
      this.shubham();
    }, 5000);

  }
  getAuction = () => {
    try {
      AsyncStorage.getItem('auctin').then(value => {

      });
    } catch (error) {
      console.log(error);
    }
  };

  logestics = (ind, ItmC, inpu) => {
    const { data } = this.state;
    const { bidd } = this.state;
    console.log("Anu", ItmC);
    let arr = data.map((elm, lose) => {
      if (ind == lose && (inpu <= elm.AUCTION_BID_START_PRICE)) {

        // console.log(bidd);
        elm.isSelected = this.enterbid(lose, ItmC, inpu)
        // elm.isSelected=this.setState({ showModal: true})
        // console.log(inpu);
      }
      return { ...elm };
    })

    this.setState({ data: arr })
  }
  // const simpleAlertHandler = () => {

  //   alert('BID Successfull');
  // };



  // =====forbid====

  // =====forbid====

  //  const submit = ()=>{
  // alert("hey")
  //   }
  // const Anubh=(ind)=>{
  //     // const{data}=this.state;
  //     let arr = data.map((elm,lose)=>{
  //       if(ind == lose ){
  //         elm.isSelected = !elm.isSelected
  //       }
  //       return {...elm};
  //     })

  //     setData({data:arr})
  //   }

  // handleInputTextChange = (newText,ind) => {
  //   this.setState({ bidd: newText })
  // }
  // handleInputChange = (inder) => {
  //   const{data}=this.state;
  //   let arr = data.map((elm,lose)=>{
  //     if(inder == lose ){
  //       this.setState({ bidd: arr })

  //     }

  //     })
  //   }

  increment = async (index, dta) => {
    if (dta.INPUTVAL != dta.AUCTION_BID_START_PRICE) {
      //  console.log(dta);
      dta.INPUTVAL = Number(dta.INPUTVAL) + Number(dta.AUCTION_MIN_DECR_AMT)
      await this.setState({
        [dta.INPUTVAL]: dta.INPUTVAL
      });
      // this.handleInputTextChange(dta,dta.input)
    } else {
      alert('Invalid Amount')
    }


  }

  decrement = async (index, dta) => {

    // if(dta.INPUTVAL < 0){
    //   await this.setState({
    //     [dta.INPUTVAL]: dta.INPUTVAL
    //   });
    // }else {
    //   dta.INPUTVAL = Number(dta.INPUTVAL) - Number(dta.AUCTION_MIN_DECR_AMT)
    //   this.setState({
    //     [dta.INPUTVAL]: dta.INPUTVAL
    //   });
    // }
    if (dta.INPUTVAL > (dta.AUCTION_MIN_DECR_AMT)) {
      dta.INPUTVAL = Number(dta.INPUTVAL) - Number(dta.AUCTION_MIN_DECR_AMT)
      await this.setState({
        [dta.INPUTVAL]: dta.INPUTVAL
      });
    }
  }

  handleInputTextChange = (ind, val) => {
    // let bidd = ' '
    // const{data}=this.state;
    // let arr = data.filter(res => res.AUCTION_ITEM_CODE == itmCode);
    // // console.log(arr);
    // bidd=newText

    // let arr = data.filter(elm=>{
    //   if(ren == newText ){
    //     bidd.push(ren)
    //   }else{
    //     bidd.push(this.state.bidd[lose])
    //   }
    // })

    const { data } = this.state;
    let arr = data.map((elm, lose) => {
      if (ind == lose) {
        elm.isSelect = val
        this.setState({ bidd: val })
      }
    })

  }
  enterbid = async (lose, ItmC, inpu) => {

    //  console.log(ItmC)
    //  console.log(inpu);
    // eslint-disable-next-line eqeqeq
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const { auctionNo } = this.props.route.params;
    const vanid = await AsyncStorage.getItem('userData');
    console.log(auctionNo);

    var raw = JSON.stringify({
      "vendorRate": inpu,
      "auctionNo": auctionNo,
      "itemCode": ItmC,
      "AUCTION_VENDOR_CODE": JSON.parse(vanid)[0].USER_USER_ID
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://omapi.omlogistics.co.in/api/purchase/bidrate", requestOptions)
      .then(response => response.text())

      .then((result) => {
        // console.log(inpu);
        this.state.oml = inpu;
        // this.state.oml = inpu;
        // console.log(this.state.oml);

        //  console.log(result.error);
        if (!result.error) {
          // console.log(auctionNo);
          // console.log(JSON.parse(vanid)[0].USER_USER_ID);



          this.shubham()

          //lowest Bid
          // setInterval(() => {
          //   var raw = JSON.stringify({
          //     "AUCTION_NO": auctionNo,
          //     "AUCTION_ITEM_CODE": ItmC
          //   });

          //   var requestOptions = {
          //     method: 'POST',
          //     headers: myHeaders,
          //     body: raw,
          //     redirect: 'follow'
          //   };

          //   fetch("https://omapi.omlogistics.co.in/api/purchase/venderLowestPrice", requestOptions)
          //     .then(response => response.text())
          //     .then(result => {
          //       // console.log(JSON.parse(result).data.data);
          //       console.log(JSON.parse(result).data.data);
          //       let extractDta = JSON.parse(result).data.data[0];
          //       this.state.del = extractDta;
          //       const { del } = this.state;
          //       this.setState(del);
          //       console.log(del);
          //       // console.log(del.MIN(AUCTION_VENDOR_RATE))






          //     }
          //     )
          //     .catch(error => console.log('error', error));
          // }, 3000);
          alert("Bid Successfull")
          // console.log(inpu);


        } else {
          alert("Invalid Rate")

        }
        // var myHeaders = new Headers();
        // myHeaders.append("Content-Type", "application/json");

        // var raw = JSON.stringify({
        //   "AUCTION_NO": auctionNo,
        //   "AUCTION_ITEM_CODE": ItmC
        // });

        // var requestOptions = {
        //   method: 'POST',
        //   headers: myHeaders,
        //   body: raw,
        //   redirect: 'follow'
        // };

        // fetch("https://omapi.omlogistics.co.in/api/purchase/venderLowestPrice", requestOptions)
        //   .then(response => response.text())
        //   .then(result => {
        //     // console.log(JSON.parse(result).data.data);
        //     console.log(JSON.parse(result).data.data);
        //     let extractDta = JSON.parse(result).data.data[0];
        //     this.state.del = extractDta;
        //     const { del } = this.state;
        //     this.setState(del);
        //     console.log(del);
        //     // console.log(del.MIN(AUCTION_VENDOR_RATE))






        //   }
        //   )
        //   .catch(error => console.log('error', error));
      })
      .catch(error => console.log('error', error));
  }
  //   myFunction = () => {
  //     const{data}=this.state;
  //     this.seState([ data]

  //     )
  // }
  refree() {

    this.shubham()
    this.biddingtime()
  }

  //////

  biddingtime = async () => {
    
      const vanid = await AsyncStorage.getItem('userData');
      const { auctionNo } = this.props.route.params;
      setInterval(() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        var raw = JSON.stringify({
          "AUCTION_NO": auctionNo,
          "AUCTION_VENDOR_CODE": JSON.parse(vanid)[0].USER_USER_ID
        });
        
        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };
        
        fetch("https://omapi.omlogistics.co.in/api/purchase/bidTimmer", requestOptions)
          .then(response => response.text())
          .then(result =>{
            // console.log("pro",result);
            let arr = JSON.parse(result)
            // console.log(arr.data.data);
            let finaltime = arr.data.data
            this.state.timmers = finaltime
            const { timmers } = this.state;
            this.setState(timmers);
            console.log("anu", timmers);
          })
          .catch(error => console.log('error', error));
    }, 1000);
  
  }


  render() {

    const { data } = this.state;
    const { timmers } = this.state;
    const { omm } = this.state;
    const { pune } = this.state;
    const { pun } = this.state;
    const { del } = this.state;
    const { auctionNo } = this.props.route.params;
    // console.log("Anu"+this.props.Data);

    // const isshow = this.state.isshoww
    return (
      <NativeBaseProvider>
        <Box style={styles.refreess} >
          <HStack alignItems="flex-start">
            <Heading size='md' mt="3" px="3" color={'#002d56'}>
              AucNo- {JSON.stringify(auctionNo)}

            </Heading>
            <Spacer />
            {/* <Button mt="1" px="3" mx='10' style={{ backgroundColor: "#690a03",r
           borderColor: "#690a03", }}
           variant={"solid"} onPress={() => this.refree()}>Refresh</Button> */}
            <Text mt={'3'} fontWeight={'semibold'}>The Page will Refresh in <Text fontWeight={'extrabold'}>5 Seconds</Text>  Or click on Button</Text>


            <Pressable _pressed={{
              bg: "#2b1414",
            }} bg="#9e0b06" py="2" rounded="sm" alignSelf="center"
              onPress={() => this.refree()} mt="1" px="3" mx="10">
              <Text fontWeight="bold" color="white">
                Refresh
              </Text>
            </Pressable>

          </HStack>

          {/* {JSON.stringify(data)} */}
        </Box>


        <ScrollView>
          {data.map((elm, lose) => {
            return (
              <View key={lose}>
                <Center flex={1} px="3">
                  <Box style={styles.container}>
                    <Pressable
                      onPress={() => {
                        // console.log(elm);
                      }}
                    >
                      <Box p="3" rounded={'xl'} bg="#002d56" shadow={'8'} >

                        <HStack alignItems="flex-start">
                          <Text color="#c4c4c0" fontWeight="medium" fontSize={15}>
                            Item Code-{' '}
                          </Text>
                          <Text

                            style={{ color: '#fff', fontWeight: 'bold' }}
                            fontSize={17}
                          >
                            {elm.AUCTION_ITEM_CODE}

                          </Text>

                          <Spacer />

                          {pun.map((anuu, trii) => {
                            return (
                              <View color={"#f51000"} key={trii}>


                                {anuu.AUCTION_ITEM_CODE == elm.AUCTION_ITEM_CODE ? (
                                  <Text bold color={"#ebf067"} fontSize={15}>
                                    {anuu.BID_STATUS}
                                  </Text>) : null}

                              </View>
                            )
                          })}

                        </HStack>


                      </Box>
                      <Box p="3"
                        rounded={'xl'}
                        backgroundColor='#fff'
                        borderWidth='1'
                        mt={'0.5'}
                      >
                        <HStack alignItems="flex-start">
                          {omm.map((elt, lot) => {
                            return (


                              <VStack key={lot}>


                                {elt.AUCTION_ITEM_CODE == elm.AUCTION_ITEM_CODE ? (

                                  <View >
                                    <HStack alignItems="flex-start" >

                                      <Text fontWeight={'extrabold'} mt="1" fontSize={20}  >
                                        Rank-{' '}
                                      </Text>
                                      <Text
                                        fontWeight={'extrabold'}
                                        fontSize={20} 
                                        mt="1"
                                        style={{ color: '#cc080b' }}

                                      >


                                        {elt.RKN == 1 && elt.RKN ? (
                                          <Text fontSize={'lg'} color={'#228c0a'} > {elt.RKN}</Text>
                                        ) : <Text fontSize={'lg'} color={'#cc080b'}>{elt.RKN}</Text>}

                                      </Text>




                                    </HStack>
                                    <View >

                                      {/* <HStack>
                                        <Text mt="1" fontSize={20} fontWeight="bold">
                                          L1 Bid-{' '}
                                        </Text><Text
                                          mt="1.5"
                                          style={{ color: '#cc080b', fontWeight: 'bold' }}
                                          fontSize={20}
                                        >
                                          {elm.AUCTION_ITEM_CODE == del.AUCTION_ITEM_CODE && del.AUCTION_ITEM_CODE ? (
                                            <Text bold color={'#228c0a'} >
                                              {del.AUCTION_VENDOR_RATE}</Text>
                                          ) : null}

                                        </Text>
                                        <Spacer />
                                      </HStack> */}
                                      {timmers.map((respo, ind) => {
                              return (

                                <HStack key={ind}>
                                  {elm.AUCTION_ITEM_CODE == respo.AUCTION_ITEM_CODE ? (
                                    <Box borderWidth={'1'} borderColor={'coolGray.400'}>
                                      <HStack>
                                        <Text fontSize={20} fontWeight="bold" >
                                          L1 Bid-{' '} </Text>
                                        <Text  fontSize={20} fontWeight="bold" color={'#cc080b'}>{respo.AUCTION_VENDOR_RATE}</Text>
                                      </HStack>
                                    </Box>
                                  ) : null}


                                </HStack>
                              )
                            })}

                                    </View>
                                  </View>

                                ) : null}


                              </VStack>

                            )
                          })}
                          <Spacer />

                          {/* <Text mt="0.5" fontSize={12} fontWeight="bold" >
                            Time Left-{' '} </Text>
                          <Timm Data={elm} /> */}

                          <VStack space={'2'}>
                            {/* <HStack>
                          
                              <Text fontSize={16} fontWeight="bold" >
                                Time Left-{' '} </Text>
                              <Text mt={'0.5'}> <Timm Data={elm} /></Text>
                            </HStack> */}
                            {timmers.map((response, index) => {
                              return (

                                <HStack key={index}>
                                  {elm.AUCTION_ITEM_CODE == response.AUCTION_ITEM_CODE ? (
                                    <Box borderWidth={'1'} borderColor={'coolGray.400'}>
                                      <HStack>
                                        <Text fontSize={20} fontWeight="bold" >
                                          Time Left-{' '} </Text>
                                        <Text  fontSize={20} fontWeight="bold" color={'#cc080b'}>{response.GET_TIME}</Text>
                                      </HStack>
                                    </Box>
                                  ) : null}


                                </HStack>
                              )
                            })}


                            <HStack>
                              <Text fontSize={20} fontWeight="bold"
                                alignSelf={'center'} >Bid Start Rs-{' '}</Text>
                              <Text

                                style={{ color: '#000000', fontWeight: 'bold' }}
                                fontSize={20}
                                alignSelf={'center'}
                              >
                                {elm.AUCTION_BID_START_PRICE}
                              </Text>
                            </HStack>
                          </VStack>
                          {/* <Text>Anuahv</Text>
                          <Text>{JSON.stringify(elm )}</Text> */}

                          {/* {this.props.Data} */}
                          {/* {elm.AUCTION_BID_START_PRI_FLG === 'Y' && elm.AUCTION_BID_START_PRI_FLG ? (
                            <Text
                              mt="1"
                              style={{ color: '#cc080b', fontWeight: 'bold' }}
                            >
                            {anuu.checkTime}
                              {elm.AUCTION_BID_START_PRICE}

                            </Text>
                          ) : null} */}

                          {/* {pun.map((anuu,trii)=>{
                            return (
                            <View key={trii}>

                                {anuu.AUCTION_ITEM_CODE == elm.AUCTION_ITEM_CODE ? (
                                <Text color={"#f51000"} fontWeight="medium" fontSize={15}>
                            {anuu.checkTime}
                          </Text>
                         ) : null}

                          </View>
                            )
                          })} */}

                        </HStack>
                        <Text mt="3" fontWeight="medium" fontSize={20}
                          style={{ color: "#002d56", fontWeight: 'bold' }}>
                          {elm.AUCTION_ITEM_DESC}
                        </Text>
                        <Text mt="2" fontSize={18}  >
                        {elm.AUCTION_REMARKS}
                        </Text>

                        <Divider my="1" />
                        <HStack alignItems="flex-start">
                          {/* <Text mt="3" fontSize={9} fontWeight="bold"
                            alignSelf={'center'} >MinDecr-{' '}</Text>
                          <Text
                            mt="3"
                            style={{ color: '#cc080b', fontWeight: 'bold' }}
                            fontSize={11}
                            alignSelf={'center'}
                          >
                            {elm.AUCTION_MIN_DECR_AMT}
                          </Text> */}
                          {/* <Divider orientation="vertical" mx="1" /> */}

                          <Text fontSize={16} fontWeight="bold"
                            alignSelf={'center'} >Qty-{' '}</Text>
                          <Text

                            style={{ color: '#cc080b', fontWeight: 'bold' }}
                            fontSize={16}
                            alignSelf={'center'}
                          >
                            {elm.AUCTION_QTY}-({elm.AUCTION_PKG})
                          </Text>

                         
                          <Spacer />
                          {omm.map((elt, lot) => {
                            return (
                              <View key={lot}>
                                {elt.AUCTION_ITEM_CODE == elm.AUCTION_ITEM_CODE ? (
                                  <HStack>
                                    <Text fontSize={16} fontWeight="bold">
                                      My Bid-{' '}
                                    </Text><Text

                                      style={{ color: '#cc080b', fontWeight: 'bold' }}
                                      fontSize={18}
                                    >
                                      {elt.AUCTION_VENDOR_RATE}

                                    </Text>
                                    <Spacer />
                                  </HStack>
                                ) : null}
                              </View>
                            )
                          })}

                     
                          <Spacer />

                          {/* <View >

                              <HStack>
                                <Text mt="3" fontSize={9} fontWeight="bold">
                                L1 Bid-{' '}
                              </Text><Text
                                mt="3"
                                style={{ color: '#cc080b', fontWeight: 'bold' }}
                                fontSize={10}
                              >
                                { elm.AUCTION_ITEM_CODE == del.AUCTION_ITEM_CODE ? (
                                  <Text>
                                  {del.AUCTION_VENDOR_RATE}</Text>
                                ):null}

                                </Text>
                                <Spacer />
                              </HStack>

                          </View> */}
                          <HStack>
                            <Text fontSize={16} fontWeight="bold"
                              textAlign={'center'} left={'4'} >MinDecr-{' '}</Text>
                            <Text
                              left={'4'}
                              style={{ color: '#cc080b', fontWeight: 'bold' }}
                              fontSize={16}
                              alignSelf={'center'}
                            >
                              {elm.AUCTION_MIN_DECR_AMT}
                            </Text>
                          </HStack>



                        </HStack>
                        <Divider my="1" />
                        <HStack alignItems="flex-start">

                        </HStack>
                        {pun.map((aii, iia) => {
                          return (
                            <View key={iia}>
                              {elm.AUCTION_ITEM_CODE == aii.AUCTION_ITEM_CODE ? (
                                <HStack alignItems="flex-start" mt={'2'}>
                                  <Button.Group isAttached colorScheme="red" >
                                    <Pressable _pressed={{
                                      bg: "#868687"
                                    }} bg="green.700" py="2" rounded="sm" px="1" alignSelf="center" 
                                      onPress={() => this.increment(lose, elm)} borderColor={'#690a03'} borderWidth={'2'}>
                                      <Text textAlign={'center'} fontWeight="bold"  color="white">
                                        Plus(+)
                                      </Text>
                                    </Pressable>
                                    <Pressable _pressed={{
                                      bg: "#868687"
                                    }} bg="#9e0b06" py="2" rounded="sm" px="1" alignSelf="center" 
                                      onPress={() => this.decrement(lose, elm)} borderColor={'#690a03'} borderWidth={'2'}>
                                      <Text textAlign={'center'} fontWeight="bold"  color="white">
                                        Minus(-)
                                      </Text>
                                    </Pressable>
                                    {/* <Button style={{ backgroundColor: "green", borderColor: "#690a03", }} onPress={() => this.increment(lose, elm)}>Plus(+)</Button> */}
                                    {/* <Button style={{ backgroundColor: "#690a03", borderColor: "#690a03", }} onPress={() => this.decrement(lose, elm)}>Minus(-)</Button> */}
                                  </Button.Group>
                                  {/* <Divider orientation="vertical" mx="1" /> */}
                                  <Spacer />
                                  
                                  <Box  borderColor={'#c0bebf'} alignSelf={'center'} right={'5'}>
                                    <HStack mb={'2'}>
                                      <Text  right={'10'} fontSize={16} fontWeight="bold" alignSelf={'center'} >Rs-{' '}</Text>

                                      <Text

                                        
                                        style={{ color: '#cc080b', fontWeight: 'bold' }}
                                        fontSize={'xl'}

                                        alignSelf={'center'}
                                      >

                                        {elm.INPUTVAL}
                                      </Text>

                                    </HStack>
                                  </Box>
                                  {/* <Divider orientation="vertical" mx="1" /> */}
                                  <Spacer />

                                  {/* { pun.map((indii,indexxx)=>{

                                })} */}
                                <HStack>
                                  {(aii.BID_STATUS === 'Close' && aii.BID_STATUS) ? (
                                    <Button style={{
                                      backgroundColor: "#002d56", borderColor: "#690a03", borderWidth: 2,
                                      borderRadius: 4,
                                    }}  rounded="none" width={'24'} size={'lg'} h="full" onPress={() => this.logestics(lose, elm.AUCTION_ITEM_CODE, elm.INPUTVAL)}
                                      isDisabled={(aii.BID_STATUS === 'Close')}
                                    >
                                      {elm.isSelected ? "BID" : 'BID'}
                                    </Button>


                                  ):(aii.BID_STATUS === 'TO BE START' && aii.BID_STATUS) ? (
                                    <Button style={{
                                      backgroundColor: "#002d56", borderColor: "#690a03", borderWidth: 2,
                                      borderRadius: 4,
                                    }}  rounded="none" width={'24'} size={'lg'} h="full" onPress={() => this.logestics(lose, elm.AUCTION_ITEM_CODE, elm.INPUTVAL)}
                                      isDisabled={(aii.BID_STATUS === 'TO BE START')}
                                    >
                                      {elm.isSelected ? "BID" : 'BID'}
                                    </Button>


                                  ) : <Button style={{
                                    backgroundColor: "#002d56", borderColor: "#690a03", borderWidth: 2,
                                    borderRadius: 4,
                                  }}  rounded="none" width={'24'} size={'lg'} h="full" onPress={() => this.logestics(lose, elm.AUCTION_ITEM_CODE, elm.INPUTVAL)}
                                  //  isDisabled={(aii.BID_STATUS === 'Close')}
                                  >
                                    {elm.isSelected ? "BID" : 'BID'}
                                  </Button>}

                                  </HStack>


                                </HStack>
                              ) : null}

                            </View>
                          )
                        })}
                        <Divider my="1" />
                      </Box>
                    </Pressable>
                  </Box>
                </Center>
              </View>
            )
          })}
        </ScrollView>
        <Footer />
      </NativeBaseProvider>
    )
  }
}
export default function (props) {
  const navigation = useNavigation();
  return <Myrequest {...props} navigation={navigation} />;
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 10,
    paddingBottom: 10,
  },
  contain: {
    flex: 1,
    justifyContent: 'center',
  },
  checkbox: {
    alignSelf: "center",
  },
});
