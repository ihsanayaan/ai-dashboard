import { Moon, Sun, Menu } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = ({ toggleSidebar }) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <nav className="w-full flex justify-between items-center px-6 py-3 bg-white dark:bg-zinc-900 shadow">
      <button onClick={toggleSidebar} className="lg:hidden text-black dark:text-white">
        <Menu />
      </button>
      <h1 className="text-xl font-bold text-zinc-900 dark:text-white">AI Dashboard</h1>
      <button
        onClick={() => setDark(!dark)}
        className="text-black dark:text-white"
      >
        {dark ? <Sun /> : <Moon />}
      </button>
    </nav>
  );
};

export default Navbar;
