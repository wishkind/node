import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image
} from "react-native";

class Category extends Component {
    render() {
        return (
            <View style={{ height: 180, width: 130, marginLeft: 20, borderWidth: 0.6, borderColor: '#dddddd' }}>
                <View style={{ flex: 1 }}>
                    <Image source={this.props.data.pic}
                        style={{ flex: 2, width: 130, height: 130,  }}
                    />

                </View>

                <View style={{flex:1,opacity:0.5,backgroundColor:'',height:185,marginTop:5}}>
                                        
                   <Text style={{ color:'black',fontSize:10 ,fontWeight:'bold',textAlign:'center'}}>{this.props.data.t1}</Text>
                   <Text style={{ color:'black',fontSize:10 ,textAlign:'center' }}>{this.props.data.t2}</Text>
                   <Text style={{ color:'black',fontSize:10  ,textAlign:'center'}}>{this.props.data.link}</Text>
                                                                          
                </View>
                
            </View>
        );
    }
}
export default Category;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});