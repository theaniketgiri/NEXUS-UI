import React from 'react';
import { Modal as RNModal, View, TouchableOpacity, Text } from 'react-native';
import { styles } from './Modal.styles';
export const Modal = ({ isVisible, onClose, title, children, style, overlayStyle, contentStyle, titleStyle, ...props }) => {
    return (<RNModal visible={isVisible} transparent animationType="fade" onRequestClose={onClose} {...props}>
      <TouchableOpacity style={[styles.overlay, overlayStyle]} activeOpacity={1} onPress={onClose}>
        <View style={[styles.container, style]} onStartShouldSetResponder={() => true} onTouchEnd={e => e.stopPropagation()}>
          <View style={[styles.content, contentStyle]}>
            {title && (<Text style={[styles.title, titleStyle]}>{title}</Text>)}
            {children}
          </View>
        </View>
      </TouchableOpacity>
    </RNModal>);
};
