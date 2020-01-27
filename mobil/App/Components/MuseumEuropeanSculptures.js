import React, { Component } from 'react';
import { 
  Image, 
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Modal from "react-native-modal";

const width = Dimensions.get('window').width
class MuseumEuropeanSculptures extends Component {
    constructor(){
        super();
        this.state = {
            paintImageUrl:[],
            title:[],
            objectId: 186253,
            artistDisplayName:[],
            artistBeginDate:[],
            artistEndDate:[],
            creditLine:[],
            artistDisplayBio:[],
            isModalVisible: null,
        }
        this.getSculptures()
    };
    getSculptures(){
        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${this.state.objectId}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }).then((response)=>{
          if(response.ok){
              response.json().then((data)=>{
                  this.state.paintImageUrl.push(data.primaryImage)
                  this.state.title.push(data.title)
                  this.state.artistDisplayName.push(data.artistDisplayName)
                //   this.state.artistBeginDate.push(data.artistBeginDate)
                //   this.state.artistEndDate.push(data.artistEndDate)
                  this.state.creditLine.push(data.creditLine)
                  this.state.artistDisplayBio.push(data.artistDisplayBio)
                  let nextObjectId = this.state.objectId
                  if(nextObjectId <= 186257){
                    nextObjectId += 1
                      this.setState({objectId: nextObjectId})
                      return this.getSculptures()
                    } else {
                       return false
                  }
              })
          } else if(response.status == '404'){
              let nextObjectId = this.state.objectId
              nextObjectId += 1
              this.setState({objectId: nextObjectId})
              return this.getSculptures()
          } else {
              return false
          }
      }).catch((err)=>{
          console.log(err.message)
      }) 
    };
    clickHandler(e, key) {
        this.setState({ activeModal: key })
    };

    hideModal() {
        this.setState({ activeModal: null })
    };
    renderImages(){
        let title = this.state.title
        let images =this.state.paintImageUrl
        let artistDisplayName = this.state.artistDisplayName
        // let artistBeginDate = this.state.artistBeginDate
        // let artistEndDate = this.state.artistEndDate
        let creditLine = this.state.creditLine
        let artistDisplayBio = this.state.artistDisplayBio
        var map = images.map((data, key) => {
           if(data !== ''){
            return (
               
                    <View key={key} style={styles.solicitudes}>
                        <Modal style={{ alignItems:'center', maxWidth:'90%' }}  isVisible={this.state.activeModal === key}>
                            <TouchableWithoutFeedback
                                onPress={()=>{
                                    this.hideModal();
                                }}>
                                <View  style={{ alignItems:'center', maxWidth:'90%' }}>
                                <Image
                                source={{uri: data}}
                                style={{width: width,height: 600,}}
                                resizeMode="cover"
                                />
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>
                        <Text style={{color:'#000', marginTop:15, letterSpacing:0.25, fontSize:20, fontWeight:'500', textAlign:'center'}}>{title[key]}</Text>
                        <View >
                            <TouchableOpacity style={{alignItems:'center'}} onPress={e => this.clickHandler(e, key)} >
                                <Image
                                source={{uri: data}}
                                style={{width: 300,
                                height: 300, marginTop:20}} 
                                resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'column'}}>
                            <Text style={{marginLeft:10,color:'#000', marginTop:20}}>{creditLine[key]}</Text>
                            <Text style={{marginLeft:10,color:'#000', marginTop:0}}>{artistDisplayBio[key]}</Text>
                            <Text style={{marginLeft:10,color:'#000', marginTop:0, marginBottom:20}}>{artistDisplayName[key]}{' '}</Text>
                        </View> 
                    </View> 
               
            )
            } else {
                return false
            }
        });
        return map
    };
    render() {
        return (
            <View style={{alignItems:'center', marginBottom:40}}>
                {this.renderImages()}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    solicitudes:{
        borderTopLeftRadius:4,
        borderTopRightRadius:4,
        borderRadius:4,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.84,
        shadowRadius: 3,
        elevation: 10,
        marginTop:20,
        marginBottom:20,
        backgroundColor:'#ffffff',
        maxWidth:'90%',
        minWidth:'90%'
    },
})


export default MuseumEuropeanSculptures
