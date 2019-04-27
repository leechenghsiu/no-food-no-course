import React, { Component } from 'react';
import { View, Platform, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';
import { SafeAreaView } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import api from '../api';
import axios from 'axios';

import InputBox from '../components/InputBox';
import deviceStorage from '../services/deviceStorage';

class SignupScreen extends React.Component {
  state = {
    email: null,
    password: null,
    phone: null,
    username: null,
    id: null,
    cardId: null,
    balance: 1000,
    error: ' ',
    loading: false
  };

  onCreateUser = async () => {
    this.setState({ error: ' ', loading: true });
    const { email, password, phone, username, id, cardId, balance } = this.state;
    try {
      // await firebase.auth().createUserWithEmailAndPassword(email, password);
      await this.setState({ username, email, id, phone, cardId, balance, password });
      
      // const { currentUser } = firebase.auth();
      // let dbUserid = firebase.database().ref(`/users/${currentUser.uid}`);
      // this.setState({ username, email, id, phone, cardId, balance },()=>firebase.auth().signInWithEmailAndPassword(email, password));
      if(username!==null&&id!==null&&phone!==null&&cardId!==null) {
        // await dbUserid.set({ email, phone, username, id, cardId, balance });

        // 註冊(Axios 不能傳 form data !!!)
        await api.post('user/signup', {
          email, password, phone, easycard_number: cardId, username, studentId: id
        })
        .then((response) => {
          console.log('Signup Success');
        })
        .catch((error) => {
          console.log(error);
        });
        // 登入
        await api.post('user/login', {
          email, password
        })
        .then((response) => {
          console.log('Login Success');
          deviceStorage.saveToken("id_token", response.data.token);
          deviceStorage.saveToken("_id", response.data.user._id);

          this.setState({email: '', password: '', loading: false});
          this.props.navigation.navigate('Main');
        })
        .catch((error) => {
          console.log(error);
        });

      } else throw err

    } catch (err) {
      this.setState({
        email: '',
        password: '',
        error: 'Error!',
        loading: false
      });
    }
  }

  renderButton() {
    if (this.state.loading) {
      return <ActivityIndicator size='large' style={{ marginTop: 30 }} />;
    }

    return (
      <View style={styles.formStyle}>
        <Button
          title='立即註冊'
          raised={true}
          titleStyle={styles.signupButtonTitle}
          buttonStyle={styles.signupButton}
          containerStyle={styles.signupButtonBox}
          onPress={this.onCreateUser}
        />
        <Button
          title="取消"
          raised={true}
          titleStyle={styles.cancelButtonTitle}
          buttonStyle={styles.cancelButton}
          containerStyle={styles.cancelButtonBox}
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'rgb(141,216,227)'}} forceInset={{ top: 'always' }}>
        <View style={styles.container}>
          <KeyboardAwareScrollView style={{paddingHorizontal: 40}}>
            <Text style={styles.title}>註冊</Text>
            <InputBox
              label='學校信箱'
              errorMessage={this.state.error}
              placeholder='s110419040@stu.ntue.edu.tw'
              autoCorrect={false}
              autoCapitalize='none'
              keyboardType='email-address'
              value={this.state.email}
              onChangeText={email => this.setState({ email })}
              leftIcon="mail"
            />
            <InputBox
              label='密碼'
              errorMessage={this.state.error}
              secureTextEntry
              autoCorrect={false}
              autoCapitalize='none'
              placeholder='password'
              value={this.state.password}
              onChangeText={password => this.setState({ password })}
              leftIcon="lock"
            />
            <InputBox
              label='使用者名稱'
              errorMessage={this.state.error}
              autoCorrect={false}
              placeholder='曾阿醜'
              value={this.state.username}
              onChangeText={username => this.setState({ username })}
              leftIcon="person"
            />
            <InputBox
              label='手機'
              errorMessage={this.state.error}
              autoCorrect={false}
              placeholder='0952114289'
              value={this.state.phone}
              onChangeText={phone => this.setState({ phone })}
              leftIcon="phone-portrait"
            />
            <InputBox
              label='學號'
              errorMessage={this.state.error}
              autoCorrect={false}
              placeholder='110419004'
              value={this.state.id}
              onChangeText={id => this.setState({ id })}
              leftIcon="school"
            />
            <InputBox
              label='悠遊卡號碼'
              errorMessage={this.state.error}
              autoCorrect={false}
              placeholder='1234567890'
              value={this.state.cardId}
              onChangeText={cardId => this.setState({ cardId })}
              leftIcon="card"
            />
          {this.renderButton()}
          </KeyboardAwareScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(141,216,227)',
  },
  title: {
    fontSize: 48,
    color: 'white',
    fontWeight: '500',
    paddingVertical: 30,
    paddingHorizontal: 10
  },
  signupButtonTitle: {
    color: 'rgb(141,216,227)',
    fontWeight: '400'
  },
  signupButton: {
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 5
  },
  signupButtonBox: {
    marginHorizontal: 10,
    marginVertical: 10,
    paddingVertical: 3
  },
  cancelButtonTitle: {
    color: '#f9f9f9',
    fontWeight: '400'
  },
  cancelButton: {
    backgroundColor: '#b0e3ea',
    borderRadius: 5,
    paddingVertical: 10
  },
  cancelButtonBox: {
    marginHorizontal: 10,
    marginVertical: 10,
    //
  },
})

export default SignupScreen;
