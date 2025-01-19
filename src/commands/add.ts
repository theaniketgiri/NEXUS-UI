import fs from 'fs/promises';
import { resolve } from 'path';
import semver from 'semver';
import chalk from 'chalk';
import { CLIError } from '../utils/error';

export function validateComponent(componentName: string): void {
  // Validate component name
  if (!componentName) {
    throw new CLIError(
      'Component name is required.',
      'INVALID_COMPONENT_NAME'
    );
  }

  if (!/^[A-Z][A-Za-z0-9]+$/.test(componentName)) {
    throw new CLIError(
      'Component name must start with a capital letter and contain only alphanumeric characters.',
      'INVALID_COMPONENT_NAME'
    );
  }

  // Check if component already exists
  const componentDir = resolve(process.cwd(), 'src/components', componentName);
  try {
    fs.access(componentDir);
    throw new CLIError(
      `Component ${componentName} already exists at ${componentDir}`,
      'COMPONENT_EXISTS'
    );
  } catch (error) {
    // If error is thrown, it means the directory doesn't exist, which is what we want
    if (error instanceof CLIError) throw error;
  }
}