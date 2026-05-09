import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Toaster } from "react-hot-toast";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Pricing from "./pages/Pricing";
import Sidebar from "./components/layout/Sidebar";
import Navbar from "./components/layout/Navbar";
import './i18n'; // i18n init karo

function App() {
  const { i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isRTL = i18n.language === 'ar';

  // Set HTML dir + lang on language change
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language, isRTL]);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-zinc-900 transition-colors duration-300">
      {/* Toast Notifications - RTL aware */}
      <Toaster
        position={isRTL ? "top-left" : "top-right"}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
            fontFamily: isRTL ? 'Cairo, sans-serif' : 'inherit',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Navbar */}
      <Navbar toggleSidebar={() => setSidebarOpen(true)} />
      
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      {/* Main Content */}
      <main className={`
        pt-20 transition-all duration-300
        ${isRTL ? 'lg:mr-64' : 'lg:ml-64'}
      `}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/pricing" element={<Pricing />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;