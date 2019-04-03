import React from 'react';
import { View, Platform } from 'react-native';
import { Input } from 'react-native-elements';

const InputBox = ({ label,
   value,
   onChangeText,
   placeholder,
   secureTextEntry,
   autoCorrect,
   autoCapitalize,
   keyboardType,
   errorMessage}) => {

   const { inputStyle, inputContainerStyle, containerStyle } = styles;

   if (Platform.OS === 'ios') {
      return (
         <Input
            label={label}
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            autoCorrect={false}
            inputStyle={inputStyle}
            inputContainerStyle={inputContainerStyle}
            value={value}
            onChangeText={onChangeText}
            errorMessage={errorMessage}
         />
      );
   }

   return (
      <View style={containerStyle}>
         <Input
            autoCapitalize={autoCapitalize}
            autoCorrect={autoCorrect}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            placeholder={placeholder}
            autoCorrect={false}
            inputStyle={inputStyle}
            inputContainerStyle={inputContainerStyle}
            value={value}
            onChangeText={onChangeText}
            errorMessage={errorMessage}
         />
      </View>
   );
};

const styles = {
   inputStyle: {
      color: 'teal',
      fontSize: 18,
      lineHeight: 23,
   },
   inputContainerStyle: {
      paddingVertical: 20,
      paddingHorizontal: 10,
      height: 40,
      flex: 1,
      borderWidth: 1,
      borderRadius: 5
   },
   containerStyle: {
      borderWidth: 1,
      borderRadius: 5,
      padding: 5,
      justifyContent: 'flex-start',
      flexDirection: 'row',
      borderColor: '#ddd'
   }
};

export default InputBox;
