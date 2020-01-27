import React, { Component } from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  ScrollView, 
  View, 
  Text,
  StatusBar, 
  TouchableOpacity,

} from 'react-native';
import NasaPicOfTheDay from './Components/NasaPictureOfTheDay';
import MuseumEuropeanPaints from './Components/MuseumEuropeanPaints';
import MuseumEuropeanSculptures from './Components/MuseumEuropeanSculptures';
import Drawer from 'react-native-drawer';
import Icon from 'react-native-vector-icons/dist/Entypo';
import Chat from './Components/Chat';
// import SocketIOClient from 'socket.io-client';
// import Loading from 'react-native-whc-loading'

// import MuseumEuropeanSculptures from './Components/MuseumEuropeanSculptures';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      sculptures: false,
      paints: true,
      nasa: false,
      openedDrawer: false,
      chat: false,
      chatMessage: "",
      chatMessages: []
    }
  };

  closeDrawer = () => {
    this.drawer.close()
  };
  openDrawer = () => {
    this.drawer.open()
  };
  wichTorender(){
    let chat = <Chat />
    let nasa = <NasaPicOfTheDay />
    let paints = <MuseumEuropeanPaints />
    let sculptures = <MuseumEuropeanSculptures />
    if(this.state.sculptures == false && this.state.nasa == false && this.state.chat == false && this.state.paints == true){
      return paints
    } else if(this.state.paints == false && this.state.nasa == false && this.state.chat == false && this.state.sculptures == true) {
      return sculptures
    } else if(this.state.paints == false && this.state.nasa == false && this.state.sculptures == false && this.state.chat == true) {
      return chat
    } else if(this.state.paints == false  && this.state.sculptures == false && this.state.chat == false && this.state.nasa == true) {
      return nasa
    }
  };

  render() {
    var drawer = (
        <View style={{ flex: 1, backgroundColor: '#000000' }}>
          <Text style={{ marginLeft:0, color: '#FFF', marginTop: 30, fontSize: 25, }}>ArtiSplendore</Text>
          <View style={{ flex: 1, justifyContent: 'center', marginBottom: 0 }}>
            <TouchableOpacity onPress={() => this.setState({sculptures: false, paints: true,chat: false,nasa: false, openedDrawer: false})}>
              <Text style={{ color: '#FFF', marginLeft: 20, marginBottom: 30, fontFamily: 'OpenSans-Bold' }}> Paints  </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({sculptures: true, paints: false,nasa:false, chat:false, openedDrawer: false})}>
              <Text style={{ color: '#FFF', marginLeft: 20, marginBottom: 30, fontFamily: 'OpenSans-Bold' }}> sculpture  </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({sculptures: false, paints: false, openedDrawer: false, chat: false, nasa: true})}>
              <Text style={{ color: '#FFF', marginLeft: 20, marginBottom: 30, fontFamily: 'OpenSans-Bold' }}> Nasa picture of the day  </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({sculptures: false, paints: false, openedDrawer: false, nasa:false, chat: true})}>
              <Text style={{ color: '#FFF', marginLeft: 20, marginBottom: 30, fontFamily: 'OpenSans-Bold' }}> Chat  </Text>
            </TouchableOpacity>
          </View>
        </View>
    );

    return (
      <Drawer 
      renderNavigationView={() => drawer}
      content={drawer}
      type="overlay"
      open={this.state.openedDrawer}
      tapToClose={true}
      openDrawerOffset={0.4}
      ref={_drawer => (this.drawer = _drawer)}>            
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <TouchableOpacity style={{backgroundColor:'#000000'}} onPress={this.openDrawer.bind(this)} >
            <Icon name="menu" style={{marginLeft:10}} size={30} color="#ffffff" />
          </TouchableOpacity>
          <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
            <View style={styles.body}> 
              {this.wichTorender()}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Drawer>
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
  container: {
    height: 400,
    flex: 1,
    backgroundColor: 'red',
  },
});


export default App
