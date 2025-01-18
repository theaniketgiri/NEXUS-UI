import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    primary: {
        backgroundColor: '#007AFF',
    },
    secondary: {
        backgroundColor: '#E9ECEF',
    },
    outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#007AFF',
    },
    small: {
        paddingVertical: 8,
        paddingHorizontal: 12,
    },
    medium: {
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    large: {
        paddingVertical: 16,
        paddingHorizontal: 24,
    },
    disabled: {
        opacity: 0.5,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
    primaryText: {
        color: '#FFFFFF',
    },
    secondaryText: {
        color: '#000000',
    },
    outlineText: {
        color: '#007AFF',
    },
    disabledText: {
        color: '#A0A0A0',
    },
});
