import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon, ScreenOrientation } from 'expo';
import * as firebase from 'firebase';
import AppNavigator from './navigation/AppNavigator';

// //mongodb
// const MongoClient = require('mongodb').MongoClient;

// // replace the uri string with your connection string.
// const uri = "mongodb+srv://test:1234@cluster0-kmy2i.mongodb.net/test?retryWrites=true"
// MongoClient.connect(uri, function(err, client) {
//   if(err) {
//         console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
//   }
//   console.log('Connected...');
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false
    }
  }

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyB6m0ceoBXtvxTE9CICS7dkc9lK123u6n4",
      authDomain: "no-food-no-course.firebaseapp.com",
      databaseURL: "https://no-food-no-course.firebaseio.com",
      projectId: "no-food-no-course",
      storageBucket: "no-food-no-course.appspot.com",
      messagingSenderId: "1019235064309"
    });
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
        require('./assets/images/logo-full.png')
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

//mongodb
const MongoClient = require('mongodb').MongoClient;

// replace the uri string with your connection string.
const uri = "mongodb+srv://test:1234@cluster0-kmy2i.mongodb.net/test?retryWrites=true"
MongoClient.connect(uri, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
});