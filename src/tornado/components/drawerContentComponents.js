import React, { Component } from 'react';
import {NavigationActions} from 'react-navigation';
import { Text, View, StyleSheet, ImageBackground ,Image, ScrollView  } from 'react-native'
import { white } from 'ansi-colors';
import { Icon } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default class drawerContentComponents extends Component {

    navigateToScreen = ( route ) =>(
        () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    })

  render() {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Image style={{flex:2, height: hp('22%'),width: wp('70%') }}
                source={require('../assets/tornado.jpg')}

                />
                
            </View>
            <View style={styles.screenContainer}>
                <View style={[styles.screen,{flex:1}]}>
                
                    <Icon size={24} name="home" type="material-community" color='black' onPress={this.navigateToScreen('Home')}/>
                    <Text style={{marginLeft:10,}} onPress={this.navigateToScreen('Home')}>Home</Text>
                
                </View>
                <View style={styles.screen}>
                    <Icon
                        name='people'
                        type='material'
                        color='black'
                        onPress={this.navigateToScreen('AboutUs')}
                    />
                    <Text  style={{marginLeft:10}} onPress={this.navigateToScreen('AboutUs')}>About Us</Text>
                </View>
                <View style={styles.screen}>
                <Icon size={24} name="face-agent" type="material-community" color='black'  onPress={this.navigateToScreen('Services')}/>
                    <Text  style={{marginLeft:10}}onPress={this.navigateToScreen('Services')}>Services</Text>
                </View>
                <View style={styles.screen}>
                    
                <Icon size={24} name="folder" type="font-awesome" color='black' onPress={this.navigateToScreen('Portfolio')}/> 
                    <Text  style={{marginLeft:10}} onPress={this.navigateToScreen('Portfolio')}>Portfolio</Text>
                </View>

                <View style={styles.screen}>
                   
                <Icon size={24} name="format-quote-open" type="material-community" color='black' onPress={this.navigateToScreen('Testimonials')}/>
                    <Text  style={{marginLeft:10}} onPress={this.navigateToScreen('Testimonials')}>Testimonials</Text>
                </View>
                {/* <View style={styles.screen}>
                <Icon size={24} name="blogger" type="material-community" color='black' />
                    <Text  style={{marginLeft:10}} onPress={this.navigateToScreen('Blog')}>Blog</Text>
                </View> */}
                <View style={styles.screen}>
                <Icon size={24} name="sc-telegram" type="evilicon" color='black' onPress={this.navigateToScreen('RequestAQuota')}/>
                    <Text  style={{marginLeft:10}} onPress={this.navigateToScreen('RequestAQuota')}>Request A Quote</Text>
                </View>
                <View style={styles.screen}>
                <Icon size={24} name="phone" type="material-community" color='black' onPress={this.navigateToScreen('ContactUs')}/>
                    <Text  style={{marginLeft:10}} onPress={this.navigateToScreen('ContactUs')}>Contact Us</Text>
                </View>
            </View>
        </ScrollView>
    
    )
  }
}

const styles = StyleSheet.create({
    container: {
        // alignItems: 'center',
        flex:1
    },
    headerContainer: {
        height: 150,
        flex:2
    },
    headerText: {
        color: '#fff8f8',
    },
    screenContainer: {
       flex:1,
        alignContent: 'center',
        // alignItems:'flex-start'
        padding: 10,
        // margin:30
    },
    screenStyle: {
        height: 30,
        marginTop: 2,
        flexDirection: 'row',
        alignItems: 'center'
    },
    screenTextStyle:{
        fontSize: 20,
        marginLeft: 20
    },
    screen:{
        // backgroundColor:'skyblue'
        margin :10,
        flexDirection:'row',
        //justifyContent:'space-evenly',
        // alignItems:'flex-start'
    }

});