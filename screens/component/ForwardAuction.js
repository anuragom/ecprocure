/* eslint-disable prettier/prettier */
import React from 'react';
import { NativeBaseProvider, Box,Center } from 'native-base';
import { Link } from "native-base";
import Footer from './Footer';
export default function App() {
  return (
    <NativeBaseProvider>
     
      <Center flex={1}>
      
      <Link href="#">
        Click here to open documentation.
      </Link>
      </Center>
<Footer/>
    </NativeBaseProvider>
  );
}
