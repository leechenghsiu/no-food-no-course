import React from 'react';
import { View, Platform, Text, StatusBar, StyleSheet, Button, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class ConfirmScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const back = <Ionicons
      name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"}
      color="#007AFF"
      size={30}
      style={{padding: 10 }}
      onPress={() => navigation.goBack()}
    />

    return {
      title: "預訂",
      headerLeft: back
    }
  }

  state = {
    showIndicator: false
  }

  handleSubmit = () => {
    this.setState({ showIndicator: true });
    setTimeout(() => this.props.navigation.navigate('Order',{ meal: this.props.navigation.state.params.meal }), 1000)
  }

  render() {
    const meal = this.props.navigation.state.params.meal;
    
    const renderMeal = meal.map(meal=>(
      <Text key={meal.name}>{`${meal.name} ${meal.price} ${meal.count}`}</Text>
    ))
    if(this.state.showIndicator){
      return (
        <View style={{flex: 1}}>
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
          <ActivityIndicator size="large" color="gray" style={{flex: 1}} />
        </View>
      ) 
    } else {
      return (
        <View style={{flex: 1}}>
          <StatusBar backgroundColor="transparent" barStyle="dark-content" />
          {renderMeal}
          <Button
            title="確認送出"
            style={styles.button}
            onPress={this.handleSubmit}
          />
        </View>
      )
    }
    
  }
}

const styles = StyleSheet.create({
  button: {
    width: '100%'
  }
})

export default ConfirmScreen;
