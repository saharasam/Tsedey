import React from 'react';
import { Home, ShoppingBag, Heart, User } from 'lucide-react';
import { View } from '../../types';

interface BottomNavProps {
  currentView: View;
  onNavigate: (view: View) => void;
}

export function BottomNav({ currentView, onNavigate }: BottomNavProps) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-t border-outline-variant/10 rounded-t-[2rem] shadow-lg">
      <div className="flex justify-around items-center px-4 pb-6 pt-3 max-w-md mx-auto">
        <NavItem 
          icon={<Home size={24} />} 
          label="Home" 
          active={currentView === 'home'} 
          onClick={() => onNavigate('home')} 
        />
        <NavItem 
          icon={<ShoppingBag size={24} />} 
          label="Shop" 
          active={currentView === 'shop' || currentView === 'product'} 
          onClick={() => onNavigate('shop')} 
        />
        <NavItem 
          icon={<Heart size={24} />} 
          label="Wishlist" 
          active={false} 
          onClick={() => {}} 
        />
        <NavItem 
          icon={<User size={24} />} 
          label="Profile" 
          active={false} 
          onClick={() => {}} 
        />
      </div>
    </nav>
  );
}

function NavItem({ icon, label, active, onClick }: { icon: React.ReactNode, label: string, active: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center justify-center px-5 py-2 transition-all duration-300 rounded-full ${active ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:text-primary'}`}
    >
      {icon}
      <span className="text-[10px] uppercase tracking-widest mt-1 font-bold">{label}</span>
    </button>
  );
}
