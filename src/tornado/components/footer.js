import React, { Component } from 'react'
import { Text,
    View,
    StyleSheet,
    ImageBackground,Button,
    Dimensions,
    Image,TextInput,
    ScrollView} from 'react-native'
 import {  SocialIcon} from 'react-native-elements';

export default class footer extends Component {
  render() {
    return (
      <View style={styles.container}>

        
        <Text style={[styles.otherText,{textAlign:'center',color:'green'}]}> SIGN UP NEWSLETTER </Text>
       
        <View style={styles.btntext}>    
            <TextInput
            style={{height: 40,color:'white' ,borderColor:'blue',borderBottomColor:'green'}}
            placeholder="Enter email address"
            placeholderTextColor='white'
            onChangeText={(text) => this.setState({text})}
            />
            <Button title="Sign Up"
                    color="#841584"

            />  
       </View> 

       <Text style={[styles.otherText,{textAlign:'center',color:'green'}]}> QUICK CONTACT US </Text>
       
       <Text  style={[styles.otherText,{color:'green'}]}>Tornado Computer Trading (L.L.C)</Text>
       <Text  style={[styles.otherText,{color:'green'}]}>Office # S-07, R22 France Cluster, International City, Dubai, United Arab Emirates </Text>
       <Text  style={[styles.otherText,{color:'green'}]}>P.O.Box: 114420 </Text>
       <Text  style={[styles.otherText,{color:'green'}]}>T: +971 4 4509840</Text>
       <Text  style={[styles.otherText,{color:'green'}]}>F: +971 4 5515275</Text>
       <Text  style={[styles.otherText,{color:'green'}]}>E: sales@tornado.ae </Text>
       <Text  style={[styles.otherText,{color:'green'}]}>Working Hours: 8AM - 5PM </Text>
       <Text  style={[styles.otherText,{color:'green'}]}>Copyright 2004-17, Tornado Computer Trading L.L.C</Text>

       <View style={styles.btntext}>
        <SocialIcon
            raised
            light
            type='facebook'
            /> 


        <SocialIcon
            raised
            light
            type='instagram'
            /> 


        <SocialIcon
            raised
            light
            type='youtube'
            /> 


        <SocialIcon
            raised
            light
            type='google'
            /> 
        
        <SocialIcon
            raised
            light
            type='linkedin'
            /> 
        </View>


      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
      flex:1,
      backgroundColor:'#1c1c1c'
  },
  btntext:{
    flexDirection:'row',
    paddingHorizontal: 10,
    justifyContent:'center'
  },
  aboutText: {
    fontSize: 25,
    color: "blue",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    marginTop: 5
  },
  paratext: {
    padding: 10,
    color: "green"
  },
  textbold: {
    fontWeight: "bold",
    color: "black"
  },
  otherText: {
    color: "black",
    padding: 10
  },
});
