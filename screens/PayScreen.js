import React from 'react';
import { View, Text, Platform, TouchableOpacity, StyleSheet, Dimensions, Image, StatusBar, AsyncStorage } from 'react-native';
import * as firebase from 'firebase';
import { SafeAreaView } from 'react-navigation';
import { Brightness, Permissions } from 'expo';

import QrcodeApi from '../api/QrcodeApi';
import api from '../api';
import deviceStorage from '../services/deviceStorage';

const { width } = Dimensions.get('window');

class PayScreen extends React.Component {
  state = {
    username: '',
    balance: '',
    cardId: '',
    brightness: null
  };

  async componentWillMount() {
    await Permissions.askAsync(Permissions.SYSTEM_BRIGHTNESS);
    const { status } = await Permissions.getAsync(Permissions.SYSTEM_BRIGHTNESS);
    if (status === 'granted') {
      // await this.setState({ brightness: Brightness.getBrightnessAsync() });
      Brightness.setSystemBrightnessAsync(1);
    }
    
    const userId = await AsyncStorage.getItem('_id');
    // const { currentUser } = firebase.auth();
    // let dbUserid = firebase.database().ref(`/users/${currentUser.uid}`);
    try {
      // let snapshot = await dbUserid.once('value');
      // let username = snapshot.val().username;
      // let balance = snapshot.val().balance;
      // let cardId = snapshot.val().cardId;
      await api.get(`user/${userId}`)
      .then((response) => {
        console.log(response.data.user);
        // 缺學號
        const { balance, easycard_number, username } = response.data.user;
        this.setState({ balance, username, cardId: easycard_number });
      })
      .catch((error) => {
        console.log(error);
      });
      this.setState({ username, balance, cardId });
    } catch (err) { }
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>  
        <StatusBar backgroundColor="transparent" barStyle="light-content" />
        <View style={styles.container}>
          <View style={{alignItems: 'center', flex: 7, justifyContent: 'flex-end'}}>
            <View style={styles.card}>
              <View style={styles.qrcode}>
                <QrcodeApi />
              </View>
              <View style={styles.pay}>
                <Image source={require('../assets/images/icon.png')} style={{width: 40, height: 40}}/>
              </View>
            </View>
            <Text style={[styles.text, {fontSize: 34}]}>{`$ ${this.state.balance}`}</Text>
            <Text style={styles.text}>{`${this.state.cardId}（悠遊卡）`}</Text>
          </View>
          <TouchableOpacity
            style={styles.finish}
            onPress={()=>{
              Brightness.setSystemBrightnessAsync(0.5);
              this.props.navigation.navigate('Settings')
            }}
          >
            <Text style={[styles.text, {marginBottom: 0}]}>完成付款</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  card: {
    backgroundColor: 'white',
    margin: 30,
    borderRadius: 10,
    height: 220,
    width: width-60,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  qrcode: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pay: {
    flex: 1,
    backgroundColor: '#8dd8e3',
    paddingTop: 20,
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 30
  },
  finish: {
    flex: 1,
    borderRadius: 5,
    paddingVertical: 20,
    paddingHorizontal: 40,
    marginTop: 100,
    justifyContent: 'flex-end'
  }
})

export default PayScreen;
