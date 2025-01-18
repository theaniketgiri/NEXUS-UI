import chalk from 'chalk';
import { validateComponent } from '../utils/validation.js';
import { scaffoldComponent } from '../utils/scaffold.js';
import { checkLicense } from '../utils/license.js';
import type { AddOptions } from '../types.js';

export async function add(componentName: string, options: AddOptions): Promise<void> {
  console.log(chalk.blue(`Adding ${componentName} component...`));

  // Validate component name
  validateComponent(componentName);

  // Check license for premium features
  if (options.premium) {
    const isValid = await checkLicense();
    if (!isValid) {
      throw new Error('Premium features require a valid license key. Visit https://nexus-ui.dev/premium to learn more.');
    }
  }

  // Scaffold the component
  await scaffoldComponent(componentName, options);

  console.log(chalk.green(`✔ Successfully added ${componentName} component`));
}