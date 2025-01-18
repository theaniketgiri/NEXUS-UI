import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs-extra';
import path from 'path';

const execAsync = promisify(exec);

describe('nexus-ui CLI', () => {
  const testDir = path.join(__dirname, 'test-project');

  beforeEach(async () => {
    await fs.ensureDir(testDir);
    process.chdir(testDir);
  });

  afterEach(async () => {
    await fs.remove(testDir);
  });

  it('should add a button component', async () => {
    await execAsync('npx nexus-ui add button');
    
    const componentExists = await fs.pathExists(
      path.join(testDir, 'src', 'components', 'button', 'Button.tsx')
    );
    
    expect(componentExists).toBe(true);
  });

  it('should fail when adding non-existent component', async () => {
    await expect(
      execAsync('npx nexus-ui add non-existent')
    ).rejects.toThrow();
  });

  it('should fail when adding premium component without license', async () => {
    await expect(
      execAsync('npx nexus-ui add modal')
    ).rejects.toThrow(/premium component/);
  });
});