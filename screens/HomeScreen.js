import React from 'react';
import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';

import api from '../api';
import deviceStorage from '../services/deviceStorage';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.42;

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: '店家'
  };

  state = { 
    loading: false,
    vendors: []
  };

  async componentWillMount() {
    this.setState({ loading: true });

    // let dbMenu = firebase.database().ref(`/vendors`);
    // const userId = await AsyncStorage.getItem('_id');

    try {
      // let snapshot = await dbMenu.once('value');
      // let vendors = Object.values(snapshot.val());
      // // 把店家 ID 加入
      // let vendorsWithId = vendors.map((item,index)=>Object.assign(item, {vendorId: Object.keys(snapshot.val())[index]}));

      await api.get('vendor')
      .then((response) => {
        console.log(response.data);
        // this.setState({ orders: [...response.data.order] });
        this.setState({ vendors: [...response.data.vendor] });
        console.log(this.state.vendors)
      })
      .catch((error) => {
        console.log(error);
      });

    } catch (err) { console.log(err) }

    this.setState({ loading: false });
  }

  goToPageTwo = (vendor) => {
    this.props.navigation.navigate('Details', { ...vendor });
  };

  render() {
    if (this.state.loading){
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(249,249,249)'}}>
          <ActivityIndicator size='large' />
        </View>
      )
    } else {
      return (
        <ScrollView style={{ backgroundColor: 'rgb(249,249,249)' }}>
          <View style={styles.container}>
            {this.state.vendors.map((vendor) => (
              <TouchableOpacity
                key={vendor._id}
                style={styles.card}
                onPress={() => this.goToPageTwo(vendor)}
              >
                <Image source={{ uri: vendor.image }} style={{width: '100%', height: 100}} />
                <Text style={styles.name}>{vendor.vendorname}</Text>
                <Text style={styles.description}>{vendor.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 24,
    paddingVertical: 17,
    justifyContent: 'space-between'
  },
  card: {
    width: cardWidth,
    height: 200,
    backgroundColor: 'white',
    marginVertical: 12,
    padding: '2%',
    borderRadius: 5,
    shadowOffset: { width: 2, height: 5 },
    shadowColor: 'rgba(0, 0, 0, .12)',
    shadowOpacity: 0.5,
    elevation: 1
  },
  name: {
    fontSize: 16,
    marginVertical: 10,
    marginHorizontal: 5
  },
  description: {
    fontSize: 14,
    marginHorizontal: 5,
    color: 'rgb(94,94,94)'
  }
})

export default HomeScreen;