
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Remove any Lovable badge or tracking elements
const removeLovableBadge = () => {
  const badge = document.getElementById('lovable-badge');
  if (badge) {
    badge.remove();
  }
};

// Clean up on load
document.addEventListener('DOMContentLoaded', removeLovableBadge);

createRoot(document.getElementById("root")!).render(<App />);
