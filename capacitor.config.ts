
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: "com.aimgdetection.app",
  appName: "ai-malware-guard",
  webDir: "dist",
  bundledWebRuntime: false,
  server: {
    url: "https://a2bfc008-72c7-4db3-8132-9fa627ff0763.lovableproject.com?forceHideBadge=true",
    cleartext: true,
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true,
    appendUserAgent: "MobileSecurityGuardian/1.0",
    overrideUserAgent: "MobileSecurityGuardian Android App",
    backgroundColor: "#ffffff",
    toolbarColor: "#2563eb",
    navigationBarColor: "#1e40af",
    hideLogs: false,
    loggingBehavior: "debug"
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#2563eb",
      androidSplashResourceName: "splash",
      showSpinner: false,
      spinnerColor: "#ffffff"
    },
    StatusBar: {
      style: "dark",
      backgroundColor: "#2563eb"
    },
    Keyboard: {
      resize: "ionic",
      style: "light",
      resizeOnFullScreen: true
    }
  }
};

export default config;
