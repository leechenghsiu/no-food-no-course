import React from 'react';
import { Image } from 'react-native';

const data = `{"name": "Matthew", "balance": 1000}`;
const enc = encodeURI(data);
const api = `http://api.qrserver.com/v1/create-qr-code/?data=${enc}&size=300x300&bgcolor=E9E9EF`;

const QrcodeApi = () => {
  return <Image source={{uri: api}} style={{backgroundColor: 'transparent'}} width={300} height={300} />;
}

export default QrcodeApi;