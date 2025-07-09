import React, { ReactNode, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header/index';
import Sidebar from '../components/Sidebar';

interface DefaultLayoutProps {
  children: ReactNode;
  hiddenOnRoutes: string[];
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, hiddenOnRoutes }) => {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Determine if the current route should hide the sidebar and header
  const hideSidebarAndHeader = hiddenOnRoutes.some(route => {
    if (route.includes(':')) {
      // For dynamic routes like /verify-user/:user_email, check if the pathname starts with the route
      return pathname.startsWith(route.split('/:')[0]);
    }
    return pathname === route; // Exact match for non-dynamic routes
  });

  return (
    <div className=" dark:bg-boxdark-2 dark:text-bodydark ">
      <div className="flex h-screen overflow-hidden">
        {/* Conditionally render Sidebar */}
        {!hideSidebarAndHeader && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}

        <div className="relative flex flex-1 flex-col overflow-y overflow-x-hidden">
          {/* Conditionally render Header */}
          {!hideSidebarAndHeader && (
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          )}

          <main>
            <div className="mx-auto max-w-screen-2xl p-3 md:p-4 2xl:p-5">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
