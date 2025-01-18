import React from 'react';
import { View } from 'react-native';
import { Button } from './Button';

export default function ButtonExample() {
  return (
    <View style={{ padding: 20, gap: 10 }}>
      <Button onPress={() => console.log('Pressed primary')}>
        Primary Button
      </Button>
      
      <Button 
        variant="secondary" 
        onPress={() => console.log('Pressed secondary')}
      >
        Secondary Button
      </Button>
      
      <Button 
        variant="outline" 
        onPress={() => console.log('Pressed outline')}
      >
        Outline Button
      </Button>
      
      <Button loading>
        Loading Button
      </Button>
      
      <Button disabled>
        Disabled Button
      </Button>
    </View>
  );
}