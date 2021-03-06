import React from 'react';
import { View, Platform, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, AsyncStorage } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as firebase from 'firebase';

import api from '../api';
import deviceStorage from '../services/deviceStorage';

const { width } = Dimensions.get('window');

class SettingsScreen extends React.Component {
  state = {
    email: null,
    username: null,
    phone: null,
    id: null,
    cardId: null,
    balance: ''
  };

  // Add Listener To Refresh
  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('didFocus', () => this.componentWillMount()),
    ]; 
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  async componentWillMount() {
    const userId = await AsyncStorage.getItem('_id');
    // const { currentUser } = firebase.auth();
    // let dbUserid = firebase.database().ref(`/users/${currentUser.uid}`);
    try {
      // let snapshot = await dbUserid.once('value');
      // let username = snapshot.val().username;
      // let email = snapshot.val().email;
      // let phone = snapshot.val().phone;
      // let id = snapshot.val().id;
      // let cardId = snapshot.val().cardId;
      // let balance = snapshot.val().balance;
      // this.setState({ username, email, phone, id, cardId, balance });
      await api.get(`user/${userId}`)
      .then((response) => {
        console.log(response.data.user);
        // 缺學號
        const { balance, easycard_number, username, email, studentId } = response.data.user;
        this.setState({ balance, username, cardId: easycard_number, email, id: studentId });
      })
      .catch((error) => {
        console.log(error);
      });

    } catch (err) { console.log(err) }
  }

  render() {
    const { username, email, phone, id, cardId, balance } = this.state;
    const school = (
      <View style={{justifyContent: 'center', marginRight: 8, width: 30, alignItems: 'center'}}>
        <Ionicons
          name={Platform.OS === "ios" ? "ios-school" : "md-school"}
          color="black"
          size={25}
        />
      </View>);
    const person = (
      <View style={{justifyContent: 'center', marginRight: 8, width: 30, alignItems: 'center'}}>
        <Ionicons
          name={Platform.OS === "ios" ? "ios-person" : "md-person"}
          color="black"
          size={25}
        />
      </View>);
    const card = (
      <View style={{justifyContent: 'center', marginRight: 8, width: 30, alignItems: 'center'}}>
        <Ionicons
          name={Platform.OS === "ios" ? "ios-card" : "md-card"}
          color="black"
          size={25}
        />
      </View>);
    const helpCircle = (
      <View style={{justifyContent: 'center', marginRight: 8, width: 30, alignItems: 'center'}}>
        <Ionicons
          name={Platform.OS === "ios" ? "ios-help-circle-outline" : "md-help-circle-outline"}
          color="black"
          size={25}
        />
      </View>);
    const logOut = (
    <View style={{justifyContent: 'center', marginRight: 8, width: 30, alignItems: 'center'}}>
      <Ionicons
        name={Platform.OS === "ios" ? "ios-log-out" : "md-log-out"}
        color="black"
        size={25}
      />
    </View>);

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.section}>
            <View style={styles.info}>
              <View style={{flex: 2}}>
                <View style={{backgroundColor: 'rgb(141,216,227)', width:76, height: 76, borderRadius: 38, justifyContent: 'center', alignItems: 'center'}}>
                  <Image source={require('../assets/images/avatar.png')} style={{width: 70, height: 70}}/>
                </View>
              </View>
              <View style={{flex: 5, justifyContent: 'space-around', height: '100%', paddingVertical: 30, paddingLeft: 20 }}>
                <Text style={styles.text}>{username}</Text>
                <Text style={styles.text}>{`餘額：$ ${balance}`}</Text>
              </View>
              <View style={{flex: 1}}>
                <TouchableOpacity onPress={()=>alert('還不能修改喔！')}>
                  <Text style={[styles.text, {textAlign: 'right'}]}>修改</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.payList}>
              <TouchableOpacity style={{flex: 1}}>
                <View style={styles.payListItem}>
                  <Image source={require('../assets/images/card.png')} style={{width: 60, height: 60}}/>
                  <Text style={styles.text}>集點卡</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{flex: 1}} onPress={()=>this.props.navigation.navigate('Pay')}>
                <View style={styles.payListItem}>
                  <Image source={require('../assets/images/qr-code.png')} style={{width: 50, height: 50, marginTop: 5}}/>
                  <Text style={styles.text}>黑白Pay</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={{flex: 1}}>
                <View style={styles.payListItem}>
                  <Image source={require('../assets/images/give-card.png')} style={{width: 60, height: 60}}/>
                  <Text style={styles.text}>送餐券</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        
          <View style={styles.section}>
            <View style={styles.listItem}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                {school}
                <Text style={styles.text}>學校</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.textContent}>國立台北教育大學</Text>
              </View>
            </View>
            <View style={styles.listItem}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                {person}
                <Text style={styles.text}>學號</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.textContent}>{id}</Text>
              </View>
            </View>
            <View style={styles.listItem}>
              <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                {card}
                <Text style={styles.text}>悠遊卡卡號</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.textContent}>{cardId}</Text>
              </View>
            </View>
          </View>
          <View style={styles.section}>
            <TouchableOpacity>
              <View style={styles.listItem}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                  {helpCircle}
                  <Text style={styles.text}>幫助</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.section}>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('Auth');
              deviceStorage.deleteToken();
            }}>
              <View style={styles.listItem}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                  {logOut}
                  <Text style={styles.text}>登出</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(249,249,249)'
  },
  section: {
    backgroundColor: 'white',
    marginBottom: 10
  },
  info: {
    height: 120,
    paddingLeft: 32,
    paddingRight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'lightgrey'
  },
  listItem: {
    height: 60,
    paddingLeft: 32,
    paddingRight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  payList: {
    height: width/3,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'lightgrey'
  },
  payListItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderRightWidth: 1,
    borderColor: 'lightgrey'
  },
  text: {
    fontSize: 16,
    fontWeight: '300'
  },
  textContent: {
    fontSize: 16,
    textAlign: 'right',
    fontWeight: '300'
  }
})

export default SettingsScreen;
