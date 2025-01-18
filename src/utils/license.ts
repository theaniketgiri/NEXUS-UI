import Conf from 'conf';
import fetch from 'node-fetch';

const config = new Conf({
  projectName: 'nexus-ui'
});

interface LicenseResponse {
  valid: boolean;
  expiry: string;
}

export async function checkLicense(): Promise<boolean> {
  const licenseKey = config.get('licenseKey');
  
  if (!licenseKey) {
    return false;
  }

  try {
    const response = await fetch('https://api.nexus-ui.dev/validate-license', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ licenseKey }),
    });

    if (!response.ok) {
      return false;
    }

    const data: LicenseResponse = await response.json();
    
    if (!data.valid) {
      return false;
    }

    // Store expiry date
    config.set('licenseExpiry', data.expiry);
    return true;
  } catch (error) {
    // If API is unreachable, check stored expiry date
    const expiry = config.get('licenseExpiry') as string;
    if (!expiry) {
      return false;
    }

    return new Date(expiry) > new Date();
  }
}