import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  ScrollView
} from "react-native";
import { Icon, Card, Divider ,CheckBox } from "react-native-elements";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Footer from "./footer";
import Logo_catalog from './logo_catalog';

export default class home extends Component {
constructor(props){
    super(props);
}
static navigationOptions = {
}

  render() {
   // const navigate= 
    return (
      <ScrollView>
      
       <View style={{justifyContent:'center',alignItems:'center'}}>
              <ImageBackground
                    source={require("../assets/tornado7.jpg")}
                    style={{   width: wp('100%') ,height: hp('30%') }}
              >
                  <View  style={{alignContent:'center',justifyContent:'center',textAlign:'center',alignItems:'center',flex:1}}>
                        <Text style={{alignSelf:'center',fontSize:20,fontWeight:'700',color:'white'}}>
                        GET AHEAD OF YOUR COMPETITORS!
                      </Text> 
                        <Text style={{alignSelf:'center',textAlign:'center',fontSize:20,fontWeight:'700',color:'white'}}>
                        With Tornado's Cost Effective and Best Responsive Web Solutions.
                      </Text> 
                  </View>
              </ImageBackground>

              <Text style={{padding:3,alignSelf:'center',textAlign:'center',fontSize:20,fontWeight:'700',color:'blue',marginTop:10}}>
              UAE BASED INTERNATIONAL WEB DESIGN & DEVELOPMENT COMPANY
              </Text> 
              <Text style={{alignSelf:'center',textAlign:'center',fontSize:15,fontWeight:'300',marginTop:10}}>
              Creative Website Design And Clever Application Development From Our Digital Team
              </Text> 

              <Text style={{alignSelf:'center',textAlign:'center',fontSize:14,fontWeight:'200',marginTop:10}}>
                      <Text style={{fontWeight:"bold"}}>Tornado Computer Trading (L.L.C.)</Text> creates effective, fully customized web
                        development solutions to professionally support your organization needs
                        and goals and further increase efficiency of your organization to help
                        improve your bottom line and its productivity. Tornado has improved the productivity and efficiency of more than
                        600 corporate, industrial organizations, and we are proud to have largest
                        client portfolio in Dubai in comparison to our competitors
              </Text> 

              <Text style={{alignSelf:'center',textAlign:'center',fontSize:14,fontWeight:'200',color:'green',marginTop:10}}>
              Throughout our journey, we have undertaken and accomplished website design
                & development projects with different levels of complexities and demands.</Text>

            <Card title='Services We Offers' containerStyle={{marginBottom:10,elevation:3,backgroundColor:'black'}}>

                {/* <Text></Text> */}

                <Text style={{color:'white'}}>We provide a comprehensive range of services to
                        maximize your business's online potential and its reach. Our services
                        cover every aspect of your business needs such as setting up and
                        maintaining a successful fully responsive and customizable website. The
                        core of our business revolves around designing and developing uniquely
                        custom websites as your business demands. Our Website Design &
                        Development Services Include, custom website designing, web development,
                        Flash & Multimedia Presentation, E-Commerce website designing, Logo
                        Designs, Graphic Designs, Domain Registrations, Web Hosting and Search
                        Engine Optimizations.
                  </Text>

            </Card>


            <View style={{marginBottom:2,height:hp('15%'),width:wp('100%'),backgroundColor:'#d7d7d7',textAlign:'center',alignItems:'center',justifyContent:"center",alignSelf:'center',flex:1,alignContent:'center'}}>
              <Text>LOGO DESIGN / GRAPHIC DESIGN</Text>
              <Text style={{alignSelf:'center',marginHorizontal:wp('10%')}}>Whether it's for your website,
                  company presentation or an identity for your firm. We will design it for you.
              </Text>

            </View>


            <View style={{marginBottom:4,height:hp('15%'),width:wp('100%'),backgroundColor:'#d7d7d7',textAlign:'center',alignItems:'center',justifyContent:"center",alignSelf:'center',flex:1,alignContent:'center'}}>
              <Text>SEARCH ENGINE OPTIMIZATIONS</Text>
              <Text style={{alignSelf:'center',marginHorizontal:wp('10%')}}>With us get your business known
                on all major search engines such as Google, Bing and Yahoo.
              </Text>

            </View>


            <View style={{marginBottom:2,height:hp('18%'),width:wp('100%'),backgroundColor:'#d7d7d7',textAlign:'center',alignItems:'center',justifyContent:"center",alignSelf:'center',flex:1,alignContent:'center'}}>
              <Text>WEB DEVELOPMENT</Text>
              <Text style={{alignSelf:'center',marginHorizontal:wp('10%'),marginBottom:10}}>We offer World class
              professional web development solutions for both small and large scale
              organizations around the world.
              </Text>

            </View>

            <View style={{marginBottom:2,height:hp('15%'),width:wp('100%'),backgroundColor:'#d7d7d7',textAlign:'center',alignItems:'center',justifyContent:"center",alignSelf:'center',flex:1,alignContent:'center'}}>
              <Text>WEB DESIGN</Text>
              <Text style={{alignSelf:'center',marginHorizontal:wp('10%')}}>Get expert hands with simple
                and professional solutions of the best modern web trends.
              </Text>

            </View>


            <Card title='Why Tornado Is Best Choice' containerStyle={{marginBottom:10,elevation:3,backgroundColor:'black'}}>



                  <Text style={{color:'white'}}>
                      Put simply, if you demand a service that cares about your business and its
                      future needs then choose TORNADO.
                    </Text>
                  {/* <View style={{backgroundColor:''}}/>   */}
                  <Divider style={{marginBottom:10,marginTop:10}}/>

                  <Text style={{color:'white'}}>Our Solutions Are Cost Effective</Text>
                  <Text style={{color:'white'}}>Free Technical Support For A Year</Text>
                  <Text style={{color:'white'}}>Dedicated & Professional Staff Members</Text>
                  <Text style={{color:'white'}}>Powerful & Responsive Unique Designs</Text>



              </Card>


              <Text style={{padding:3,alignSelf:'center',textAlign:'center',fontSize:20,fontWeight:'700',color:'blue',marginTop:10}}>
              Website Development Dubai
              </Text>
              
              <Text style={{padding:20}}>Creative Website Design And Clever Application Development From Our
                Digital Team</Text>

              <Divider/>
              <Text style={{padding:20}}>As a Web Design Company Dubai its significant for us to keep up with
              the latest trends in web design methods and technology. More than 85% of
              websites online today fail to comply with the new web 2.0 standards. These
              standards boost ranking, conversions and the over-all success of any
              website.
              </Text> 

              <Text style={{padding:20}}>
              In todays competitive market it extremely important to stay in tune with
              all aspects of your business including your website. Everyday more and
              more traders are turning to the internet for information on the company
              with which they will choose to do business. Don't let your company fall
              behind! Call us today and let's discuss how we can make your business web
              presence look better.
              </Text>  

              <View style={[styles.rows,{flexWrap:'wrap'}]}>
              <View style={styles.row}>
              <Icon name='done' size={22} color='blue'/>
                <Text>Full Website Redesign Services  </Text>
              </View>


              <View style={styles.row}>
                <Icon name='done' size={22} color='blue'/>
                <Text>Logo and Image Redesign Services</Text>
              </View>


              <View style={styles.row}>
              <Icon name='done' size={22} color='blue'/>
                <Text>Refresh content, optimize keywords for better indexing.
                </Text>
              </View>


              <View style={styles.row}>
              <Icon name='done' size={22} color='blue'/>
                <Text> Convert code to web 2.0 standards to make
                  website Google friendly.
                  </Text>
              </View>


              <View style={styles.row}>
              <Icon name='done' size={22} color='blue'/>
                <Text>Optimized and slice images for faster
                      page load time.
                      </Text>
              </View>


              <View style={styles.row}>
              <Icon name='done' size={22} color='blue'/>
                <Text style={{marginRight:5}}> Insure cross Browser Compatible to make
                    compatible for everyone.
                    </Text>
              </View>


              <View style={styles.row}>
              <Icon name='done' size={22} color='blue'/>
                <Text style={{marginRight:5}}>Code to ensure superior indexing for the
                    best end result.
                    </Text>
              </View>
              
            </View>

            <Text style={{padding:3,alignSelf:'center',textAlign:'center',fontSize:20,fontWeight:'700',color:'blue',marginTop:10}}>
              Our Latest Projects
            </Text>

            <View style={{flexWrap:'wrap',flexDirection:'row',padding:15,justifyContent:'space-between' ,backgroundColor:'#d7d7d7'}}>  

              <Image
                  style={{ width: wp('45%'), height: hp('20%'),marginBottom:5}}
                  source={require("../assets/logo/p5.jpg")}
                />
              <Image
                  style={{ width: wp('45%'), height: hp('20%'),marginBottom:5}}
                  source={require("../assets/logo/p22.jpg")}
                />
              <Image
                  style={{width: wp('45%'), height: hp('20%'),marginBottom:5 }}
                  source={require("../assets/ecom/p3.jpg")}
                />
              <Image
                  style={{ width: wp('45%'), height: hp('20%') ,marginBottom:5}}
                  source={require("../assets/ecom/p6.jpg")}
                />
              <Image
                  style={{ width: wp('45%'), height: hp('20%'), marginBottom:5}}
                  source={require("../assets/catalog/p1.jpg")}
                />
              <Image
                  style={{ width: wp('45%'), height: hp('20%') ,marginBottom:5}}
                  source={require("../assets/catalog/p2.jpg")}
                />
              <Image
                  style={{ width: wp('45%'), height: hp('20%'),marginBottom:5 }}
                  source={require("../assets/p21.jpg")}
                />
              <Image
                  style={{ width: wp('45%'), height: hp('20%'),marginBottom:5 }}
                  source={require("../assets/p7.jpg")}
                />



            </View>

           





       </View> 
       <Footer/>
      
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  rows:{
    // flexDirection:'row',
    // justifyContent:'center',
    // alignContent:'center',
    // textAlign:'center',
     padding:20,
    // alignItems:'center'

  },
  row:{
    flexDirection:'row',
   // justifyContent:'center',
   // alignContent:'flex-start',
    // textAlign:'center',
    //  padding:20,
    // alignItems:'center'

  },
});