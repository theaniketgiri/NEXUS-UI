import type { ComponentConfig } from '../types';

export const components: Record<string, ComponentConfig> = {
  button: {
    name: 'Button',
    template: 'button',
    dependencies: ['react-native'],
    premium: false,
  },
  card: {
    name: 'Card',
    template: 'card',
    dependencies: ['react-native'],
    premium: false,
  },
  input: {
    name: 'Input',
    template: 'input',
    dependencies: ['react-native'],
    premium: false,
  },
  modal: {
    name: 'Modal',
    template: 'modal',
    dependencies: ['react-native'],
    premium: true,
  },
  loader: {
    name: 'Loader',
    template: 'loader',
    dependencies: ['react-native'],
    premium: false,
  },
};