import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,TextInput,
  ScrollView,Button,TouchableOpacity,
} from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { Icon, Card ,CheckBox } from "react-native-elements";
import Footer from "./footer";

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const servicelist = [
      {
        title : 'Web Strategy' ,
        des : 'From simple to complex business processing websites. Our web strategy process makes it all easy and effective.'
  
      },
      {
        title : 'Web Design' ,
        des : 'Get expert hands with simple and professional solutions of the best modern web trends.' ,
        img :require("../assets/companyProfile.jpg")
      },
      {
        title : 'Responsive Web Design',
        des : '90% of people are switching to multiple screens to browse the internet! So, to target all your potential clients its important to have a website that is optimized for all devices.'
      },
      {
        title : 'Website Redesign',
        des : 'As one of the leading Web Design, Company in Dubai and globally its significant for us to keep up with the latest trends in web design methods and technology.'
      },
      {
        title : 'Web Development',
        des : 'We offer World class professional web development solutions for both small and large scale organizations around the world.'
      },
      {
        title : 'Ecommerce Development',
        des : 'Let us build an ecommerce website for you with customizable features to attract a wider audience and further expand your business online.'
      },
      {
        title : 'Multimedia Presentation',
        des : 'Effective and easy communication is the key to today’s business environment and our interactive multimedia presentation is a proven solution.'
      },
      {
        title : 'E-Marketing',
        des:'With us get your business known on all major search engines such as Google, Bing and Yahoo.'
      },
      {
        title : 'Corporate Identity Services',
        des:'Be unique be different, that’s what makes you stand out? Why not make your company and its product special?'
      },
      {
        title : 'Domain Registration & Hosting',
        des:'Since 2004 the Tornado Computer Trading LLC Dubai has provided reliable Web Hosting and Domain Registration services for individuals and businesses in Dubai UAE.'
      },
  
    ]

   



    return (
      <ScrollView>
        
        <Text style={{alignSelf:'center',fontSize:20,fontWeight:'bold',color:'green',margin:10}}> Services We Provide </Text>
        
        <Text style={{alignSelf:'center',padding:wp('3%')}}>Web Design & Development services of Tornado are recognized and reliable that helps you to grow your business online and offline. If you have any plan regarding earning profit through your website then our company will assist you in a best possible way, because Tornado provides web-based solutions that you need to make your website running and earning value in business and internet world against your competitors.</Text>

      
        <View style={styles.list}>
       
                     { servicelist.map((num,index)=>{

                return  <Card key={index}  containerStyle={{width:wp('80%'),elevation:5}} 
                        title={`${num.title}`} 
               // image={{uri:num.img}}
               >
                  {/* <Image source={{uri: num.img}}
                          style={{width: '50%', height: '50%',position:'absolute'}}   /> */}
                    {/* <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>{num.title}</Text> */}
                    <Text style={{fontSize:18,marginBottom:10,textAlign:'center'}}>{num.des}</Text>
                    
                    <View style={styles.list}>
                    <View >
                  {/* <Button title="Place Order" onPress={()=>{this.cart(num.name,num.price,num.img)}} buttonStyle={styles.btn}/> */}
                  {/* <Icon  color="blue" name="minus" type='font-awesome' size={20} onPress={()=>{this.dec(num.name,num.price,index)}} />
                  
                  <Text>{this.state.quantity} {index}</Text>
                  
                  <Icon  color="blue" name="plus" type='font-awesome' size={20} onPress={()=>{this.inc(num.name,num.price,index)}} />
                  */}</View> 
                  </View>  
                    
                </Card>
                })
                }
            </View>    

       
            <Footer/> 
         
    </ScrollView>




      
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c313a',


  },
  contentContainer: {
      //paddingVertical: 50,
     
      backgroundColor: 'white'
    },
  list: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent:'center',
    flexWrap: 'wrap',
    paddingBottom: 20,
    
  },
  listcontainer :{
    width:'80%',
    backgroundColor:'blue'
  },
})