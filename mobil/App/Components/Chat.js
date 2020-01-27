import React, { Component } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  ScrollView, 
  View, 
  Text,
  StatusBar, 
  TouchableOpacity,
  Image
} from 'react-native';
import {Header, LearnMoreLinks, Colors, DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';

import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/dist/Entypo';


// import MuseumEuropeanSculptures from './Components/MuseumEuropeanSculptures';

class Chat extends Component {
  constructor(){
    super();
    this.state = {
    }
  };

 
  render() {
    return (
      <View style={{alignItems:'center', marginBottom:40}}>
        <Text>SOME TEXT FROM CHAT</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
scrollView: {
    backgroundColor: '#d0bcb5',
  },
  
  body: {
    backgroundColor: '#d0bcb5',
  },
});


export default Chat