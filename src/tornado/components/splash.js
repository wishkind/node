import React, { Component } from 'react'
import { Text, View ,Image , ImageBackground } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class splash extends Component {
constructor(props){
    super(props);
}

componentDidMount(){
    setTimeout(()=>{
        this.props.navigation.replace('Home');
    },3000)
}
static navigationOptions = {
    header :null
}


 render() {
    return (
      <View style={{flex:1,alignContent:'center',justifyContent:'center',backgroundColor:'white'}}>
      
       {/* <View style={{flex:1,alignContent:'center',justifyContent:'center',backgroundColor:'black'}}>
          
            <View style={{flex:1,alignContent:'center',justifyContent:'center',backgroundColor:'black'}}>
       */}
       <Text style={{textAlign:'center',color:'black', fontSize: 40,fontWeight:'800',marginTop:hp('10%')}}>Tornado Computer Trading L.L.C</Text>
              <ImageBackground
                        style={{ width: wp('95%'), height: hp('80%') ,borderRadius:50}}
                        source={require('../assets/Capture.png')}
              >
                
              </ImageBackground>
            {/* </View>
        </View> */}
      </View>  
    )
  }
}
