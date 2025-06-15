
# Aura Security Guardian - Advanced Mobile & Web Security Monitoring Dashboard

A cutting-edge, real-time security monitoring application built with React, TypeScript, and Tailwind CSS. This comprehensive dashboard provides advanced threat detection, real-time system monitoring, and mobile-optimized security tools for both Android and web platforms.

## 🛡️ Core Features

### Real-Time Security Monitoring
- **Live App Detection** - Automatically detects and monitors installed applications on Android devices and web browsers
- **Advanced Threat Analysis** - AI-powered risk assessment with real-time threat scoring
- **Mobile-First Design** - Optimized performance and accurate data collection on Android devices
- **Resource Monitoring** - Real-time CPU, memory, battery, and network usage tracking
- **Permission Analysis** - Comprehensive app permission auditing and risk evaluation

### Security Tools Suite
- **Apps Scanner** - Deep scanning of installed applications with real-time resource monitoring
- **AI Detection Panel** - Machine learning-powered threat detection and behavioral analysis
- **File Scanner** - Comprehensive file security scanning and malware detection
- **URL Scanner** - Real-time website and link safety verification
- **Phishing Detector** - Advanced phishing attempt detection and prevention
- **Battery Monitor** - Live system performance metrics and resource optimization
- **App Lock Panel** - Biometric app protection and security controls
- **Security Chatbot** - Interactive AI assistant for security guidance

## 📱 Mobile & Platform Support

### Android Optimization
- **Native App Detection** - Scans and identifies actual installed Android applications
- **Real Resource Monitoring** - Accurate CPU, memory, and battery usage tracking
- **Permission Mapping** - Detailed analysis of app permissions and security risks
- **Package Information** - Access to app version, install date, and package details
- **Touch-Optimized Interface** - Responsive design optimized for mobile interaction

### Cross-Platform Compatibility
- **Android Devices** - Full native app detection and monitoring
- **iOS Devices** - Web-based monitoring with enhanced mobile features
- **Desktop Browsers** - Complete web application monitoring suite
- **Progressive Web App** - Can be installed as a mobile app using Capacitor

## 🔧 Technical Architecture

### Frontend Technologies
- **React 18** - Modern component-based architecture with hooks
- **TypeScript** - Full type safety and enhanced developer experience
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework with custom animations
- **Shadcn/ui** - High-quality, accessible component library

### Mobile Technologies
- **Capacitor** - Native mobile app development framework
- **PWA Support** - Progressive Web App capabilities
- **Native API Access** - Device sensors, camera, and system information
- **Hot Reload** - Live development updates on mobile devices

### Data & State Management
- **TanStack Query** - Advanced data fetching and caching
- **React Context** - Global state management
- **Custom Hooks** - Reusable logic for mobile detection and system monitoring
- **Real-time Updates** - Live data synchronization every 2-15 seconds

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 16+ with npm or yarn
- For mobile development: Android Studio (Android) or Xcode (iOS)
- Git for version control

### Development Setup

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd aura-security-guardian
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser

3. **Mobile Development** (Optional)
   ```bash
   # Initialize Capacitor for mobile
   npx cap init
   
   # Add mobile platforms
   npx cap add android  # For Android
   npx cap add ios      # For iOS (macOS only)
   
   # Build and sync
   npm run build
   npx cap sync
   
   # Run on device/emulator
   npx cap run android  # For Android
   npx cap run ios      # For iOS
   ```

### Production Build
```bash
npm run build
```
Built files will be in the `dist` directory.

## 📊 How the Project Works

### 1. Mobile App Detection System

The application uses a sophisticated multi-layered approach to detect and monitor applications:

#### Android Detection Process
```typescript
// Real Android app detection
const detectedApps = await MobileAppsDetection.getInstance().scanForApps();
```

**Detection Layers:**
1. **User Agent Analysis** - Identifies device platform and capabilities
2. **Package Detection** - Scans for common Android app packages
3. **Resource Monitoring** - Tracks real-time CPU, memory, and battery usage
4. **Permission Mapping** - Analyzes app permissions for security assessment

#### Data Collection Methods
- **System Information** - Platform, OS version, device specifications
- **Performance Metrics** - Real-time resource usage and system load
- **Network Analysis** - Connection speed, latency, and data usage
- **Security Assessment** - Risk scoring based on permissions and behavior

### 2. Real-Time Monitoring Architecture

#### Update Intervals
- **Mobile Devices**: 15-second intervals (battery optimized)
- **Desktop**: 10-second intervals (performance optimized)
- **Critical Metrics**: 2-second intervals (CPU, memory)

#### Performance Optimization
```typescript
// Mobile-optimized update strategy
const updateInterval = mobileInfo.isMobile ? 15000 : 10000;
const interval = setInterval(updateDataCallback, updateInterval);
```

### 3. Security Risk Assessment

#### Risk Calculation Algorithm
```typescript
const calculateAppRisk = (app) => {
  let risk = 15; // Base risk
  
  // Permission-based risk
  if (app.permissions.includes('Camera')) risk += 15;
  if (app.permissions.includes('Location')) risk += 10;
  
  // Resource usage risk
  if (app.cpuUsage > 25) risk += 15;
  if (app.batteryUsage > 20) risk += 12;
  
  // Category-based risk
  const categoryRisk = {
    'Social': 10,
    'Browser': 12,
    'Communication': 8
  };
  
  return Math.min(95, Math.max(5, risk));
};
```

#### Risk Categories
- **Critical (80-95)** - Immediate attention required
- **High Risk (60-79)** - Monitor closely, consider restrictions
- **Monitor (30-59)** - Regular monitoring recommended
- **Safe (5-29)** - Low risk, normal operation

### 4. Mobile Detection Service

#### Platform Identification
```typescript
export class MobileAppsDetection {
  private detectPlatform(): void {
    const userAgent = navigator.userAgent.toLowerCase();
    this.isAndroid = /android/.test(userAgent);
    this.isIOS = /iphone|ipad|ipod/.test(userAgent);
  }
}
```

#### App Data Structure
```typescript
interface DetectedApp {
  name: string;
  package?: string;
  category: string;
  version?: string;
  isSystem: boolean;
  permissions: string[];
  memoryUsage: number;
  cpuUsage: number;
  batteryUsage: number;
  networkUsage: number;
  lastUsed: Date;
  installDate: Date;
  size: number;
}
```

### 5. Component Architecture

#### Core Components
- **AppsScanner** - Main app detection and monitoring interface
- **BatteryMonitor** - System performance and resource tracking
- **SecurityStatus** - Overall security dashboard and alerts
- **MobileDetection Hook** - Device capability and platform detection

#### Service Layer
- **MobileAppsDetection** - Core app scanning and analysis service
- **SystemPerformance** - Real-time system metrics collection
- **SecurityAssessment** - Risk calculation and threat analysis

## 🔒 Security Features Deep Dive

### Permission Analysis
The system analyzes app permissions to assess security risks:

**High-Risk Permissions:**
- Camera/Microphone access
- Location tracking
- Contact access
- SMS/Phone permissions
- File system access

**Risk Assessment:**
- Permission count and sensitivity
- Resource usage patterns
- Network activity monitoring
- Behavioral analysis

### Real-Time Threat Detection
- **Anomaly Detection** - Unusual resource usage patterns
- **Permission Escalation** - Apps requesting new permissions
- **Network Monitoring** - Suspicious data transmission
- **Behavioral Analysis** - App usage pattern analysis

## 🎨 UI/UX Features

### Mobile-First Design
- **Touch-Optimized** - Large touch targets and gesture support
- **Responsive Layout** - Adapts to all screen sizes and orientations
- **Performance Focused** - Optimized animations and transitions
- **Accessibility** - WCAG 2.1 compliant with screen reader support

### Visual Indicators
- **Risk Color Coding** - Immediate visual risk assessment
- **Real-Time Animations** - Live data updates with smooth transitions
- **Progress Indicators** - Clear feedback for scanning operations
- **Status Badges** - Quick identification of app states

## 📈 Performance Metrics

### Mobile Optimization
- **Battery Efficiency** - Optimized scanning intervals on mobile
- **Memory Management** - Efficient data structures and cleanup
- **Network Optimization** - Minimal data usage for updates
- **CPU Usage** - Lightweight algorithms for real-time monitoring

### Monitoring Capabilities
- **Live Resource Tracking** - Real-time CPU, memory, battery usage
- **Network Analysis** - Speed, latency, and data consumption
- **Performance Trends** - Historical data and usage patterns
- **System Health** - Overall device performance indicators

## 🛠️ Development & Deployment

### Environment Configuration
```env
VITE_API_URL=your_api_endpoint
VITE_APP_NAME=Aura Security Guardian
VITE_VERSION=2.0.0
VITE_MOBILE_ENABLED=true
```

### Build Configuration
- **Mobile Builds** - Capacitor configuration for native apps
- **Web Deployment** - Static hosting optimization
- **Progressive Web App** - Service worker and offline capabilities
- **Performance Monitoring** - Built-in analytics and error tracking

### Deployment Options
- **Vercel/Netlify** - Static hosting for web version
- **Google Play Store** - Android app distribution
- **Apple App Store** - iOS app distribution (requires Apple Developer account)
- **Self-Hosted** - Custom server deployment

## 🔧 Configuration & Customization

### Mobile Detection Settings
```typescript
// Customize detection intervals
const mobileConfig = {
  updateInterval: 15000,  // Mobile update frequency
  desktopInterval: 10000, // Desktop update frequency
  batteryOptimized: true, // Enable battery optimization
  highAccuracy: false     // Trade accuracy for performance
};
```

### Security Thresholds
```typescript
// Customize risk assessment
const securityConfig = {
  criticalRisk: 80,
  highRisk: 60,
  mediumRisk: 30,
  maxPermissions: 10,
  resourceThresholds: {
    cpu: 25,
    memory: 150,
    battery: 20
  }
};
```

## 📚 API Reference

### Mobile Detection Hook
```typescript
const mobileInfo = useMobileDetection();
// Returns: { isAndroid, isIOS, isMobile, deviceInfo, capabilities }
```

### Apps Detection Service
```typescript
const detector = MobileAppsDetection.getInstance();
const apps = await detector.scanForApps();
const highRiskApps = detector.getHighResourceApps();
```

## 🐛 Troubleshooting

### Common Issues

**Mobile App Detection Not Working**
- Ensure device permissions are granted
- Check browser compatibility with device APIs
- Verify Capacitor plugins are installed correctly

**Performance Issues on Mobile**
- Increase update intervals in mobile configuration
- Enable battery optimization mode
- Check for memory leaks in component cleanup

**Build Failures**
- Clear node_modules and reinstall dependencies
- Update Capacitor and related plugins
- Check TypeScript configuration

### Debug Mode
Enable detailed logging for troubleshooting:
```typescript
// Add to main.tsx for debug mode
if (import.meta.env.DEV) {
  console.log('Debug mode enabled');
  window.debugMode = true;
}
```

## 🚀 Future Roadmap

### Planned Features
- **AI-Enhanced Detection** - Machine learning threat prediction
- **Cloud Sync** - Cross-device security monitoring
- **Advanced Analytics** - Detailed security reports and trends
- **Enterprise Features** - Multi-device management and policies

### Mobile Enhancements
- **Native Plugins** - Direct access to system APIs
- **Offline Mode** - Local scanning and caching
- **Push Notifications** - Real-time security alerts
- **Biometric Security** - Fingerprint and face recognition

## 📄 License & Contributing

This project is licensed under the MIT License. Contributions are welcome!

### Contributing Guidelines
1. Fork the repository
2. Create a feature branch
3. Make your changes with proper TypeScript types
4. Add tests for new functionality
5. Submit a pull request with detailed description

### Code Standards
- TypeScript strict mode required
- ESLint and Prettier configuration enforced
- Component-based architecture
- Mobile-first responsive design
- Accessibility compliance (WCAG 2.1)

---

**Built with ❤️ using React, TypeScript, Tailwind CSS, and Capacitor**

For support, documentation, or feature requests, please visit our [GitHub repository](https://github.com/your-repo/aura-security-guardian) or join our [Discord community](https://discord.gg/your-discord).
