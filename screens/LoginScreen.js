import React, { Component } from 'react';
import { View, Platform, Text, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';
import Ionicons from 'react-native-vector-icons/Ionicons';

import InputBox from '../components/InputBox';

class LoginScreen extends Component {
  // Super Sign In
  static navigationOptions = ({navigation}) => {
    const qrscanner = <Ionicons
      name={Platform.OS === "ios" ? "ios-qr-scanner" : "md-qr-scanner"}
      color="#007AFF"
      size={25}
      style={{padding: 10 }}
      onPress={() => navigation.navigate('Main')}
    />
    return {
      headerRight: qrscanner
    }
  }

  state = {
    email: null,
    password: null,
    error: ' ',
    loading: false,
  };

  onSignIn = async () => {
    const { email, password } = this.state;
    this.setState({ error: ' ', loading: true });
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      this.setState({email: '', password: '', loading: false});
      this.props.navigation.navigate('Main');
    } catch (err) {
      // this.onCreateUser();
      return null;
    }
  }

  onCreateUser = async () => {
    const { email, password } = this.state;
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
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
      <View style={{flexDirection: 'row'}}>
        <Button
          title='登入'
          type="clear"
          style={{width: 100}}
          onPress={this.onSignIn}
        />
        <Button
          title='註冊'
          type="clear"
          style={{width: 100}}
          onPress={()=>this.props.navigation.navigate('Signup')}
        />
        <Button
          type='clear'
          style={{width: 100}}
          title="超級登入"
          onPress={() => this.props.navigation.navigate('Main')}
        />
      </View>
    );
  }

  render() {
    return (
      <View>
        <View style={styles.formStyle}>
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
          {this.renderButton()}
        </View>
      </View>
    );
  }
}

const styles = {
  formStyle: {
    marginTop: 150
  }
};

export default LoginScreen;
