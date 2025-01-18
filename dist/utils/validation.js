import fs from 'fs/promises';
import { resolve } from 'path';
import semver from 'semver';
import chalk from 'chalk';
import { CLIError } from './error.js';
export function checkNodeVersion(currentVersion, requiredVersion) {
    if (!semver.valid(currentVersion)) {
        throw new CLIError(`Invalid Node.js version format: ${currentVersion}`, 'INVALID_NODE_VERSION');
    }
    if (!semver.gte(currentVersion, requiredVersion)) {
        throw new CLIError(`You are running Node.js ${currentVersion}.\n` +
            `Nexus-UI requires Node.js ${requiredVersion} or higher.\n` +
            `Please update your version of Node.js.`, 'NODE_VERSION_TOO_LOW');
    }
}
export function validateEnvironment() {
    // Check if running with npx
    const isNpx = process.env.npm_execpath?.includes('npx');
    if (!isNpx) {
        console.warn(chalk.yellow('Warning: It is recommended to run this tool using npx:\n' +
            '  npx nexus-ui <command>\n'));
    }
    // Check for required environment variables
    const requiredEnvVars = ['NODE_ENV', 'npm_config_user_agent'];
    const missingEnvVars = requiredEnvVars.filter(v => !process.env[v]);
    if (missingEnvVars.length > 0) {
        console.warn(chalk.yellow('Warning: Some environment variables are missing:\n' +
            `  ${missingEnvVars.join(', ')}\n` +
            'This might affect some functionality.'));
    }
    // Check memory limits
    const heapLimit = require('v8').getHeapStatistics().heap_size_limit;
    const heapLimitGB = Math.round(heapLimit / 1024 / 1024 / 1024 * 100) / 100;
    if (heapLimitGB < 2) {
        console.warn(chalk.yellow(`Warning: Available heap memory (${heapLimitGB}GB) might be insufficient.\n` +
            'Consider running Node.js with --max-old-space-size=4096'));
    }
    // Check for required tools
    try {
        require('typescript');
    }
    catch {
        throw new CLIError('TypeScript is required but not installed.\n' +
            'Please install it with: npm install -g typescript', 'TYPESCRIPT_NOT_FOUND');
    }
}
export async function validateFileSystem() {
    const requiredDirs = ['src', 'dist'];
    for (const dir of requiredDirs) {
        try {
            await fs.access(resolve(process.cwd(), dir));
        }
        catch {
            throw new CLIError(`Required directory '${dir}' not found.\n` +
                'Please ensure you are in the correct project directory.', 'DIRECTORY_NOT_FOUND');
        }
    }
    // Check write permissions
    try {
        const testFile = resolve(process.cwd(), '.write-test');
        await fs.writeFile(testFile, '');
        await fs.unlink(testFile);
    }
    catch {
        throw new CLIError('Insufficient file system permissions.\n' +
            'Please ensure you have write access to the project directory.', 'INSUFFICIENT_PERMISSIONS');
    }
    // Check available disk space
    try {
        const { default: checkDiskSpace } = await import('check-disk-space');
        const space = await checkDiskSpace(process.cwd());
        const availableGB = Math.round(space.free / 1024 / 1024 / 1024);
        if (availableGB < 1) {
            throw new CLIError(`Insufficient disk space. Only ${availableGB}GB available.\n` +
                'Please ensure at least 1GB of free space.', 'INSUFFICIENT_DISK_SPACE');
        }
    }
    catch (error) {
        if (error instanceof CLIError)
            throw error;
        // If check-disk-space fails, log warning but continue
        console.warn(chalk.yellow('Warning: Unable to check available disk space.\n' +
            'Please ensure you have sufficient free space.'));
    }
}
