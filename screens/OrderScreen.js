import React from 'react';
import { View, Platform, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class OrderScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const qrscanner = <Ionicons
      name={Platform.OS === "ios" ? "ios-qr-scanner" : "md-qr-scanner"}
      color="#007AFF"
      size={25}
      style={{padding: 10 }}
      onPress={() => navigation.navigate('Qrcode')}
    />
    return {
      headerRight: qrscanner
    }
  }

  render() {
    if(this.props.navigation.state.params) {
      const meal = this.props.navigation.state.params.meal;
      
      const renderMeal = meal.map(meal=>(
        <Text key={meal.name}>{`${meal.name} ${meal.price} ${meal.count}`}</Text>
      ))

      return (
        <View style={{flex: 1}}>
          {renderMeal}
        </View>
      )
    } else {
      return (
        <View style={{flex: 1}}></View>
      )
    }
  }
}

export default OrderScreen;
