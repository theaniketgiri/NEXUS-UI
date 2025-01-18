import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';
import type { AddOptions } from '../types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export async function scaffoldComponent(name: string, options: AddOptions): Promise<void> {
  const componentDir = path.join(process.cwd(), 'src', 'components', name);
  const templateDir = path.join(__dirname, '..', 'templates', name.toLowerCase());

  try {
    // Ensure component directory exists
    await fs.ensureDir(componentDir);

    // Copy template files
    await fs.copy(templateDir, componentDir, {
      overwrite: false,
      errorOnExist: true,
    });

    // Create examples directory if it doesn't exist
    const examplesDir = path.join(process.cwd(), 'examples');
    await fs.ensureDir(examplesDir);

    // Copy example file
    const exampleSource = path.join(templateDir, 'example.tsx');
    const exampleDest = path.join(examplesDir, `${name}Example.tsx`);
    await fs.copy(exampleSource, exampleDest, {
      overwrite: false,
      errorOnExist: true,
    });

    console.log(chalk.green(`\n✔ Component files created in src/components/${name}`));
    console.log(chalk.green(`✔ Example created in examples/${name}Example.tsx`));
    
    // Log usage instructions
    console.log(chalk.blue('\nUsage:'));
    console.log(`import { ${name} } from './src/components/${name}';\n`);
    
  } catch (error) {
    if (error.code === 'EEXIST') {
      throw new Error(`Component ${name} already exists in your project.`);
    }
    throw error;
  }
}