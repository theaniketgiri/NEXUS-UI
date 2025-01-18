import type { ViewProps, StyleProp, ViewStyle } from 'react-native';

export type CardVariant = 'default' | 'outlined' | 'elevated';

export interface CardProps extends Omit<ViewProps, 'style'> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: CardVariant;
  style?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  footerStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}