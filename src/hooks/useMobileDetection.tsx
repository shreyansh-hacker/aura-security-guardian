
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
  const [systemInfo, setSystemInfo] = useState<MobileSystemInfo>(() => {
    // Initialize with actual values instead of defaults
    const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent.toLowerCase() : '';
    const isAndroid = /android/.test(userAgent);
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isMobile = isAndroid || isIOS || /mobile/.test(userAgent);

    return {
      isAndroid,
      isIOS,
      isMobile,
      deviceInfo: {
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        platform: typeof navigator !== 'undefined' ? navigator.platform : '',
        screenWidth: typeof screen !== 'undefined' ? screen.width : 0,
        screenHeight: typeof screen !== 'undefined' ? screen.height : 0,
        pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1,
        touchPoints: typeof navigator !== 'undefined' ? navigator.maxTouchPoints || 0 : 0,
        orientation: typeof screen !== 'undefined' && screen.orientation ? screen.orientation.type : 'portrait-primary'
      },
      capabilities: {
        geolocation: typeof navigator !== 'undefined' && 'geolocation' in navigator,
        camera: typeof navigator !== 'undefined' && 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
        microphone: typeof navigator !== 'undefined' && 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices,
        accelerometer: typeof window !== 'undefined' && 'DeviceMotionEvent' in window,
        gyroscope: typeof window !== 'undefined' && 'DeviceOrientationEvent' in window,
        vibration: typeof navigator !== 'undefined' && 'vibrate' in navigator
      }
    };
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

    // Run detection immediately and on window load
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

    if ('orientation' in screen && screen.orientation) {
      screen.orientation.addEventListener('change', handleOrientationChange);
      return () => screen.orientation.removeEventListener('change', handleOrientationChange);
    }
  }, []);

  return systemInfo;
};
