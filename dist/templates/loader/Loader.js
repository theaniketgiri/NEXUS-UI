import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { styles } from './Loader.styles';
export const Loader = ({ size = 'medium', color = '#007AFF', overlay, style, ...props }) => {
    if (overlay) {
        return (<View style={[styles.overlay, style]}>
        <ActivityIndicator size={size === 'small' ? 'small' : 'large'} color={color} {...props}/>
      </View>);
    }
    return (<View style={[styles.container, style]}>
      <ActivityIndicator size={size === 'small' ? 'small' : 'large'} color={color} {...props}/>
    </View>);
};
