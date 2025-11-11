import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <nav className="w-full p-4 bg-gray-200 dark:bg-gray-800 flex justify-between items-center">
      <h1 className="text-xl font-bold dark:text-white">Padaria 🍞</h1>

      <div className="flex gap-4 items-center">
        <Link to="/" className="text-gray-700 dark:text-gray-300 hover:underline">Home</Link>
        <Link to="/login" className="text-gray-700 dark:text-gray-300 hover:underline">Login</Link>
        <Link to="/produtos" className="text-gray-700 dark:text-gray-300 hover:underline">Produtos</Link>

        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 dark:text-white transition"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}
