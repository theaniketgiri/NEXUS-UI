import React from 'react';
import { View, Text } from 'react-native';
import type { CardProps } from './Card.types';
import { styles } from './Card.styles';

export const Card: React.FC<CardProps> = ({
  header,
  footer,
  children,
  variant = 'default',
  style,
  headerStyle,
  footerStyle,
  ...props
}) => {
  return (
    <View style={[styles.card, styles[variant], style]} {...props}>
      {header && (
        <View style={[styles.header, headerStyle]}>
          {typeof header === 'string' ? (
            <Text style={styles.headerText}>{header}</Text>
          ) : (
            header
          )}
        </View>
      )}
      <View style={styles.content}>{children}</View>
      {footer && (
        <View style={[styles.footer, footerStyle]}>
          {typeof footer === 'string' ? (
            <Text style={styles.footerText}>{footer}</Text>
          ) : (
            footer
          )}
        </View>
      )}
    </View>
  );
};