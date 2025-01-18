export interface AddOptions {
    premium?: boolean;
}
export interface ComponentConfig {
    name: string;
    template: string;
    dependencies: string[];
    premium: boolean;
}
export interface LicenseInfo {
    key: string;
    valid: boolean;
    expiry: string;
}
