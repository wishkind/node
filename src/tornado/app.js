
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View , TouchableHighlight} from 'react-native';
import {createStackNavigator,createSwitchNavigator,createAppContainer,createDrawerNavigator} from 'react-navigation';
import home from './components/home';
import aboutus from './components/aboutus';
import services from './components/services';
import portfolio from './components/portfolio';
import testimonials from './components/testimonials';
import blog from './components/blog';
import contactus from './components/contactus';
import requestaquota from './components/requestaquota';
import splash from './components/splash';
import mail from './components/mail';

import drawerContentComponents from './components/drawerContentComponents';
import { Icon } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
 
 


export default class App extends Component {

  // constructor(props){
  //   super(props);
  // }


  render() {
    return (
      <AppStackNavigator/>
    );
  }
}


const homescreen = createStackNavigator(
  {
    Splash :{
      screen:splash,
    },
    // Mail :{
    //   screen:mail,
    // },

    Home :{
      screen:home,
      navigationOptions: ({navigation})=>({
        headerTitle:"Home",
        headerStyle: {
          backgroundColor: 'skyblue',          
        },
        headerLeft:<Icon iconStyle={{paddingLeft:15}} size={24} name="bars" type="font-awesome" color='black' onPress={()=>navigation.openDrawer()}/> 
      })
    },
  },
  {
    initialRouteName: 'Splash'
  }
 
  
);

const aboutusscreen = createStackNavigator(
  {
    AboutUs :{
          screen:aboutus,
          navigationOptions: ({navigation})=>({
            headerTitle:"About Us",
            headerStyle: {
              backgroundColor: 'skyblue',          
            },
            headerLeft:<Icon iconStyle={{paddingLeft:15}} size={24} name="bars" type="font-awesome" color='black' onPress={()=>navigation.openDrawer()}/> 
          })
    }
  },
  
);

const servicesscreen = createStackNavigator(
  {
    Services :{
      screen:services,
      navigationOptions: ({navigation})=>({
        headerTitle:"Services",
        headerStyle: {
          backgroundColor: 'skyblue',          
        },
        headerLeft:<Icon iconStyle={{paddingLeft:15}} size={24} name="bars" type="font-awesome" color='black' onPress={()=>navigation.openDrawer()}/> 
      })
    }
  },
  
);

const portfolioscreen = createStackNavigator(
  {
    Portfolio :{
      screen:portfolio,
      navigationOptions: ({navigation})=>({
        headerTitle:"Portfolio",
        headerStyle: {
          backgroundColor: 'skyblue',          
        },
        headerLeft:<Icon iconStyle={{paddingLeft:15}} size={24} name="bars" type="font-awesome" color='black' onPress={()=>navigation.openDrawer()}/> 
      })
    }
  },
  
);


const testimonialsscreen = createStackNavigator(
  {
    Testimonials :{
      screen:testimonials,
      navigationOptions: ({navigation})=>({
        headerTitle:"Testimonials",
        headerStyle: {
          backgroundColor: 'skyblue',          
        },
        headerLeft:<Icon iconStyle={{paddingLeft:15}} size={24} name="bars" type="font-awesome" color='black' onPress={()=>navigation.openDrawer()}/> 
      })
    }
  },
  
);


const blogscreen = createStackNavigator(
  {
    Blog :{
      screen:blog,
      navigationOptions: ({navigation})=>({
        headerTitle:"Blog",
        headerStyle: {
          backgroundColor: 'skyblue',          
        },
        headerLeft:<Icon iconStyle={{paddingLeft:15}} size={24} name="bars" type="font-awesome" color='black' onPress={()=>navigation.openDrawer()}/> 
      })
    }
  },
 
);


const contactusscreen = createStackNavigator(
  {
    ContactUs :{
      screen:contactus,
      navigationOptions: ({navigation})=>({
        headerTitle:"Contact Us",
        headerStyle: {
          backgroundColor: 'skyblue',          
        },
        headerLeft:<Icon iconStyle={{paddingLeft:15}} size={24} name="bars" type="font-awesome" color='black' onPress={()=>navigation.openDrawer()}/> 
      })
    }
  },
  
);


const requestaquotascreen = createStackNavigator(
  {
    RequestAQuota :{
    screen:requestaquota,
    navigationOptions: ({navigation})=>({
      headerTitle:"Request A Quote",
      headerStyle: {
        backgroundColor: 'skyblue',          
      },
      headerLeft:  <Icon iconStyle={{paddingLeft:15,shadowColor:'blue',borderRadius:50,shadowRadius:80}} size={24} name="bars" type="font-awesome" color='black' onPress={()=>navigation.openDrawer()}/>  
    })
    }
  },
 
);


const AppNavigator = createDrawerNavigator(
  {
  

  Home :{
        name: 'Home',
         screen:homescreen,
        // navigationOptions:{
        //   drawerLabel: 'Home',
        //   header:null
        // }
      },
      AboutUs :{
        name: 'About',
        screen:aboutusscreen,
        // navigationOptions:{
        //   drawerLabel: 'About Us'
        // }
      },
      Services :{
        screen:servicesscreen,
        // navigationOptions:{
        //   drawerLabel: 'Services'
        // }
      },
      Portfolio :{
        screen:portfolioscreen,
        // navigationOptions:{
        //   drawerLabel: 'Portfolio'
        // }
      },
      Testimonials :{
        screen:testimonialsscreen,
        // navigationOptions:{
        //   drawerLabel: 'Testimonials'
        // }
      },
      Blog :{
        screen:blogscreen,
        // navigationOptions:{
        //   drawerLabel: 'Blog'
        // }
      },
      ContactUs :{
        screen:contactusscreen,
        // navigationOptions:{
        //   drawerLabel: 'Contact Us'
        // }
      },
      RequestAQuota :{
        screen:requestaquotascreen,
        // navigationOptions:{
        //   drawerLabel: 'Request A Quota'
        // }
      },





  },
  {
    drawerWidth:wp('70%'),
    contentComponent: drawerContentComponents,
    initialRouteName:'RequestAQuota'
  });
const AppStackNavigator=createAppContainer(AppNavigator);










const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#cccc',

  },
  
});
