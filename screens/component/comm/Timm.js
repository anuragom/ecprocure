/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { Component,createContext } from "react";
import {

  Text,
  Box,

  NativeBaseProvider,

  ScrollView,

} from "native-base"

import AsyncStorage from '@react-native-async-storage/async-storage';

import moment from "moment";


import { View, StyleSheet } from 'react-native';

// const Name = getpune();

class Timm extends Component {


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
      timeleft:[],
      tleft:"",
      activetime:[],
    //   name:createContext(),


    };
    // const name = createContext();
    console.log('pooja'+this.props.uuu);

  }
  getpune(){
      return this.state.pune;
  }

  getDta = () => {
    try {
      AsyncStorage.getItem('userData').then(value => {

      });
    } catch (error) {
      console.log(error);
    }
  };

  getAuction = () => {
    try {
      AsyncStorage.getItem('auctin').then(value => {

      });
    } catch (error) {
      console.log(error);
    }
  };

  anubhav = async () => {
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
      redirect: 'follow',
    };

    fetch("https://omapi.omlogistics.co.in/api/purchase/getLowestBid", requestOptions)
      .then(response => response.text())
      .then(result => {

      //  console.log(result);
        let extractDAta = JSON.parse(result).bidRankItem.data

        this.state.omm = extractDAta
        const { omm } = this.state;
        this.setState(omm);
        // console.log(omm);
        let duedata = JSON.parse(result).checkEndTime.data

        this.state.pune = duedata
        const { pune } = this.state;
        this.setState(pune);
        // console.log(pune);






          pune.map(respo => {
            console.log(respo.AUCTION_ITEM_CODE);

            moment.locale('en');



            let dte = respo.BID_DURATION



            // console.log(dte);

          const a1 = new Date(dte).getTime();
          // console.log("Anupoo"+a1);
          const a2 = new Date().getTime();
          // console.log("Anupoo"+a2);
          var all = a1 - a2
          // console.log("update" + all);
          const start = new Date(all);
          // console.log(start);
          // console.log(start.setSeconds(start.getSeconds() - 1));
          // console.log(`${format(start.getUTCHours())}: ${format(start.getUTCMinutes())}: ${format(start.getUTCSeconds())}`);




        let filteredData =  JSON.parse(result).checkEndTime.data.filter(response => (response.AUCTION_ITEM_CODE == respo.AUCTION_ITEM_CODE && response.AUCTION_VENDOR_CODE == respo.AUCTION_VENDOR_CODE))[0].BID_STATUS;
        // console.log(filteredData);



        if (filteredData == "Live") {

          respo['checkTimesExists'] = setInterval(() => {
            start.setSeconds(start.getSeconds() - 1);

            var checkTime = `${format(start.getUTCHours())}: ${format(start.getUTCMinutes())}: ${format(start.getUTCSeconds())}`;
                    // console.log(checkTime);



            pune.map(async (respp)=>{
              if(respp.AUCTION_ITEM_CODE==respo.AUCTION_ITEM_CODE){
              respp.checkTime = checkTime
                await this.setState({
                  [ respp.checkTime]:  respp.checkTime
                });
              }
              })



            respo['END_TIMES'] = `${format(start.getUTCHours())}: ${format(start.getUTCMinutes())}: ${format(start.getUTCSeconds())}`;

              if (respo['END_TIMES'] == '00: 00: 00') {
                  console.log("end");
                  clearInterval(respo['checkTimesExists']);
                }
               else {
                  console.log("not end");


              }



          } ,1000)



      }
      else if (filteredData == "TO BE START")
      {
        respo['END_TIMES'] = 'TO BE START';
        }
      else {
        respo['END_TIMES'] = 'BID END';
          console.log("not end again");
      }


    function format(n)
{
      return n < 10 ? '0' + n : '' + n;
    }
          })


      })
      .catch(error => console.log('error', error));

  }





  componentDidMount() {
    this.getAuction();
    this.getDta();
    // this.shubham();
    this.anubhav();
  }




  render() {
    const { pune } = this.state;
    const { omm } = this.state;
    // console.log('anu');
    // console.log('allahabd' + this.props.Data);

    return (
        <NativeBaseProvider>
        {/* <Name.Provider value={pune}> */}
        {/* <Myrequest value={this.state}/> */}
        {/* </Name.Provider> */}
        {/* <Text>{JSON.stringify(this.props.data)}</Text> */}
        {/* <Myrequest data={pune}/> */}
        <ScrollView>

        {pune.map((lm,pp)=>{
            return (


                <View key={pp}>


                    {/* <Text>{JSON.stringify(lm.AUCTION_BID_START_PRICE)}</Text> */}
                     {/* {this.props.Data.map((lmm, ppp) => {
        return ( */}


               {/* <Text>{JSON.stringify(lmm.AUCTION_ITEM_CODE)}</Text> */}
             {lm.AUCTION_ITEM_CODE == this.props.Data.AUCTION_ITEM_CODE ? (

              <Text bold color={'#cc080b'}>{lm.checkTime}</Text>
            //   <Text>{lm.AUCTION_BID_START_PRICE}</Text>

                 )
               : null}


        {/* )
        })}    */}

                </View>
            )
        })}

        </ScrollView>
        </NativeBaseProvider>
    )
  }
}

// export default function(props) {
//   const navigation = useNavigation();


//   return <ForwardAuction {...props} navigation={navigation} />;
// }
export default Timm;
// export const a= pune
// export {Name}



const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingTop: 10,
    paddingBottom: 10,
  },
});
