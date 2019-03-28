import React from 'react';
import { View, Text, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import QrcodeApi from '../api/QrcodeApi';

class QrcodeScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const back = <Ionicons
      name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"}
      color="#007AFF"
      size={25}
      style={{padding: 10 }}
      onPress={() => navigation.goBack()}
    />

    return {
      // headerTransparent: true,
      headerLeft: (
        back
      )
    }
  };

  render() {
    const name = this.props.navigation.getParam('name');
    const balance = this.props.navigation.getParam('balance');

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <QrcodeApi />
        <Text>{`${name} ${balance}`}</Text>
      </View>
    )
  }
}

export default QrcodeScreen;
