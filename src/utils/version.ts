import semver from 'semver';
import chalk from 'chalk';

export function checkNodeVersion(currentVersion: string, requiredVersion: string): void {
  if (!semver.gte(currentVersion, requiredVersion)) {
    console.error(
      chalk.red(
        `You are running Node.js ${currentVersion}.\n` +
        `Nexus-UI requires Node.js ${requiredVersion} or higher.\n` +
        `Please update your version of Node.js.`
      )
    );
    process.exit(1);
  }
}

export function validateEnvironment(): void {
  // Check if running with npx
  const isNpx = process.env.npm_execpath?.includes('npx');
  
  if (!isNpx) {
    console.warn(
      chalk.yellow(
        'Warning: It is recommended to run this tool using npx:\n' +
        '  npx nexus-ui <command>\n'
      )
    );
  }

  // Check for required environment variables
  const requiredEnvVars = ['NODE_ENV', 'npm_config_user_agent'];
  const missingEnvVars = requiredEnvVars.filter(v => !process.env[v]);
  
  if (missingEnvVars.length > 0) {
    console.warn(
      chalk.yellow(
        'Warning: Some environment variables are missing:\n' +
        `  ${missingEnvVars.join(', ')}\n` +
        'This might affect some functionality.'
      )
    );
  }
}