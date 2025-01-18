import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import type { ButtonProps } from './Button.types';
import { styles } from './Button.styles';

export const Button: React.FC<ButtonProps> = ({
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  children,
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[
        styles.button,
        styles[variant],
        styles[size],
        disabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#ffffff' : '#000000'} />
      ) : (
        <Text style={[
          styles.text,
          styles[`${variant}Text`],
          disabled && styles.disabledText,
        ]}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};