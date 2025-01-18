#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import semver from 'semver';
import { add } from './commands/add.js';
import { checkNodeVersion, validateEnvironment, validateFileSystem } from './utils/validation.js';
import { handleError, CLIError } from './utils/error.js';
import { setupGracefulShutdown } from './utils/process.js';

// Get package.json path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packagePath = resolve(__dirname, '../package.json');

async function main() {
  try {
    // Setup process handlers
    setupGracefulShutdown();

    // Validate environment
    checkNodeVersion(process.version, '16.0.0');
    validateEnvironment();
    await validateFileSystem();

    // Read and validate package.json
    let packageJson;
    try {
      const packageData = await readFile(packagePath, 'utf8');
      packageJson = JSON.parse(packageData);
      
      if (!packageJson.version) {
        throw new CLIError('Invalid package.json: missing version field', 'INVALID_PACKAGE');
      }
    } catch (error) {
      if (error instanceof CLIError) throw error;
      throw new CLIError('Failed to read package.json', 'PACKAGE_READ_ERROR');
    }

    const program = new Command();

    program
      .name('nexus-ui')
      .description('CLI tool for scaffolding React Native components')
      .version(packageJson.version)
      .option('--debug', 'enable debug mode')
      .hook('preAction', (thisCommand) => {
        if (thisCommand.opts().debug) {
          process.env.DEBUG = 'true';
        }
      });

    program
      .command('add')
      .description('Add a component to your project')
      .argument('<component>', 'component name to add')
      .option('--premium', 'use premium features (requires license key)')
      .option('--force', 'force operation even if component exists')
      .action(async (component, options) => {
        try {
          await add(component, options);
        } catch (error) {
          handleError(error);
        }
      });

    await program.parseAsync();
  } catch (error) {
    handleError(error);
  }
}

main().catch(handleError);