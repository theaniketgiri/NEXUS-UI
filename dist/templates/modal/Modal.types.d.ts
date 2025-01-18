import type { ModalProps as RNModalProps, StyleProp, ViewStyle, TextStyle } from 'react-native';
export interface ModalProps extends Omit<RNModalProps, 'visible' | 'style'> {
    isVisible: boolean;
    onClose: () => void;
    title?: string;
    style?: StyleProp<ViewStyle>;
    overlayStyle?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;
    titleStyle?: StyleProp<TextStyle>;
}
