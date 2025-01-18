import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../../src/templates/button/Button';

describe('Button component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <Button onPress={() => {}}>Test Button</Button>
    );
    
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('handles press events', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button onPress={onPress}>Test Button</Button>
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(onPress).toHaveBeenCalled();
  });

  it('shows loading state', () => {
    const { getByTestId } = render(
      <Button loading onPress={() => {}}>Test Button</Button>
    );
    
    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  it('disables press events when disabled', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <Button disabled onPress={onPress}>Test Button</Button>
    );
    
    fireEvent.press(getByText('Test Button'));
    expect(onPress).not.toHaveBeenCalled();
  });
});