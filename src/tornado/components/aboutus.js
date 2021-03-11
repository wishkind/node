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
import Footer from './footer';

import ProgressBarAnimated from 'react-native-progress-bar-animated';



export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = { progress: 99.9,
      progressWithOnComplete: 0,
      progressCustomized: 0,};
  }

  render() {

    const barWidth = wp('50%');
    const progressCustomStyles = {
      backgroundColor: '#e44d26', 
      borderRadius: 50,
      borderColor: '#e44d26',
     
     
    };



    return (
      <ScrollView style={{backgroundColor:'#d7d7d7'}}>
        <View>
          <Image
            source={require("../assets/companyProfile.jpg")}
            style={{ height:hp('40%'),width: wp('100%') }}
          />
        </View>

        <Text style={styles.aboutText}>ABOUT US</Text>

        <Text style={styles.paratext}>
          Tornado's Creative Professionals take every opportunity to communicate
          new ideas broadly, seek feedback, and develop a sense of
          accountability.
        </Text>

        <View style={{ backgroundColor: "gray", height: 1, margin: 10 }} />

        <Image
          source={require("../assets/aboutusImage.jpg")}
          style={{ height:hp('40%'),width: wp('100%')}}
        />

        <Text style={styles.otherText}>
          <Text style={styles.textbold}>
            Tornado Computer Trading (L.L.C.){" "}
          </Text>
          was founded in 2004 and has since become UAE's leading Web Design
          Dubai, S.E.O, Web Application Development, Multimedia, Web and
          corporate solutions company.
        </Text>

        <Text style={styles.otherText}>
          <Text style={styles.textbold}>
            Tornado Computer Trading (L.L.C.){" "}
          </Text>
          creates effective, fully customized web development and corporate
          media printing solutions to professionally support your organization
          needs and goals and further increase efficiency of your organization
          to help improve your bottom line and its productivity. We are always
          ready to help you! For us your project is not “just another project".
        </Text>

        <Text style={styles.otherText}>
          We at Tornado provide affordable solutions that are professionally at
          corporate and industrial level, easily accessible & S.E.O friendly and
          that help you maximize the value of your business and its future
          needs. Our dedicated project managers tasked to you provide a friendly
          and expert consultancy during our project's and will be always a phone
          call away even after the project is completed. Our solutions help you
          and your organization interact in a better way with your clients.{" "}
        </Text>

        <Text style={[{ ...styles.textbold }, { ...styles.otherText }]}>
          We're a small yet highly qualified team with creative and innovative
          ideas and processes. You will always have our undivided attention.
        </Text>

        <View style={{ backgroundColor: "gray", height: 1, margin: 5 }} />

        <Text style={styles.aboutText}>
          OUR WEB DESIGN & DEVELOPMENT PROCESS:
        </Text>

        <Text style={styles.otherText}>
          Web design may not be as hard as rocket science these days, but still
          it's not child's play either. For today's companies, industries the
          website has become one of the most important way of communication with
          their client base, partners and investors and In the case of
          e-commerce businesses, its website is its storefront. This is why it
          needs to do what you need it to do, and not look like every other
          website out there. We at Tornado always keep these two serious points
          as our goal for every new web project we are tasked with.{" "}
        </Text>

        <Text style={[{ ...styles.textbold }, { ...styles.otherText }]}>
          Tornado Computer Trading (L.L.C.) can offer you the high quality and
          affordable Web solutions you seek by maximizing the efficiencies of
          project.
        </Text>

        <Card  image={require("../assets/mangment.png") }
        >
          <Text style={[{ ...styles.textbold }, { ...styles.otherText }]}>
            We will implement a rigorous project management:
          </Text>

          <Text style={styles.otherText}>
            You set the project scope, deadlines and budgets. The Tornado
            Computer project manager system will make sure all process elements
            are synchronized and executed in a timely and orderly manner to meet
            your expectations.
          </Text>
        </Card>

        <Card  image={require("../assets/mangment2.png")}>
          <Text style={[{ ...styles.textbold }, { ...styles.otherText }]}>
            We will help you do a detailed discovery:
          </Text>

          <Text style={styles.otherText}>
            We work with you to document the scope of your desired project, how
            the project is to be implemented and then be finalized, and
            deliverable. We will update you on the progress on a scheduled
            basis; you review each step of a project and approve it before the
            next step is taken. Your single point of contact with us is your
            Tornado Computer project coordinator.
          </Text>
        </Card>

        <Card  image={require("../assets/mangment3.png")}>
          <Text style={[{ ...styles.textbold }, { ...styles.otherText }]}>
            We will do quality assurance:
          </Text>

          <Text style={styles.otherText}>
            Before your project is launched or released, it is thoroughly tested
            and proofed by or most experience designers and developers.
          </Text>
        </Card>

        <View
          style={{
            backgroundColor: "gray",
            height: 2,
            marginTop: 10,
            marginBottom: 10
          }}
        />

        <Text style={styles.aboutText}>WHAT'S THE DIFFERENCE</Text>

        <Text style={styles.otherText}>
          We at Tornado treat each given project as a new challenge. We are not
          afraid to say, that we are still learning. In fact, the ability to
          learn is for better advantage than fixed, no matter how big,
          knowledge. We constantly follow new solutions and technologies to be
          up to date and to give the Customers the proof of our care.
        </Text>

        <Text style={styles.aboutText}>OUR VISION</Text>

        <Text style={styles.otherText}>
          Our experience, expertise and technology provide the catalyst, helping
          all small and large scale organizations everywhere to be more
          competitive, more efficient, more responsive, more productive and more
          effective in the field of website development. We make it possible for
          them to visualize everything in a unique way.
        </Text>

        <Text style={styles.aboutText}>OUR MISSION</Text>

        <Text style={styles.otherText}>
          Our mission is to ensure the best relationship with our clients, both
          during and after their project goals have been met. We keep this in
          mind whether designing print media, producing multimedia or building
          websites. .
        </Text>

       

        <Card title="GOALS & OBJECTIVES" image={require("../assets/gen_13.jpg")}>
          <Text style={{ marginBottom: 10,color:'black' }}>
          The goal of our company is to provide the highest possible quality creative services to our worthy clients.We will measure the effectiveness of the services we provide not only by our own standards but also by how well they meet the specific objectives of our patrons.We will strive to cultivate relationships with our valued customers who need and can appreciate the additional impact that work
           of our quality creates for their organizations, products and services.
          </Text>
          
        </Card>

        <View style={styles.skills}>
          {/* <Image
            source={require("../assets/people.jpg")}
            style={{ height:hp('45%'),width: wp('100%') ,position:'absolute',}}
          /> */}

          <Card containerStyle={{backgroundColor:'black',opacity:0.6}}> 

          <Text  style={[styles.aboutText,{color:'white'}]}> OUR SKILLS </Text>
          <Text  style={{color:'white',padding: 10}}>Tornado Computer Trading (L.L.C.) delivers the highest quality Website Design and Development solutions at affordable prices. Web technologies are developing swiftly. Everyday there are new innovations to apply to the creation of your Web presence. Tornado team has mastered in many different designs, techniques and programming languages and works through authentic process.

                 
          </Text>
          
          <Text  style={{color:'white',padding: 10,textAlign:'center'}}> Please have a look at our areas of expertise:</Text>
          
          <Text  style={{color:'#9cd7fd',padding: 10,textAlign:'center'}}> HTML5, CSS3, JQUERY </Text>
         
          <View style={{ paddingHorizontal: wp('20%'),}}>
            <ProgressBarAnimated
              {...progressCustomStyles}
              width={barWidth}
              maxValue={30}
              value={this.state.progress}
            />
          </View>
         
         
          <Text  style={{color:'#9cd7fd',padding: 10,textAlign:'center'}}> PHP, WordPress, Joomla, Magento </Text>
         
          <View style={{ paddingHorizontal: wp('20%'),}}>
            <ProgressBarAnimated
              {...progressCustomStyles}
              width={barWidth}
              maxValue={30}
              value={96.9}
            />
          </View>
        
          <Text  style={{color:'#9cd7fd',padding: 10,textAlign:'center'}}> Search Engine Optimization </Text>
         
          <View style={{ paddingHorizontal:  wp('20%'),}}>
            <ProgressBarAnimated
              {...progressCustomStyles}
              width={barWidth}
              maxValue={30}
              value={95.9}
            />
          </View>
         
          <Text  style={{color:'#9cd7fd',padding: 10,textAlign:'center'}}> Photoshop, Illustrator </Text>
         
          <View style={{ paddingHorizontal:  wp('20%'),}}>
            <ProgressBarAnimated
              {...progressCustomStyles}
              width={barWidth}
              maxValue={30}
              value={99.00}
            />
          </View>
        
        </Card>
        </View>

     
        
        <Text  style={[styles.aboutText,{color:'blue',marginTop:20,paddingTop:20}]}> AUTHENTIC PROCESS </Text>
        <Text  style={[styles.otherText,{marginTop:5}]}> Tornado Computers provides you quality website development services by using latest techniques and most modern mechanism. We make sure that we follow a clear, systematic, coordinative method to ensure a functional & attractive website. Every requirement of customer for website, attractive graphic design, hosting service, Software Development, SEO or other web service is being taken as challenging job by following authentic process. </Text>
          
         <Footer/> 

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
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
  skills :{
    marginTop:10
  }
});
