import React from 'react';
import { View, Platform, Text, StatusBar, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, TextInput, Image, DatePickerIOS, TimePickerAndroid, AsyncStorage } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as firebase from 'firebase';
import axios from 'axios';

import api from '../api';
import deviceStorage from '../services/deviceStorage';

class ConfirmScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const back = <Ionicons
      name={Platform.OS === "ios" ? "ios-arrow-back" : "md-arrow-back"}
      color="#000"
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
      saving: false,
      chosenTime: new Date(),
      hour: 12,
      minute: `00`,
      note: '',
      balance: '',
      finish: false,
      name: '',
      userId: ''
    }
    this.setTime = this.setTime.bind(this);
  }

  async componentWillMount() {
    const userId = await AsyncStorage.getItem('_id');
    try {
      // let snapshot = await dbUserid.once('value');
      // let balance = snapshot.val().balance;
      // let name = snapshot.val().username;
      await api.get(`user/${userId}`)
      .then((response) => {
        console.log(response.data.user);
        this.setState({ balance: response.data.user.balance, name: response.data.user.username, userId: response.data.user._id });
      })
      .catch((error) => {
        console.log(error);
      });

      
    } catch (err) { }
    this.setTime(this.state.chosenTime);
  }

  setTime(newTime) {
    const h = (newTime.getHours() < 10) ? `0${newTime.getHours()}` : newTime.getHours();
    const m = (newTime.getMinutes() < 10) ? `0${newTime.getMinutes()}` : newTime.getMinutes();
    this.setState({chosenTime: newTime, hour: h, minute: m});
  }

  setTimeAndroid = async () => {
    try {
      const {action, hour, minute} = await TimePickerAndroid.open({
        hour: 12,
        minute: 0,
        is24Hour: false
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        const h = (hour < 10) ? `0${hour}` : hour;
        const m = (minute < 10) ? `0${minute}` : minute;
        this.setState({hour: h, minute: m});
      }
    } catch ({code, message}) {
      console.warn('Cannot open time picker', message);
    }
  }

  handleSubmit = async () => {
    this.setState({ saving: true });

    // const { currentUser } = firebase.auth();
    const { meal, total, vendorId, vendorname } = this.props.navigation.state.params;
    const { hour, minute, note, balance, name, userId } = this.state;
    // const headers = {
    //   'Authorization': 'Bearer ' + this.props.jwt
    // };
    this.setState({ balance: balance-total });
    // let dbVendor = firebase.database().ref(`/vendors/${vendorId}/order`).push();
    // let dbUserid = firebase.database().ref(`/users/${currentUser.uid}/order/${dbVendor.key}`);
    // let dbBalance = firebase.database().ref(`/users/${currentUser.uid}`);
    // // 店家和 User 都要 push 訂單
    // await dbVendor.set({ meal: [...meal], time: `${hour}:${minute}`, note, total, vendor: this.props.navigation.state.params.name, finish, name });
    // await dbUserid.set({ meal: [...meal], time: `${hour}:${minute}`, note, total, vendor: this.props.navigation.state.params.name, finish, name });
    // // User 扣款
    // await dbBalance.update({ balance: this.state.balance });
    try {
      // 下訂單
      await api.post('orders', {
         list: [...meal],
         hour,
         minute,
         remark: note,
         total,
         vendor: { vendorId, vendorname },
         user: { userId, username: name }
      })
      .then((response) => {
        console.log(response);
        // this.setState({ meals: [...response.data] });
        // console.log(this.state.meals)
      })
      .catch((error) => {
        console.log('error');
      });

      // 改餘額
      await api.patch(`user/${userId}`, [
        {"propName": "balance", "value": this.state.balance}
       ])
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

      this.setState({ saving: false }, ()=>this.props.navigation.navigate('Ordering'));
    } catch (err) { console.log(err) }

    
  }

  renderButton() {
    if(this.state.saving) {
      return (
        <View style={styles.buttonBox}>
          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
            <ActivityIndicator size='small' />
          </TouchableOpacity>
        </View>
      )
    }
    return (
      <View style={styles.buttonBox}>
        <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
          <Text style={styles.buttonText}>確認點餐</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { meal, name, total, vendorId } = this.props.navigation.state.params;
    
    const renderMeal = meal.map(meal=>(
      <View style={{ flex: 1, flexDirection: 'row', marginVertical: 5 }} key={meal.product}>
        <View style={{ marginRight: 6, alignItems: 'flex-end', backgroundColor: 'rgb(141,216,227)', marginVertical: Platform.OS === "ios"?0:2, height: 16 , borderRadius: 2 }}>
          <Text style={[styles.mealCount, {lineHeight: Platform.OS === "ios"?16:17}]}>{meal.quantity}</Text>
        </View>
        <View style={{ flex: 5 }}>
          <Text style={styles.mealName}>{meal.product}</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.mealPrice}>{`NT$ ${meal.price}`}</Text>
        </View>
      </View>
    ))
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
                    {Platform.OS === "ios" 
                    ?<DatePickerIOS
                      style={{marginTop: -60}}
                      mode="time"
                      date={this.state.chosenTime}
                      onDateChange={this.setTime}
                    />
                    :<TouchableOpacity style={styles.timePickerAndroid} onPress={()=>this.setTimeAndroid()} >
                      <Text style={styles.timePickerAndroidText}>{`${this.state.hour} : ${this.state.minute}`}</Text>
                      <Text style={[styles.timePickerAndroidText, {fontSize: 24}]}>EDIT</Text>
                    </TouchableOpacity>
                    }
                  </View>
                </View>
                <View style={styles.box}>
                  <Text style={styles.boxTitle}>付款</Text>
                  <View style={styles.boxImage}>
                    <Image source={require('../assets/images/easy-card.png')} style={{width: 72, height: 42}}/>
                    <View style={{flexDirection: 'column', alignItems: 'flex-end'}}>
                      <Text>{`NT$ ${this.state.balance}`}</Text>
                      <Text>{`-NT$ ${total}`}</Text>
                    </View>
                  </View>
                  <View style={styles.boxTotal}>
                    <Text style={styles.boxTotalContent}>餘額</Text>
                    <Text style={styles.boxTotalContent}>{`NT$ ${this.state.balance-total}`}</Text>
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
          {this.renderButton()}
        </View>
      </SafeAreaView>
    )
    
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
    justifyContent: 'space-between',
    textAlign: 'right'
  },
  boxTotalContent: {
    fontSize: 16
  },
  timePicker: {
    height: 100,
    overflow: 'hidden'
  },
  timePickerAndroid: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: 50
  },
  timePickerAndroidText: {
    fontSize: 30,
    color: 'rgb(64,64,64)'
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
    justifyContent: 'center',
    width: '100%',
    height: '100%'
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    padding: 15,
    color: 'white'
  }
})

export default ConfirmScreen;
