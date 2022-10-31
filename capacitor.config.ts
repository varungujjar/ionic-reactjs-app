import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.constellationesports',
  appName: 'esports',
  webDir: 'build',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,
      backgroundColor: "#ffffff",
      androidScaleType: "CENTER_CROP",
      splashImmersive: true,
    },
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '287524714990-od0bj2r7bsboh1p12pgbjjn2lbt9tien.apps.googleusercontent.com',
      clientId: '287524714990-od0bj2r7bsboh1p12pgbjjn2lbt9tien.apps.googleusercontent.com',
      iosClientId:'287524714990-jp35qk0oduu50jspnudd2b4jj7eptccc.apps.googleusercontent.com',
      // androidClientId:'287524714990-fnsul1b3498r9cv24eqaoq4p7e1mnnj7.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
