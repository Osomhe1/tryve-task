
import React from 'react';
import { User, Shield, Bell, CreditCard, Lock, Languages, HelpCircle } from 'lucide-react';
import DashboardCard from '../components/dashboard/DashboardCard';
import { useFetchData } from '../hooks/useFetchData';
import { api } from '../services/api';

const Settings = () => {
  const { data: userData } = useFetchData(api.fetchUserProfile);

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-semibold mb-6">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <DashboardCard className="sticky top-20">
            <div className="space-y-1">
              <a href="#profile" className="flex items-center gap-2 text-primary px-3 py-2 rounded-md bg-accent">
                <User size={18} />
                <span>Profile</span>
              </a>
              <a href="#security" className="flex items-center gap-2 text-foreground hover:text-primary px-3 py-2 rounded-md hover:bg-accent transition-colors">
                <Shield size={18} />
                <span>Security</span>
              </a>
              <a href="#notifications" className="flex items-center gap-2 text-foreground hover:text-primary px-3 py-2 rounded-md hover:bg-accent transition-colors">
                <Bell size={18} />
                <span>Notifications</span>
              </a>
              <a href="#payment" className="flex items-center gap-2 text-foreground hover:text-primary px-3 py-2 rounded-md hover:bg-accent transition-colors">
                <CreditCard size={18} />
                <span>Payment Methods</span>
              </a>
              <a href="#password" className="flex items-center gap-2 text-foreground hover:text-primary px-3 py-2 rounded-md hover:bg-accent transition-colors">
                <Lock size={18} />
                <span>Password</span>
              </a>
              <a href="#language" className="flex items-center gap-2 text-foreground hover:text-primary px-3 py-2 rounded-md hover:bg-accent transition-colors">
                <Languages size={18} />
                <span>Language</span>
              </a>
              <a href="#help" className="flex items-center gap-2 text-foreground hover:text-primary px-3 py-2 rounded-md hover:bg-accent transition-colors">
                <HelpCircle size={18} />
                <span>Help & Support</span>
              </a>
            </div>
          </DashboardCard>
        </div>
        
        <div className="md:col-span-3 space-y-6">
          <DashboardCard id="profile">
            <h2 className="text-xl font-medium mb-4">Profile Information</h2>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-shrink-0">
                  <img 
                    src={userData?.avatar} 
                    alt={userData?.name} 
                    className="w-20 h-20 rounded-full border-2 border-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">{userData?.name}</h3>
                  <p className="text-sm text-muted-foreground">{userData?.email}</p>
                  <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                    Change Photo
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    First Name
                  </label>
                  <input 
                    type="text" 
                    className="w-full rounded-md border py-2 px-3" 
                    defaultValue="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Last Name
                  </label>
                  <input 
                    type="text" 
                    className="w-full rounded-md border py-2 px-3" 
                    defaultValue="Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    className="w-full rounded-md border py-2 px-3" 
                    defaultValue="john.doe@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    className="w-full rounded-md border py-2 px-3" 
                    defaultValue="+1 (555) 123-4567"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Address
                  </label>
                  <input 
                    type="text" 
                    className="w-full rounded-md border py-2 px-3" 
                    defaultValue="123 Main St, Anytown, USA 12345"
                  />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard id="security">
            <h2 className="text-xl font-medium mb-4">Security Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <div>
                  <button className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                    Enable
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Login Notifications</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Receive alerts when your account is accessed
                  </p>
                </div>
                <div>
                  <div className="w-11 h-6 bg-primary rounded-full p-1 flex items-center cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full transform translate-x-5"></div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Transaction Confirmations</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Confirm transactions above $1,000
                  </p>
                </div>
                <div>
                  <div className="w-11 h-6 bg-primary rounded-full p-1 flex items-center cursor-pointer">
                    <div className="w-4 h-4 bg-white rounded-full transform translate-x-5"></div>
                  </div>
                </div>
              </div>
            </div>
          </DashboardCard>
          
          {/* Additional settings sections would go here */}
        </div>
      </div>
    </div>
  );
};

export default Settings;
