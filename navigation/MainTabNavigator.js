import React from 'react';
import { Platform, Button } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import ConfirmScreen from '../screens/ConfirmScreen';
import OrderingScreen from '../screens/OrderingScreen';
import OrderedScreen from '../screens/OrderedScreen';
import QrcodeScreen from '../screens/QrcodeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PayScreen from '../screens/PayScreen';

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
    tabBarLabel: '店家',
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

const OrderScreenStack = createMaterialTopTabNavigator({
    Ordering: OrderingScreen,
    Ordered: OrderedScreen
  },
  {
    navigationOptions : ({ navigation }) => {
      const { routeName } = navigation.state;
      let titleName;
      if (routeName === 'Ordering') {
        titleName = `預訂中`;
      } else if (routeName === 'Ordered') {
        titleName = `訂單記錄`;
      }     

      return {
        title: titleName,
        tabBarOptions: {
          labelStyle: {
            fontSize: 14
          },
          activeTintColor:'black',
          inactiveTintColor:'grey',
          style:{
            backgroundColor:'white',
            borderTopWidth:1,
            borderTopColor:'#fafafa',
            shadowOffset: { width: 0, height: 2 },
            shadowColor: 'rgba(0, 0, 0, .2)',
            shadowOpacity: 0.5,

          },
          indicatorStyle: {
            backgroundColor: 'black'
          },
        }
      }
    }
  }
);

const OrderStack = createStackNavigator({
    OrderScreenStack: OrderScreenStack,
    Qrcode: QrcodeScreen
  },
  {
    navigationOptions : ({ navigation }) => {
      const { routeName } = navigation.state;
      let titleName, headerRight;
      if (routeName === 'OrderScreenStack') {
        titleName = `訂單`;
      } else if (routeName === 'Qrcode') {
        titleName = `QR Code`;
      }     
  
      return {
        title: titleName,
        headerRight: headerRight
      }
    },
    mode: 'modal',
    cardStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      opacity: 1
    },
    transitionConfig: () => ({
      containerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0)'
      }
    })
  }
);

OrderStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarLabel: '訂單',
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
const SettingsScreenStack = createStackNavigator({
  Settings: SettingsScreen
},
{
  navigationOptions : ({ navigation }) => {
    return {
      title: '個人資訊'
    }
  }
}
);

const SettingsStack = createStackNavigator({
  SettingsScreen: SettingsScreenStack,
  Pay: PayScreen
},
{
  mode: 'modal',
  headerMode: 'none',
  cardStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    opacity: 1
  },
  transitionConfig: () => ({
    containerStyle: {
      backgroundColor: 'rgba(0, 0, 0, 0)'
    }
  })
}
);

SettingsStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarLabel: '個人資訊',
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
