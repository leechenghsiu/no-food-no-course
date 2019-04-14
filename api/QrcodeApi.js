import React from 'react';
import { Image } from 'react-native';
import * as firebase from 'firebase';

class QrcodeApi extends React.Component {
  state = {
    username: '',
    balance: '',
    uid: ''
  };

  async componentDidMount() {
    const { currentUser } = firebase.auth();
    let dbUserid = firebase.database().ref(`/users/${currentUser.uid}`);
    try {
      let snapshot = await dbUserid.once('value');
      let username = snapshot.val().username;
      let balance = snapshot.val().balance;
      this.setState({ username, balance, uid: currentUser.uid });
    } catch (err) { }
  }
  render() {
    if(this.props.orderId){
      const data = `{"name": "${this.state.username}", "uid": "${this.state.uid}", "orderId": "${this.props.orderId}"}`;
      const enc = encodeURI(data);
      const api = `http://api.qrserver.com/v1/create-qr-code/?data=${enc}&size=300x300&bgcolor=FFFFFF`;

      return <Image source={{uri: api}} style={{backgroundColor: 'transparent'}} width={170} height={170} />;

    } else {
      const data = `{"name": "${this.state.username}", "balance": ${this.state.balance}, "uid": "${this.state.uid}"}`;
      const enc = encodeURI(data);
      const api = `http://api.qrserver.com/v1/create-qr-code/?data=${enc}&size=300x300&bgcolor=FFFFFF`;

      return <Image source={{uri: api}} style={{backgroundColor: 'transparent'}} width={170} height={170} />;

    }
  }
}

export default QrcodeApi;