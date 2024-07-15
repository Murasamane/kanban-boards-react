import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import ShowButton from "../components/ShowButton";
import { useDarkMode } from "../context/DarkMode";
import useResize from "../hooks/useResize";
import MobileHeader from "../components/Mobile/MobileHeader";

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isDark, setIsDark } = useDarkMode();
  const innerWidth = useResize();

  const mobileWidth = innerWidth <= 650;

  const handleToggleDark = () => setIsDark((state) => !state);
  const handleSidebarClose = () => setSidebarOpen(false);
  const handleSidebarOpen = () => setSidebarOpen(true);
  return (
    <div className={`flex flex-col min-h-screen ${isDark ? "dark" : ""}`}>
      {!mobileWidth ? (
        <Header isDark={isDark} onHandleDark={handleToggleDark} />
      ) : (
        <MobileHeader isDark={isDark} onHandleDark={handleToggleDark} />
      )}
      <main className="flex flex-1 bg-grey-100 dark:bg-grey-500 overflow-x-auto">
        {sidebarOpen && !mobileWidth && (
          <Sidebar
            onClose={handleSidebarClose}
            onHandleDark={handleToggleDark}
            isDark={isDark}
          />
        )}
        <div className="pl-6 pt-6 w-full">
          <Outlet />
        </div>
        {!sidebarOpen && !mobileWidth && (
          <ShowButton onOpen={handleSidebarOpen} />
        )}
      </main>
    </div>
  );
}
