import React, { Component } from 'react';
import { View, Platform, Text, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';

import InputBox from '../components/InputBox';

class SignupScreen extends React.Component {
  state = {
    email: null,
    password: null,
    phone: null,
    username: null,
    id: null,
    error: ' ',
    loading: false
  };

  onCatchUser = async () => {
    const { currentUser } = firebase.auth();
      const { email, phone, username, id } = this.state;
      let dbUserid = firebase.database().ref(`/users/${currentUser.uid}`);
      try {
        let snapshot = await dbUserid.once('value');
        let username = snapshot.val().username;
        let email = snapshot.val().email;
        let id = snapshot.val().id;
        let phone = snapshot.val().phone;
        this.setState({ username, email, id, phone });
      } catch (err) { }
    await dbUserid.set({ email, phone, username, id });
  }

  onCreateUser = async () => {
    const { email, password } = this.state;
    this.setState({ error: ' ', loading: true });
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      // firebase db start write
      this.onCatchUser();
      // firebase db end write
      this.setState({email: '', password: '', loading: false});
      this.props.navigation.navigate('Main');
    } catch (err) {
      this.setState({
        email: '',
        password: '',
        error: err.message,
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
          onPress={this.onCreateUser}
          type='clear'
          title="註冊"
        />
        <Button
          onPress={() => this.props.navigation.goBack()}
          type='clear'
          title="取消"
        />
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{marginTop: 50}}>
          <Text style={{fontSize: 30}}>註冊</Text>
          <InputBox
            label='Email'
            errorMessage={this.state.error}
            placeholder='user@email.com'
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='email-address'
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />
          <InputBox
            label='Password'
            errorMessage={this.state.error}
            secureTextEntry
            autoCorrect={false}
            autoCapitalize='none'
            placeholder='password'
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
          <InputBox
            label='Username'
            autoCorrect={false}
            placeholder='John Doe'
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
          />
          <InputBox
            label='Phone'
            autoCorrect={false}
            placeholder='555-555-5555'
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
          />
          <InputBox
            label='學號'
            autoCorrect={false}
            placeholder='110419004'
            value={this.state.id}
            onChangeText={id => this.setState({ id })}
          />
        </View>
        {this.renderButton()}
      </View>
    );
  }
}

const styles = {
  formStyle: {
    marginTop: 150,
    flexDirection: 'row'
  }
};

export default SignupScreen;
