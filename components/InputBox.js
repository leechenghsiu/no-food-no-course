import React from 'react';
import { TextInput, View, Text, Platform } from 'react-native';
import { Input } from 'react-native-elements';

const InputBox = ({ label,
   value,
   onChangeText,
   placeholder,
   secureTextEntry,
   autoCorrect,
   autoCapitalize,
   keyboardType}) => {

   const { inputStyle, containerStyle } = styles;

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
            value={value}
            onChangeText={onChangeText}
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
            style={inputStyle}
            value={value}
            onChangeText={onChangeText}
         />
      </View>
   );
};

const styles = {
   inputStyle: {
      color: '#000',
      paddingRight: 5,
      paddingLeft: 5,
      fontSize: 18,
      lineHeight: 23,
      height: 40,
      flex: 1,
   },
   containerStyle: {
      borderBottomWidth: 1,
      padding: 5,
      justifyContent: 'flex-start',
      flexDirection: 'row',
      borderColor: '#ddd',
   }
};

// export { Input };
export default InputBox;
