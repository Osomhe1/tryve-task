
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  LineChart, 
  PiggyBank, 
  Clock,  
  Settings, 
  HelpCircle,
  LogOut
} from 'lucide-react';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Investments', path: '/investments', icon: LineChart },
  { name: 'Savings', path: '/savings', icon: PiggyBank },
  { name: 'Transactions', path: '/transactions', icon: Clock },
  { name: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/30 z-20"
          onClick={onClose}  
        ></div>
      )}
      
      <aside className={`
        dashboard-sidebar fixed md:sticky top-0 bottom-0 
        w-64 bg-card border-r shadow-sm z-30 md:z-0
        transform transition-transform duration-200 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        flex flex-col h-screen
      `}>
        <div className="p-6">
          <h1 className="text-2xl font-bold text-primary flex items-center gap-2">
            <span className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white">W</span>
            WealthWindow
          </h1>
        </div>
        
        <nav className="flex-1 py-6 px-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink 
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium
                    ${isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-foreground hover:bg-accent transition-colors'}
                  `}
                  onClick={() => onClose()}
                >
                  <item.icon size={18} />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:bg-accent transition-colors">
            <HelpCircle size={18} />
            Help Center
          </button>
          <button className="w-full mt-2 flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-destructive hover:bg-accent transition-colors">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
