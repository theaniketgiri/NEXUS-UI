import type { ActivityIndicatorProps, StyleProp, ViewStyle } from 'react-native';

export type LoaderSize = 'small' | 'medium' | 'large';

export interface LoaderProps extends Omit<ActivityIndicatorProps, 'size' | 'style'> {
  size?: LoaderSize;
  overlay?: boolean;
  style?: StyleProp<ViewStyle>;
}