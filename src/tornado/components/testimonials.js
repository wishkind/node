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
import { Icon, Card } from "react-native-elements";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Footer from "./footer";


export default class testimonials extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <ImageBackground
            source={require("../assets/people.jpg")}
            style={{   width: wp('100%') ,height: hp('50%') }}
          >
            <Card containerStyle={{ opacity: 0.8 }}>
              <Text style={[styles.aboutText, {}]}>
                What People are Saying!
              </Text>

              <Text style={[styles.otherText, {}]}>
                We work with you to document the scope of a project, how the
                project is to be implemented and the final deliverable and
                costs. We will update you on the progress on a scheduled basis:.
              </Text>

              <Image
                style={{ width: 270, height: 150 }}
                source={require("../assets/testimonials.png")}
              />
            </Card>
          </ImageBackground>
        </View>

        <Text style={[styles.aboutText, { color: "#f4a000" }]}>
          Client Testimonials
        </Text>
        <Text style={[styles.otherText, {textAlign:'center' }]}>
        Tornado's Creative Professionals take every opportunity to communicate new ideas broadly, seek feedback, and develop a sense of accountability.
        </Text>

        <Icon
          size={84}
          name="format-quote-open"
          type="material-community"
          color="black"
        />

        <Card >
          <Text style={[{ ...styles.textbold }, { ...styles.otherText }]}>
              When we contacted tornado.ae, we realized we needed more than just a redesign; we needed an experienced consulting partner that could provide us with a robust strategy that enveloped our whole digital presence. From constructive competitor insights to multi-channel customer engagement, tornado.ae delivered the valuable research and implementation. Finally, to top it all, the quick turnaround time exceeded my expectations.
                Thank you Tornado Computer, I highly recommend your services! 
          </Text>

          <View style={styles.row}>

              <Text style={styles.otherText}>
                Chris Nel {'\n'}Managing Director
              </Text>

              <Image
                style={{ width: 37, height: 37 ,borderRadius:50}}
                source={require("../assets/quoteicon.jpg")}
              />


          </View>

        </Card>
       
        <Card >
          <Text style={[{ ...styles.textbold }, { ...styles.otherText }]}>
          The Tornado team always goes out of their way to offer wonderful service and competitive pricing. Their quality programming and creative web design have simplified every aspect of our business and given us opportunities to keep growing.
          </Text>

          <View style={styles.row}>

              <Text style={styles.otherText}>
              Tom Mchenry {'\n'}General Manager
              </Text>

              <Image
                style={{ width: 37, height: 37 ,borderRadius:50}}
                source={require("../assets/quoteicon.jpg")}
              />


          </View>

        </Card>


        <Card >
          <Text style={[{ ...styles.textbold }, { ...styles.otherText }]}>
          Tornado has a willingness and ability to listen to what we want and how we want it to be portrayed. Since completion, we feel we have one of the best sites in our industry and Tornado has been available to us at the 'drop of a hat'. Based on our experience with Tornado, our level of satisfaction could not be higher.
          </Text>

          <View style={styles.row}>

              <Text style={styles.otherText}>
              Rick Coscarelli{'\n'}Sales Executive
              </Text>

              <Image
                style={{ width: 37, height: 37 ,borderRadius:50}}
                source={require("../assets/quoteicon.jpg")}
              />


          </View>

        </Card>
        
        
        <Card >
          <Text style={[{ ...styles.textbold }, { ...styles.otherText }]}>
          Tornado was great at working with us to launch our new site with a short deadline. We wanted to launch in conjunction with our new fall ministries and they easily met the challenge.
          </Text>

          <View style={styles.row}>

              <Text style={styles.otherText}>
              Brian Smith{'\n'}Marketing Manager
              </Text>

              <Image
                style={{ width: 37, height: 37 ,borderRadius:50}}
                source={require("../assets/quoteicon.jpg")}
              />


          </View>

        </Card>
        
       

        <Card >
          <Text style={[{ ...styles.textbold }, { ...styles.otherText }]}>
          This is a brief note to express my gratitude for the exceptional work you and your staff have done for me. The website has exceeded my expectations. This is great and every person who has visited so far has been very impressed.
          </Text>

          <View style={styles.row}>

              <Text style={styles.otherText}>
              Shawn Madsen{'\n'}IT Manager
              </Text>

              <Image
                style={{ width: 37, height: 37 ,borderRadius:50}}
                source={require("../assets/quoteicon.jpg")}
              />


          </View>

        </Card>
        
        <Card containerStyle={{marginBottom:10}}>
          <Text style={[{ ...styles.textbold }, { ...styles.otherText }]}>
          We love our new website! Working with Tornado consulting was a wonderful experience for us, we were true partners. We had some ideas that were well-developed in our minds and very important to us, but there was a lot we didn't know.”.
          </Text>

          <View style={styles.row}>

              <Text style={styles.otherText}>
              Katherine Marine{'\n'}Managing Director
              </Text>

              <Image
                style={{ width: 37, height: 37 ,borderRadius:50}}
                source={require("../assets/quoteicon.jpg")}
              />


          </View>

        </Card>
        <Icon
          size={84}
          name="format-quote-close"
          type="material-community"
          color="black"
        />

        <Footer/> 





      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  row:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  aboutText: {
    fontSize: 25,
    color: "green",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
    marginTop: 15
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
  skills: {
    marginTop: 10
  }
});
