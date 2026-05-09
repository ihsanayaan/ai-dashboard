import { Moon, Sun, Menu, Globe, Home, Users, Settings, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const [dark, setDark] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // RTL auto set on language change
  useEffect(() => {
    document.dir = i18n.language === 'ar'? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ar'? 'en' : 'ar';
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { to: "/", icon: <Home size={18} />, label: t('Dashboard') },
    { to: "/users", icon: <Users size={18} />, label: t('Users') },
    { to: "/settings", icon: <Settings size={18} />, label: t('Settings') },
    { to: "/pricing", icon: <DollarSign size={18} />, label: t('Pricing') },
  ];

  return (
    <nav className="w-full flex items-center px-6 py-3 bg-white dark:bg-zinc-900 shadow">
      {/* Left Side - Mobile Menu + Title with space */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button - lg:hidden se desktop pe gayab */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden text-black dark:text-white"
        >
          <Menu />
        </button>

        {/* Title */}
        <h1 className="text-xl font-bold text-zinc-900 dark:text-white">
          {t('AI Dashboard')}
        </h1>
      </div>

      {/* Center - Desktop Links - Mobile pe hidden */}
      <div className="hidden lg:flex items-center gap-6 ltr:ml-8 rtl:mr-8">
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"
          >
            {link.icon}
            <span>{link.label}</span>
          </Link>
        ))}
      </div>

      {/* Right side buttons - ltr:ml-auto se right push */}
      <div className="flex items-center gap-3 ltr:ml-auto rtl:mr-auto">
       {/* Language Switcher */}
<button
  onClick={toggleLanguage}
  className="flex items-center gap-2 px-3 py-1.5 rounded-md text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
>
  <Globe size={18} />
  <span className="text-sm font-medium">
    {i18n.language === 'ar'? 'English' : 'العربية'}
  </span>
</button>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="text-black dark:text-white"
        >
          {dark? <Sun /> : <Moon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;