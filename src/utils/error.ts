import chalk from 'chalk';

export class CLIError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'CLIError';
  }
}

export function handleError(error: unknown): never {
  if (error instanceof CLIError) {
    console.error(chalk.red(`Error: ${error.message}`));
    if (error.code) {
      console.error(chalk.yellow(`Error Code: ${error.code}`));
    }
  } else if (error instanceof Error) {
    console.error(chalk.red('An unexpected error occurred:'));
    console.error(chalk.red(error.message));
    if (error.stack) {
      console.error(chalk.gray(error.stack.split('\n').slice(1).join('\n')));
    }
  } else {
    console.error(chalk.red('An unknown error occurred'));
  }

  console.error(chalk.blue('\nTroubleshooting steps:'));
  console.error('1. Make sure you are using Node.js 16.0.0 or higher');
  console.error('2. Try clearing your npm cache: npm cache clean --force');
  console.error('3. Check your project\'s package.json for correct configuration');
  console.error('\nIf the problem persists, please report this issue at:');
  console.error(chalk.cyan('https://github.com/yourusername/nexus-ui/issues'));

  process.exit(1);
}