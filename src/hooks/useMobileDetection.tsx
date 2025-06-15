
import { useState, useEffect } from 'react';

interface MobileSystemInfo {
  isAndroid: boolean;
  isIOS: boolean;
  isMobile: boolean;
  deviceInfo: {
    userAgent: string;
    platform: string;
    screenWidth: number;
    screenHeight: number;
    pixelRatio: number;
    touchPoints: number;
    orientation: string;
  };
  capabilities: {
    geolocation: boolean;
    camera: boolean;
    microphone: boolean;
    accelerometer: boolean;
    gyroscope: boolean;
    vibration: boolean;
  };
}

export const useMobileDetection = (): MobileSystemInfo => {
  const [systemInfo, setSystemInfo] = useState<MobileSystemInfo>({
    isAndroid: false,
    isIOS: false,
    isMobile: false,
    deviceInfo: {
      userAgent: '',
      platform: '',
      screenWidth: 0,
      screenHeight: 0,
      pixelRatio: 1,
      touchPoints: 0,
      orientation: 'portrait'
    },
    capabilities: {
      geolocation: false,
      camera: false,
      microphone: false,
      accelerometer: false,
      gyroscope: false,
      vibration: false
    }
  });

  useEffect(() => {
    const detectMobileSystem = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const isAndroid = /android/.test(userAgent);
      const isIOS = /iphone|ipad|ipod/.test(userAgent);
      const isMobile = isAndroid || isIOS || /mobile/.test(userAgent);

      // Enhanced device detection
      const deviceInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        screenWidth: screen.width,
        screenHeight: screen.height,
        pixelRatio: window.devicePixelRatio || 1,
        touchPoints: navigator.maxTouchPoints || 0,
        orientation: screen.orientation?.type || 'portrait-primary'
      };

      // Check for device capabilities
      const capabilities = {
        geolocation: 'geolocation' in navigator,
        camera: 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
        microphone: 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
        accelerometer: 'DeviceMotionEvent' in window,
        gyroscope: 'DeviceOrientationEvent' in window,
        vibration: 'vibrate' in navigator
      };

      setSystemInfo({
        isAndroid,
        isIOS,
        isMobile,
        deviceInfo,
        capabilities
      });
    };

    detectMobileSystem();
    
    // Listen for orientation changes
    const handleOrientationChange = () => {
      setSystemInfo(prev => ({
        ...prev,
        deviceInfo: {
          ...prev.deviceInfo,
          orientation: screen.orientation?.type || 'portrait-primary'
        }
      }));
    };

    if ('orientation' in screen) {
      screen.orientation.addEventListener('change', handleOrientationChange);
      return () => screen.orientation.removeEventListener('change', handleOrientationChange);
    }
  }, []);

  return systemInfo;
};
