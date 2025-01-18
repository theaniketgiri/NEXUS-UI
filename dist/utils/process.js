import { createInterface } from 'readline';
import chalk from 'chalk';
let shuttingDown = false;
export function setupGracefulShutdown() {
    // Handle cleanup on normal exit
    process.on('exit', () => {
        if (!shuttingDown) {
            cleanup();
        }
    });
    // Handle Ctrl+C
    process.on('SIGINT', () => {
        handleShutdown('SIGINT');
    });
    // Handle kill command
    process.on('SIGTERM', () => {
        handleShutdown('SIGTERM');
    });
    // Handle uncaught exceptions
    process.on('uncaughtException', (error) => {
        console.error(chalk.red('\nFatal: Uncaught Exception'));
        console.error(error);
        handleShutdown('uncaughtException');
    });
    // Handle unhandled promise rejections
    process.on('unhandledRejection', (reason) => {
        console.error(chalk.red('\nFatal: Unhandled Promise Rejection'));
        console.error(reason);
        handleShutdown('unhandledRejection');
    });
}
async function handleShutdown(signal) {
    if (shuttingDown)
        return;
    shuttingDown = true;
    console.log(chalk.yellow(`\nReceived ${signal}. Cleaning up...`));
    if (signal === 'SIGINT') {
        const rl = createInterface({
            input: process.stdin,
            output: process.stdout
        });
        const answer = await new Promise((resolve) => {
            rl.question(chalk.yellow('Are you sure you want to exit? [y/N] '), resolve);
        });
        rl.close();
        if (answer.toLowerCase() !== 'y') {
            shuttingDown = false;
            return;
        }
    }
    await cleanup();
    process.exit(signal === 'uncaughtException' || signal === 'unhandledRejection' ? 1 : 0);
}
async function cleanup() {
    try {
        // Add cleanup tasks here
        console.log(chalk.blue('Performing cleanup...'));
        // Example cleanup tasks:
        // - Remove temporary files
        // - Close database connections
        // - Cancel pending operations
        console.log(chalk.green('Cleanup completed.'));
    }
    catch (error) {
        console.error(chalk.red('Error during cleanup:'), error);
    }
}
