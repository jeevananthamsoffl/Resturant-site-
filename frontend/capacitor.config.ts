import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.royalfeast.restaurant',
  appName: 'ROYAL FEAST',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
};

export default config;
