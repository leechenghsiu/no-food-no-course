import React from 'react';
import { ScrollView, Platform } from 'react-native';
import { Tile, ListItem } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';

import me from '../json/me.json';

class SettingsScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const qrscanner = <Ionicons
      name={Platform.OS === "ios" ? "ios-qr-scanner" : "md-qr-scanner"}
      color="#007AFF"
      size={25}
      style={{padding: 10 }}
      onPress={() => navigation.navigate('Scanner')}
    />
    return {
      headerRight: qrscanner
    }
  };

  state = { me: [] };

  componentWillMount() {
    this.setState({ me });
  }

  render() {
    return (
      <ScrollView>
        <Tile
          featured
          title={`${this.state.me.name.first}`}
          caption={`$${this.state.me.balance}`}
        />
          <ListItem
          title="ID"
          rightTitle={this.state.me.id}
          hideChevron
          />
      </ScrollView>
    );
  }
}

export default SettingsScreen;
