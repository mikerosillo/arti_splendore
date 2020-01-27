import React, { Component } from 'react';
import { 
  Dimensions, 
  Text,
  View,
  Animated
} from 'react-native';
import { State, TapGestureHandler } from 'react-native-gesture-handler'

const {width} = Dimensions.get('window')
class NasaPicOfTHeDay extends Component {
    constructor(){
        super();
        this.state = {
            nasaPicOfTheDayUrl:'',
            title:'',
            tapOnce:true,
            explnation:'',
        }
        this.getNasaPicOfTheDay()
    };
    scale = new Animated.Value(1)

    onZoomEvent = Animated.event(
        [
        {
            nativeEvent: { scale: this.scale }
            
        }
        ],
        {
        useNativeDriver: true
        }
    )

    onZoomStateChange = event => {
        if (event.nativeEvent.oldState === State.ACTIVE && this.state.tapOnce == true) {
        Animated.spring(this.scale, {
            toValue: 1.7,
            useNativeDriver: true
        }).start()
        console.log('called')
        this.setState({tapOnce: false})
        } else if (event.nativeEvent.oldState === State.ACTIVE && this.state.tapOnce == false){
            Animated.spring(this.scale, {
                toValue: 1,
                useNativeDriver: true
            }).start()
            console.log('called twice')
            this.setState({tapOnce: true})
        }
    }
    _onSingleTap = event => {
        if (event.nativeEvent.state === State.ACTIVE) {
        alert("I'm touched");
        }
    };
    getNasaPicOfTheDay(){
        fetch('https://api.nasa.gov/planetary/apod?api_key=SQ65mKgJbnforeihsspfIZmOKL5rdRhqdGEsEx22', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((response)=>{
          if(response.ok){
              response.json().then((data)=>{
                console.log(data)
                  this.setState({nasaPicOfTheDayUrl: data.url, title: data.title, explanation: data.explanation})
              })
          }
      }).catch((err)=>{
          console.log(err.message)
      }) 
    };
    getStyles(){
      if(this.state.tapOnce == true){
        return { flex:1,justifyContent: 'center', alignItems: 'center', backgroundColor:'#000000', height:760}
      } else {
        return { flex:1,justifyContent: 'center', alignItems: 'center', backgroundColor:'#000000', height:760 }
      }
    };
    showName(){
      if(this.state.tapOnce == true){
        return <Text style={{color:'#FFF', textAlign:'center', backgroundColor:'transparent', marginTop:0}}>{this.state.title}{"\n"}{this.state.explanation}</Text>
      } else {
        return false
      }
    };
    render() {false
        return (
            <View style={this.getStyles()}>
            <TapGestureHandler
            onGestureEvent={this.onZoomEvent}
            onHandlerStateChange={this.onZoomStateChange}>
              <Animated.Image
                source={{
                  uri: `${this.state.nasaPicOfTheDayUrl}`
                }}
                style={{
                  width: width,
                  height: 300,
                  transform: [{ scale: this.scale }],
                  marginTop:-20
                }}
                resizeMode="contain"
              />
            </TapGestureHandler>
            {this.showName()}
          </View>   
        );
    }
}



export default NasaPicOfTHeDay
