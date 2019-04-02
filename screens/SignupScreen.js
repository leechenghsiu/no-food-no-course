import React from 'react';
import { View, Platform, Text, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class SignupScreen extends React.Component {
  // static navigationOptions = ({navigation}) => {
  //   const qrscanner = <Ionicons
  //     name={Platform.OS === "ios" ? "ios-qr-scanner" : "md-qr-scanner"}
  //     color="#007AFF"
  //     size={25}
  //     style={{padding: 10 }}
  //     onPress={() => navigation.navigate('Qrcode')}
  //   />
  //   return {
  //     headerRight: qrscanner
  //   }
  // }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text>Signup Screen</Text>
        <Button title="Login" onPress={()=> this.props.navigation.navigate('Main')}/>
      </View>
    )
  }
}

export default SignupScreen;
