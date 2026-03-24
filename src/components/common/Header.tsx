import { Search, ShoppingBag, ArrowLeft } from 'lucide-react';
import { View } from '../../types';

interface HeaderProps {
  isScrolled: boolean;
  currentView: View;
  cartCount: number;
  onNavigate: (view: View) => void;
  onBack: () => void;
}

export function Header({ isScrolled, currentView, cartCount, onNavigate, onBack }: HeaderProps) {
  const isHeroMode = !isScrolled && currentView === 'home';
  const headerTextColor = isHeroMode ? 'text-white' : 'text-primary';
  const navLinkBase = 'text-sm font-bold uppercase tracking-widest transition-opacity hover:opacity-70';

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-surface/80 backdrop-blur-md border-b border-outline-variant/10' : 'bg-transparent border-transparent'}`}>
      <div className="flex justify-between items-center px-6 h-16 max-w-7xl mx-auto relative">

        {/* Mobile: back/search icon | Desktop: hidden (nav links shown instead) */}
        <div className="lg:hidden">
          <button
            className={`${headerTextColor} hover:opacity-80 transition-opacity`}
            onClick={() => currentView === 'product' ? onBack() : null}
          >
            {currentView === 'product'
              ? <ArrowLeft size={24} />
              : <Search size={24} />
            }
          </button>
        </div>

        {/* Desktop: left-side nav links */}
        <nav className="hidden lg:flex items-center gap-8">
          <button
            className={`${navLinkBase} ${headerTextColor} ${currentView === 'home' ? 'opacity-100' : 'opacity-60'}`}
            onClick={() => onNavigate('home')}
          >
            Home
          </button>
          <button
            className={`${navLinkBase} ${headerTextColor} ${currentView === 'shop' || currentView === 'product' ? 'opacity-100' : 'opacity-60'}`}
            onClick={() => onNavigate('shop')}
          >
            Shop
          </button>
        </nav>

        {/* Logo — centered on both mobile and desktop */}
        <h1
          className={`absolute left-1/2 -translate-x-1/2 text-2xl font-headline font-bold tracking-[0.2em] ${headerTextColor} cursor-pointer transition-colors flex items-center gap-2`}
          onClick={() => onNavigate('home')}
        >
          <img src={isHeroMode ? "/logo.png" : "/logo_colored.png"} alt="TSEDEY Logo" className="h-5 w-auto" />
          TSEDEY
        </h1>

        {/* Right side — cart icon (always visible) */}
        <div className="flex items-center gap-6">
          <button
            className={`${headerTextColor} hover:opacity-80 transition-opacity relative`}
            onClick={() => onNavigate('cart')}
          >
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
