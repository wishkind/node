import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,TextInput,ToastAndroid,
  ScrollView,Button,TouchableOpacity,
} from "react-native";
import { Icon, Card ,CheckBox } from "react-native-elements";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Footer from "./footer";


export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
        companyname:'',
        name:'',
        address:'',
        email:'',
        phone:'',
        existingyes: false,
        existingno :false ,

        site:'',

        url:'',
        urlbox:false,
        Swd:false,
        swdvalue:'',

        Sad:false,
        sadvalue:'',
        
        Swm:false,
        swmvalue:'',

        Secom:false,
        secomvalue:'',

        Spg:false,
        spgvalue:'',

        Sssl:false,
        ssslvalue:'',

        Scorp:false,
        scorpvalue:'',

        description:'',
        contactPhone:false,
        cpvalue:'',

        contactEmail:false,
        cevalue:'',


        besttime:'',
        productCatalog:'',
        web1:'',
        web2:'',
        web3:'',

    };
  }


  existingwebYes=()=>{
    this.setState({existingyes:true,existingno:false ,urlbox:true }) 
  //   if (!this.state.existingyes){
  //     this.setState({existingyes:true,existingno:false ,urlbox:true }) 
  //   }

   
  //  else{
  //   this.setState({existingyes:false,existingno:false ,urlbox:true }) 
  //  }

  }
  existingwebNO=()=>{

   this.setState({existingyes:false,existingno:true ,urlbox:false ,url:''}) 
   
  }

  Submit=()=>{
    console.log("submite is clicked");

     if (this.state.existingyes){
       this.setState({site:'Yes'})

     }
     if (this.state.existingno){
       this.setState({site:'No'})
     }
    //  else{
    //   this.setState({site:'No'})
    // }

    const { companyname,    name,    address,    email,    phone,    
    url,        swdvalue,    sadvalue,    swmvalue, site  ,  secomvalue,    spgvalue,
    ssslvalue,    scorpvalue,    description,    cpvalue,    cevalue,
    besttime,    productCatalog,    web1,    web2,    web3 }  = this.state ;

    // const { companyname,    name,    address,    email,    phone,    existingyes,
    // existingno ,    url,    urlbox,    Swd,    Sad,    Swm,    Secom,    Spg,
    // Sssl,    Scorp,    description,    contactPhone,    contactEmail,
    // besttime,    productCatalog,    web1,    web2,    web3 }  = this.state ;

        if(name !='' && address !='' && email !='' && phone !='' && description != '' ){

    fetch('https://voldermart.000webhostapp.com/rqform.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        
        
        companyname:companyname,
        name:name,
        address:address,
        email:email,
        phone:phone,
        existingyes: site,        
        url:url,        
        Swd:swdvalue,
        Sad:sadvalue,
        Swm:swmvalue,
        Secom:secomvalue,
        Spg:spgvalue,
        Sssl:ssslvalue,
        Scorp:scorpvalue,
        description:description,
        contactPhone:cpvalue,
        contactEmail:cevalue,
        besttime:besttime,
        productCatalog:productCatalog,
        web1:web1,
        web2:web2,
        web3:web3,
     
      })
     
    }).then((response) => response.json())
          .then((responseJson) => {     

           // this.setState({companyname:'',email:'',mobile:'', message:'',telephone:'',contactperson:''});

            ToastAndroid.show("Thanks for your feed back",ToastAndroid.LONG);
            this.Reset();
            // alert(responseJson);
           
     
          }).catch((error) => {
            console.error(error);
          });
     

        }
        else {
          ToastAndroid.show("Please complete all fields",ToastAndroid.LONG);
        }


}
       


  
  Reset=()=>{
    console.log("resete is clicked");
    this.setState ({
      companyname:'',
      name: '',
      address: '',
      email: '',
      phone: '',
      existingyes: false,
      existingno :false ,
      url:'',
      urlbox:false,
      Swd:false,
      Sad:false,
      Swm:false,
      Secom:false,
      Spg:false,
      Sssl:false,
      Scorp:false,
      description:'',
      contactPhone:false,
      contactEmail:false,
      besttime:'',
      productCatalog:'',
      web1:'',
      web2:'',
      web3:'',

  });


  
  }




  render() {
    return (
      <ScrollView>

          <View>

            <ImageBackground
                source={require("../assets/companyProfile.jpg")}
                style={{ height:hp('40%'),width: wp('100%') }}
              >
              <Text style={{textAlign:'center',color:'white', fontSize: 40,fontWeight:'800',marginTop:hp('2%')}}>Request a Free Quote</Text>
              <Text style={{textAlign:'center',color:'white', fontSize: 20,fontWeight:'900',marginTop:hp('10%')}}>We work with you to document the scope of a project, how the project is to be implemented and the final deliverable and costs.</Text>

            </ImageBackground>  


            </View>

          <View>
          <View style={{backgroundColor:'#B9B9B9',height:2,padding:10,margin:20}}/>      
          <Text style={{textAlign:'center',color:'black', fontSize: 40,fontWeight:'800',marginTop:hp('2%')}}>Request a Free Quote</Text>
          <Text style={{textAlign:'center',color:'gray', fontSize: 15,fontWeight:'normal'}}>If you are interested in receiving more information about the Website Development available at tornado.aem, please complete the form below with accurate information and you will be contacted to review the details of your project.</Text>

          </View> 

          <Card containerStyle={{backgroundColor:'#455a64',marginBottom:10}}>

          <TextInput style={styles.inputBox} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Company Name(If Any)"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                value={this.state.companyname}
                onChangeText = {
                  (text) =>{
                    this.setState({companyname:text});
                  }    
                }            
            />    
          <TextInput style={styles.inputBox} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Your Name"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                value={this.state.name}
                onChangeText = {
                  (text) =>{
                    this.setState({name:text});
                  }    
                }            
            />    
          <TextInput style={styles.inputBox} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Address"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                value={this.state.address}
                onChangeText = {
                  (text) =>{
                    this.setState({address:text});
                  }    
                }            
            />    
          <TextInput style={styles.inputBox} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Email Address"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                keyboardType='email-address'
                value={this.state.email}
                onChangeText = {
                  (text) =>{
                    this.setState({email:text});
                  }    
                }            
            />    
          <TextInput style={styles.inputBox} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Phone Number"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                value={this.state.phone}
                onChangeText = {
                  (text) =>{
                    this.setState({phone:text});
                  }    
                }            
            />  

            <View style={styles.rouw}>
                
                <Text style={{}}>Does your Company have an existing web site
                </Text> 

                <View style={styles.row}>
                    
                      <Text style={{}}>Yes</Text>

                      <CheckBox
                        center
                        // title='Yes'
                        checkedColor='black'
                        checked={this.state.existingyes}
                        containerStyle={{margin:0,padding:0}}
                        onPress={this.existingwebYes}
                      />
                      
                </View>

                <View style={styles.row}>
                    
                      <Text style={{marginRight:5}}>No</Text>

                      <CheckBox
                        center
                        // title='Yes'
                        checked={this.state.existingno}
                        containerStyle={{margin:0,padding:0}}
                        checkedColor='black'
                        onPress={this.existingwebNO}
                      />

                </View>


                   

            </View>     

            <TextInput style={styles.inputBox} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="If yes, what is the URL?"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                editable={this.state.urlbox}
                value={this.state.url}
                onChangeText = {
                  (text) =>{
                    this.setState({url:text});
                  }    
                }            
            />   

            <Text style={{}}>Services of Interest:</Text>

               <View style={styles.row}>
                    
                      <Text style={{marginRight:5}}>Website Designing</Text>

                      <CheckBox
                        center
                        // title='Yes'
                        checked={this.state.Swd}
                        containerStyle={{margin:0,padding:0}}
                        checkedColor='black'
                        onPress={() => {
                          if (this.state.Swd){
                          this.setState({Swd:false,swdvalue:''})}
                          else {
                            this.setState({Swd:true,swdvalue:'Website Designing'})
                          }
                          }
                        }
                      />

                </View>     
               <View style={styles.row}>
                    
                      <Text style={{marginRight:5}}>Application Development</Text>

                      <CheckBox
                        center
                        // title='Yes'
                        checked={this.state.Sad}
                        containerStyle={{margin:0,padding:0}}
                        checkedColor='black'
                        onPress={() => {
                          if (this.state.Sad){
                          this.setState({Sad:false,sadvalue:''})}
                          else {
                            this.setState({Sad:true,sadvalue:'Application Development'})
                          }
                          }
                        }
                      />

                </View>     
               <View style={styles.row}>
                    
                      <Text style={{marginRight:5}}>Website Maintanance</Text>

                      <CheckBox
                        center
                        // title='Yes'
                        checked={this.state.Swm}
                        containerStyle={{margin:0,padding:0}}
                        checkedColor='black'
                        onPress={() => {
                          if (this.state.Swm){
                          this.setState({Swm:false,swmvalue:''})}
                          else {
                            this.setState({Swm:true,swmvalue:'Website Maintanance'})
                          }
                          }
                        }
                      />

                </View>     
               <View style={styles.row}>
                    
                      <Text style={{marginRight:5}}>E Commerce Solutions</Text>

                      <CheckBox
                        center
                        // title='Yes'
                        checked={this.state.Secom}
                        containerStyle={{margin:0,padding:0}}
                        checkedColor='black'
                        onPress={() => {
                          if (this.state.Secom){
                          this.setState({Secom:false,secomvalue:''})}
                          else {
                            this.setState({Secom:true ,secomvalue:'E Commerce Solutions'})
                          }
                          }
                        }
                      />

                </View>     
               <View style={styles.row}>
                    
                      <Text style={{marginRight:5}}>Payment Gateway</Text>

                      <CheckBox
                        center
                        // title='Yes'
                        checked={this.state.Spg}
                        containerStyle={{margin:0,padding:0}}
                        checkedColor='black'
                        onPress={() => {
                          if (this.state.Spg){
                          this.setState({Spg:false ,spgvalue:''})}
                          else {
                            this.setState({Spg:true , spgvalue:'Payment Gateway'})
                          }
                          }
                        }
                      />

                </View>     
               <View style={styles.row}>
                    
                      <Text style={{marginRight:5}}>SSL Certificate</Text>

                      <CheckBox
                        center
                        // title='Yes'
                        checked={this.state.Sssl}
                        containerStyle={{margin:0,padding:0}}
                        checkedColor='black'
                        onPress={() => {
                          if (this.state.Sssl){
                          this.setState({Sssl:false ,ssslvalue:''})}
                          else {
                            this.setState({Sssl:true , ssslvalue:'SSL Certificate'})
                          }
                          }
                        }
                      />

                </View>     
               <View style={styles.row}>
                    
                      <Text style={{marginRight:5}}>Corporate Multimedia Presentation</Text>

                      <CheckBox
                        center
                        // title='Yes'
                        checked={this.state.Scorp}
                        containerStyle={{margin:0,padding:0}}
                        checkedColor='black'
                        onPress={() => {
                          if (this.state.Scorp){
                          this.setState({Scorp:false , scorpvalue:''})}
                          else {
                            this.setState({Scorp:true ,scorpvalue:'Corporate Multimedia Presentation'})
                          }
                          }
                        }
                        
                      />

                </View> 

                <TextInput  multiline={true} style={{height:100,width:wp('80%'),backgroundColor:'rgba(255, 255,255,0.2)',
      
                paddingHorizontal:16,
                fontSize:16,
                color:'#ffffff',
                marginVertical: 10}} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Project Description"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                value={this.state.description}
                onChangeText = {
                  (text) =>{
                    this.setState({description:text});
                  }    
                }            
            /> 




                <View style={styles.rouw}>
                
                <Text style={{}}>How would you want us to contact you?

                </Text> 


                <View style={styles.row}>
                    
                      <Text style={{}}>Phone</Text>

                      <CheckBox
                        center
                        // title='Yes'
                        checkedColor='black'
                        checked={this.state.contactPhone}
                        containerStyle={{margin:0,padding:0}}
                        onPress={() => this.setState({contactPhone:true ,cpvalue:'Phone' ,contactEmail:false})}
                        />
                      
                </View>

                <View style={styles.row}>
                    
                      <Text style={{}}>Email</Text>

                      <CheckBox
                        center
                        // title='Yes'
                        checked={this.state.contactEmail}
                        containerStyle={{margin:0,padding:0}}
                        checkedColor='black'
                        onPress={() => this.setState({contactPhone:false ,cevalue:'Email' ,contactEmail:true})}
                      />
                </View>

                <TextInput style={styles.inputBox} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="what is the best time to contact you"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                value={this.state.besttime}
                onChangeText = {
                  (text) =>{
                    this.setState({besttime:text});
                  }    
                }            
            /> 
                <TextInput style={styles.inputBox} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="Products in your catalog"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                value={this.state.productCatalog}
                onChangeText = {
                  (text) =>{
                    this.setState({productCatalog:text});
                  }    
                }            
            /> 
            <Text style={{}}>Please provide the addresses of Web Sites that you want to serve as a model of your web site</Text>   
            
            <TextInput style={styles.inputBox} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="http://www.mydomain.com"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                value={this.state.web1}
                onChangeText = {
                  (text) =>{
                    this.setState({web1:text});
                  }    
                }            
            /> 

<TextInput style={styles.inputBox} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="http://www.mydomain.com"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                value={this.state.web2}
                onChangeText = {
                  (text) =>{
                    this.setState({web2:text});
                  }    
                }            
            /> 

<TextInput style={styles.inputBox} 
                underlineColorAndroid='rgba(0,0,0,0)' 
                placeholder="http://www.mydomain.com"
                placeholderTextColor = "#ffffff"
                selectionColor="#fff"
                value={this.state.web3}
                onChangeText = {
                  (text) =>{
                    this.setState({web3:text});
                  }    
                }            
            /> 

            </View>

          <View style={{flexDirection:'row',alignContent:'center'}}>      
          <TouchableOpacity style={styles.button}
            onPress={this.Submit}>
            
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity> 


            <TouchableOpacity style={styles.button}
            onPress={this.Reset}>
            
            <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity> 
          </View>

          </Card> 

        <Footer/>


      </ScrollView>
    );
    }
}


const styles = StyleSheet.create({
  container : {
      flexGrow: 1,
      justifyContent:'center',
      alignItems: 'center',
      backgroundColor:'#455a64'
    },
   row:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
    inputBox: {
      width:wp('80%'),
      backgroundColor:'rgba(255, 255,255,0.2)',
      borderRadius: 25,
      paddingHorizontal:16,
      fontSize:16,
      color:'#ffffff',
      marginVertical: 10
    },
    button: {
      width:100,
      backgroundColor:'#1c313a',
       borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13,
        margin:2
    },
    buttonText: {
      fontSize:16,
      fontWeight:'500',
      color:'#ffffff',
      textAlign:'center'
    },
  })