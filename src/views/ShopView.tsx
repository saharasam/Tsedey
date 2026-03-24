import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, SlidersHorizontal, Heart } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

interface ShopViewProps {
  onNavigate: (p: Product) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
}

export function ShopView({ onNavigate, wishlist, onToggleWishlist }: ShopViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-6 max-w-7xl mx-auto w-full"
    >
      <header className="mt-8 mb-4">
        <span className="text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold">Our Collection</span>
        <h3 className="text-4xl lg:text-5xl font-headline font-bold text-primary leading-tight mt-2">
          Movement <span className="lg:inline"><br className="lg:hidden" /></span>Redefined
        </h3>
      </header>

      {/* Filters */}
      <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-border -mx-6 px-6 py-3 mb-6 flex items-center gap-3 overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">Activity</span>
          <div className="flex gap-2">
            <button className="px-3 h-7 bg-primary text-white rounded-full text-xs font-medium shadow-sm">Yoga</button>
            <button className="px-3 h-7 border border-border text-on-surface-variant rounded-full text-xs font-medium hover:bg-surface-container-highest transition">Training</button>
            <button className="hidden lg:inline-flex px-3 h-7 border border-border text-on-surface-variant rounded-full text-xs font-medium hover:bg-surface-container-highest transition">Running</button>
            <button className="hidden lg:inline-flex px-3 h-7 border border-border text-on-surface-variant rounded-full text-xs font-medium hover:bg-surface-container-highest transition">HIIT</button>
          </div>
        </div>
        <div className="h-5 w-px bg-border flex-shrink-0" />
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">Size</span>
          <button className="flex items-center gap-1 px-3 h-7 rounded-full border border-border text-xs font-medium hover:bg-surface-container-highest transition">
            All Sizes <ChevronDown size={14} />
          </button>
        </div>
        <div className="flex-1" />
        <button className="flex-shrink-0 h-9 px-4 flex items-center gap-2 bg-secondary-container text-on-secondary-container rounded-full text-xs font-semibold shadow-sm hover:opacity-90 transition">
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>

      {/* Product grid — 2 cols mobile, 3 cols tablet, 4 cols desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 lg:gap-x-6 gap-y-10 lg:gap-y-12">
        {PRODUCTS.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onNavigate={onNavigate} 
            isWishlisted={wishlist.includes(product.id)}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
    </motion.div>
  );
}

const ProductCard: React.FC<{ product: Product, onNavigate: (p: Product) => void, isWishlisted: boolean, onToggleWishlist: (id: string) => void }> = ({ product, onNavigate, isWishlisted, onToggleWishlist }) => {
  return (
    <div className="flex flex-col group cursor-pointer" onClick={() => onNavigate(product)}>
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-surface-container-low">
        <img src={product.image} alt={product.name} referrerPolicy="no-referrer" className="w-full h-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-105" />
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
          className="absolute top-2.5 right-2.5 w-8 h-8 flex items-center justify-center bg-white/70 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition"
        >
          <Heart size={16} className={isWishlisted ? "fill-primary text-primary" : "text-on-surface-variant"} />
        </button>
        {product.isNew && (
          <div className="absolute top-2.5 left-2.5">
            <span className="bg-primary text-white text-[9px] font-semibold px-2 py-[2px] rounded-full uppercase tracking-wide">New</span>
          </div>
        )}
      </div>
      <div className="mt-3 px-0.5 space-y-0.5">
        <h3 className="text-sm font-medium leading-tight line-clamp-2">{product.name}</h3>
        <p className="text-[11px] text-on-surface-variant">{product.category}</p>
        <div className="pt-0.5">
          <span className="text-base font-semibold tracking-tight">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
