import React from 'react';
import { View, Platform, StyleSheet, Text } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import Ionicons from 'react-native-vector-icons/Ionicons';

class ScannerScreen extends React.Component {
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

  state = {
    hasCameraPermission: null,
    data: {
      name: '無',
      balance: 1000
    }
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
          //判斷是否屬於 QR Code
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
        />
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
        </View>
        <View style={{ flex: 3, backgroundColor: 'transparent' }}>
        </View>
        <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
        </View>
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.props.navigation.navigate('Qrcode',{name: this.state.data.name, balance: this.state.data.balance});

    let name = JSON.parse(data).name;
    let balance = JSON.parse(data).balance - 200;

    this.setState({
      data: {
        name,
        balance
      } 
    })
    console.log(this.state.data);
  }
}

export default ScannerScreen;