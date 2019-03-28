import React from 'react';
import { Platform, Button } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ConfirmScreen from '../screens/ConfirmScreen';
import OrderScreen from '../screens/OrderScreen';
import QrcodeScreen from '../screens/QrcodeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ScannerScreen from '../screens/ScannerScreen';

// Home Page
const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
  Confirm: ConfirmScreen
});

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarLabel: 'Home',
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-restaurant' : 'md-restaurant'}
        size={24}
        color={tintColor}
      />
    ),
    tabBarOptions: {
      activeTintColor: '#007AFF',
      inactiveTintColor: 'gray',
    },
    tabBarVisible,
    tabBarOnPress: ({ navigation, defaultHandler }) => {
      if(navigation.state.index > 0) {
        navigation.navigate('Home')
      }
      defaultHandler();
    }
  }
};

// Order Page
const OrderStack = createStackNavigator({
    Order: OrderScreen,
    Qrcode: QrcodeScreen
  },
  {
    navigationOptions : ({ navigation }) => {
      const { routeName } = navigation.state;
      let titleName;
      if (routeName === 'Order') {
        titleName = `Order`;
      } else if (routeName === 'Qrcode') {
        titleName = `Qrcode`;
      }     
  
      return {
        title: titleName
      }
    }
  }
);

OrderStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarLabel: 'Order',
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-clipboard' : 'md-clipboard'}
        size={24}
        color={tintColor}
      />
    ),
    tabBarOptions: {
      activeTintColor: '#007AFF',
      inactiveTintColor: 'gray',
    },
    tabBarVisible
  }
};

// Settings Tab
const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
    Scanner: ScannerScreen
  },
  {
    navigationOptions : ({ navigation }) => {
      const { routeName } = navigation.state;
      let titleName;
      if (routeName === 'Settings') {
        titleName = `Settings`;
      } else if (routeName === 'Scanner') {
        titleName = `Scanner`;
      }     

      return {
        title: titleName
      }
    }
  }
);

SettingsStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ focused, tintColor }) => (
      <Ionicons
        focused={focused}
        name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
        size={24}
        color={tintColor}
      />
    ),
    tabBarOptions: {
      activeTintColor: '#007AFF',
      inactiveTintColor: 'gray',
    },
    tabBarVisible
  }
};

export default createBottomTabNavigator({
  HomeStack,
  OrderStack,
  SettingsStack,
});
