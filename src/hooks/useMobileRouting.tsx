
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useMobileRouting = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Handle mobile app routing edge cases
    const handleMobileRouting = () => {
      // If we're in a mobile app context and get an invalid route
      const isMobileApp = window.location.protocol === 'capacitor:' || 
                          window.location.protocol === 'file:' ||
                          (window as any).Capacitor;

      if (isMobileApp) {
        // Valid routes for the mobile app
        const validRoutes = [
          '/',
          '/security-status',
          '/system-monitor',
          '/apps-scanner',
          '/alert-panel',
          '/file-scanner',
          '/url-scanner',
          '/phishing-detector',
          '/battery-monitor',
          '/ai-detection',
          '/app-lock',
          '/security-chat'
        ];

        if (!validRoutes.includes(location.pathname)) {
          console.log('Invalid route detected in mobile app, redirecting to home');
          navigate('/', { replace: true });
        }
      }
    };

    handleMobileRouting();
  }, [location.pathname, navigate]);

  return null;
};
