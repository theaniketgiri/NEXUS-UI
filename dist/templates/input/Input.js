import React from 'react';
import { View, TextInput, Text, ActivityIndicator } from 'react-native';
import { styles } from './Input.styles';
export const Input = ({ label, error, loading, style, inputStyle, labelStyle, errorStyle, ...props }) => {
    return (<View style={[styles.container, style]}>
      {label && (<Text style={[styles.label, labelStyle]}>
          {label}
        </Text>)}
      <View style={styles.inputWrapper}>
        <TextInput style={[
            styles.input,
            error && styles.inputError,
            loading && styles.inputLoading,
            inputStyle,
        ]} placeholderTextColor="#999" {...props}/>
        {loading && (<ActivityIndicator style={styles.loader} color="#007AFF" size="small"/>)}
      </View>
      {error && (<Text style={[styles.error, errorStyle]}>
          {error}
        </Text>)}
    </View>);
};
