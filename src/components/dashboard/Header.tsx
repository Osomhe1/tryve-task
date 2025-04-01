
import React, { useState } from 'react';
import { Menu, Bell, Search, X } from 'lucide-react';
import { useFetchData } from '../../hooks/useFetchData';
import { api } from '../../services/api';

type HeaderProps = {
  toggleSidebar: () => void;
};

const Header = ({ toggleSidebar }: HeaderProps) => {
  const { data: userData } = useFetchData(api.fetchUserProfile);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="dashboard-header w-full bg-background border-b sticky top-0 z-10">
      <div className="container mx-auto p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar} 
            className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
          
          {!showSearch && (
            <h1 className="text-xl md:text-2xl font-semibold">WealthWindow</h1>
          )}
          
          <div className={`${showSearch ? 'flex' : 'hidden md:flex'} items-center relative`}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="py-2 pl-9 pr-4 rounded-md border bg-background w-full md:w-80"
              />
              <Search size={16} className="absolute left-3 top-3 text-muted-foreground" />
            </div>
            {showSearch && (
              <button 
                onClick={() => setShowSearch(false)}
                className="md:hidden ml-2 p-2"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {!showSearch && (
            <button 
              onClick={() => setShowSearch(true)} 
              className="md:hidden p-2 rounded-md hover:bg-muted transition-colors"
            >
              <Search size={20} />
            </button>
          )}
          
          <button className="p-2 rounded-md hover:bg-muted transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>
          
          {userData && (
            <div className="flex items-center gap-3 ml-2">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium">{userData.name}</p>
                <p className="text-xs text-muted-foreground">{userData.email}</p>
              </div>
              <img 
                src={userData.avatar} 
                alt={userData.name} 
                className="w-9 h-9 rounded-full border-2 border-primary"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
