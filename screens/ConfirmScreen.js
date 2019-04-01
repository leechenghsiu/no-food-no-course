import React from 'react';
import { View, Platform, Text, StatusBar, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, TextInput, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-navigation';
import TimePicker from '../components/TimePicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
  constructor(props) {
    super(props);
    this.state = {
      showIndicator: false,
      selectedHours: 12,
      selectedMinutes: 0,
      note: ''
    }
  }

  handleSubmit = () => {
    this.setState({ showIndicator: true });
    setTimeout(() => this.props.navigation.navigate('Order',{ meal: this.props.navigation.state.params.meal, hour: this.state.selectedHours, minute: this.state.selectedMinutes, note: this.state.note }), 1000)
  }

  render() {
    const meal = this.props.navigation.state.params.meal;
    const name = this.props.navigation.state.params.name;
    const total = this.props.navigation.state.params.total;
    const { selectedHours, selectedMinutes } = this.state;
    
    const renderMeal = meal.map(meal=>(
      <View style={{ flex: 1, flexDirection: 'row', marginVertical: 5 }} key={meal.name}>
        <View style={{ marginRight: 6, alignItems: 'flex-end', backgroundColor: 'rgb(141,216,227)', height: 16 , borderRadius: 2 }}>
          <Text style={styles.mealCount}>{meal.count}</Text>
        </View>
        <View style={{ flex: 5 }}>
          <Text style={styles.mealName}>{meal.name}</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.mealPrice}>{`NT$ ${meal.price}`}</Text>
        </View>
      </View>
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
        <SafeAreaView style={{flex: 1, backgroundColor: 'rgb(141,216,227)'}} forceInset={{ top: 'never' }}>  
          <View style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: 'white' }}>
              <StatusBar backgroundColor="transparent" barStyle="dark-content" />
              <KeyboardAwareScrollView>
                <View style={styles.container}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1}}></View>
                    <View style={{flex: 1, borderBottomWidth: 1}}>
                      <Text style={styles.title}>{name}</Text>
                    </View>
                    <View style={{flex: 1}}></View>
                  </View>
                  <View style={styles.box}>
                    <Text style={styles.boxTitle}>預定餐點</Text>
                    {renderMeal}
                    <View style={styles.boxTotal}>
                      <Text style={styles.boxTotalContent}>小計</Text>
                      <Text style={styles.boxTotalContent}>{`NT$ ${total}`}</Text>
                    </View>
                  </View>
                  <View style={styles.box}>
                    <Text style={styles.boxTitle}>取餐時間</Text>
                    <View style={styles.timePicker}>
                      <TimePicker
                        selectedHours={selectedHours}
                        selectedMinutes={selectedMinutes}
                        onChange={(hours, minutes) =>
                          this.setState({ selectedHours: hours, selectedMinutes: minutes })
                        }
                      />
                    </View>
                  </View>
                  <View style={styles.box}>
                    <Text style={styles.boxTitle}>付款</Text>
                    <View style={styles.boxImage}>
                      <Image source={require('../assets/images/easy-card.png')} style={{width: 72, height: 42}}/>
                      <View style={{flexDirection: 'column'}}>
                        <Text>NT$ 900</Text>
                        <Text>{`NT$ ${total}`}</Text>
                      </View>
                    </View>
                    <View style={styles.boxTotal}>
                      <Text style={styles.boxTotalContent}>餘額</Text>
                      <Text style={styles.boxTotalContent}>NT$ 0</Text>
                    </View>
                  </View>
                  <View style={[styles.box, {borderBottomWidth: 0, height: 200}]}>
                    <Text style={styles.boxTitle}>備註</Text>
                    <TextInput
                      style={styles.addNote}
                      autoCorrect={false}
                      onChangeText={note => this.setState({note})}
                    />
                  </View>
                </View>
              </KeyboardAwareScrollView>
            </ScrollView>      
            <View style={styles.buttonBox}>
              <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
                <Text style={styles.buttonText}>確認</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    paddingVertical: 15
  },
  box: {
    flex: 1,
    minHeight: 150,
    paddingTop: 20,
    paddingHorizontal: 40,
    borderBottomWidth: 1,
    borderColor: 'rgb(151,151,151)'
  },
  boxTitle: {
    fontSize: 20,
    marginBottom: 10
  },
  mealCount: {
    color: 'white',
    textAlign: 'center',
    width: 16
  },
  mealName: {
    color: 'rgb(64,64,64)',
    fontSize: 16
  },
  mealPrice: {
    textAlign: 'right',
    color: 'rgb(64,64,64)'
  },
  boxImage: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  boxTotal: {
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: 'rgb(151,151,151)',
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'space-between'
  },
  boxTotalContent: {
    fontSize: 16
  },
  timePicker: {
    height: 120,
    overflow: 'hidden'
  },
  addNote: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'rgb(64,64,64)',
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'rgb(64,64,64)',
    fontSize: 14,
    borderRadius: 5
  },
  buttonBox: {
    backgroundColor: 'rgb(141,216,227)',
    width: '100%',
    height: 50,
    position: 'absolute',
    bottom: 0
  },
  button: {
    flexDirection: 'row',
    width: '100%',
    height: '100%'
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    padding: 17,
    color: 'white'
  }
})

export default ConfirmScreen;
