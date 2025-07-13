import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Search, Bell, Settings, User, HelpCircle, MessageSquare, Upload, Clock, CreditCard, MapPin, ReceiptPoundSterling, Receipt, ReceiptCent, HelpingHand, Radio, AudioWaveformIcon } from "lucide-react";


interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;
  const [activeTab, setActiveTab] = useState("Dashboard");

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true',
  );


  const navigationItems = [
    { name: "Dashboard", icon: <Settings className="w-5 h-5" />, route: "/dashboard"},
    { name: "Match Log Viewer", icon: <Clock className="w-5 h-5" />, route: "/match-logs" },
    { name: "Match Dispute Management", icon: <CreditCard className="w-5 h-5" />, route: "/match-disputes" },
    { name: "Notifications", icon: <Bell className="w-5 h-5" /> , route: "/notifications"},
    { name: "Profile", icon: <User className="w-5 h-5" />, route: "/profile" },
    { name: "Education & Support", icon: <HelpCircle className="w-5 h-5" /> , route: "/help"},
    { name: "Settings", icon: <Settings className="w-5 h-5" />, route: "/settings" },

    { name: "----------", icon: "" , route: "#"},
    { name: "Radio Stream", icon: <Radio className="w-5 h-5" /> , route: "/radio-stream"},
    { name: "Audio File Match", icon: <AudioWaveformIcon className="w-5 h-5" /> , route: "/audio-stream"},


  ];

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/dashboard">
          <div className="flex items-center gap-2">
          

            <div>
              <h4 className="mb-1 text-3xl font-semibold text-black dark:text-white">
                {'ZamIO'}
              </h4>

         
            </div>
          </div>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-2 lg:mt-9 lg:px-2">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark1">
              MENU
            </h3>

            <ul>
            {navigationItems.map((item) => (
              <li key={item.name}>
                 <NavLink to={item.route}>
                 
                <button
                  className={`flex items-center text-sm w-full px-6 py-2 hover:bg-indigo-900 transition-colors ${
                    activeTab === item.name ? "bg-indigo-900 font-semibold" : ""
                  }`}
                  onClick={() => setActiveTab(item.name)}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </button>
</NavLink>

              </li>
            ))}
          </ul>


          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
