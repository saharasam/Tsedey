import React from 'react';
import { motion } from 'motion/react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

interface HomeViewProps {
  onNavigate: (product: Product) => void;
  onShop: () => void;
}

export function HomeView({ onNavigate, onShop }: HomeViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col"
    >
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] lg:h-screen w-full overflow-hidden">
        <img 
          src="/hero.png" 
          onError={(e) => {
            e.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuBt-NNDAsy-TMJKrH3qGdlHomHDJiRaZbsdC_y1VEjqu1Ahb2GArOGX7isJgkqvig4Zgdf5w859aI7o20I9tSKb62VqxmfJ_n7l-4LF8KdThX-c6LriWRde-HJ6PLO0QFWypvpsTIm89Hk0u1fyue8lWrqJg4bGv6Cywtdvh7yCQcJJCmUheIAiAtbhcBuBvDBE0zoVFEvB1cilCZ6p4wotFtLxrGM-a2KnvbTBMAuZxbdYwVgPyoLjV1idb_guqST305arV2U7yRU";
          }}
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-30 bg-gradient-to-t from-background via-background/30 to-transparent pointer-events-none" />

        {/* Hero text — left on mobile, centered on desktop */}
        <div className="absolute bottom-12 lg:bottom-0 lg:inset-0 left-0 right-0 px-6 flex flex-col items-start lg:items-center lg:justify-center gap-4 z-10 max-w-7xl mx-auto lg:text-center">
          <div className="flex flex-col gap-2 max-w-2xl lg:items-center">
            {/* <span className="text-[10px] uppercase tracking-[0.3em] text-white/70 font-semibold">New Collection 2025</span> */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-headline font-bold text-white leading-[1.05] tracking-tight">
              Designed for movement.
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl font-headline font-medium text-white/80">
              Styled for everyday life.
            </p>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <button 
              className="bg-[#b7d854] text-black px-8 py-4 rounded-full font-headline font-bold uppercase tracking-widest text-xs shadow-xl hover:opacity-95 transition-all active:scale-95"
              onClick={onShop}
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* ── Trending Categories ──────────────────────────────────────────── */}
      <section className="mt-12 lg:mt-20 px-6 max-w-7xl mx-auto w-full">
        <div className="flex items-baseline justify-between mb-8">
          <h3 className="text-2xl lg:text-3xl font-headline font-bold">Trending Now</h3>
          <button className="text-xs font-bold uppercase tracking-widest text-primary">View All</button>
        </div>
        {/* Mobile: horizontal scroll | Desktop: 3-column grid */}
        <div className="flex overflow-x-auto hide-scrollbar gap-6 snap-x snap-mandatory lg:overflow-visible lg:grid lg:grid-cols-3 lg:gap-6 lg:snap-none">
          <CategoryCard title="Sleek" image="/Trending1.jpg" />
          <CategoryCard title="Running" image="/Trending2.jpg" />
          <CategoryCard title="Gym" image="/Trending3.jpg" />
        </div>
      </section>

      {/* ── Featured Collection ──────────────────────────────────────────── */}
      <section className="mt-16 lg:mt-24 px-6 pb-12 max-w-7xl mx-auto w-full">
        <h3 className="text-2xl lg:text-3xl font-headline font-bold mb-8">Featured Elements</h3>

        {/* Mobile: stacked 2-col | Desktop: 3-col balanced grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Large hero card — spans 2 cols on mobile, 1 col on desktop */}
          <div className="col-span-2 lg:col-span-1 lg:row-span-1 relative aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-lg group cursor-pointer" onClick={() => onNavigate(PRODUCTS[0])}>
            <img src="/Featured1.jpg" alt="Premium Drop" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-secondary-container mb-2 block">Premium Drop</span>
              <h4 className="text-white text-xl font-bold">{PRODUCTS[0].name}</h4>
              <div className="flex items-center justify-between mt-2">
                <span className="text-white font-medium">ETB {PRODUCTS[0].price.toFixed(2)}</span>
                <span className="bg-primary text-white text-[10px] px-3 py-1 rounded-full uppercase font-bold tracking-widest">New</span>
              </div>
            </div>
          </div>

          <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-md group cursor-pointer" onClick={() => onNavigate(PRODUCTS[1])}>
            <img src="/Featured2.jpg" alt="Featured Style" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10">
              <h5 className="text-white text-sm font-bold truncate">{PRODUCTS[1].name}</h5>
              <p className="text-white/90 text-xs mt-1 font-medium">ETB {PRODUCTS[1].price.toFixed(2)}</p>
            </div>
          </div>

          <div className="relative aspect-[4/5] lg:aspect-[3/4] rounded-2xl overflow-hidden shadow-md group cursor-pointer" onClick={() => onNavigate(PRODUCTS[4])}>
            <img src="/Featured3.jpg" alt="Featured Style" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10">
              <h5 className="text-white text-sm font-bold truncate">{PRODUCTS[4].name}</h5>
              <p className="text-white/90 text-xs mt-1 font-medium">ETB {PRODUCTS[4].price.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

const CategoryCard: React.FC<{ title: string, image: string }> = ({ title, image }) => {
  return (
    <div className="flex-shrink-0 snap-center lg:flex-shrink w-64 lg:w-auto h-80 lg:h-96 rounded-2xl overflow-hidden relative group">
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors" />
      <div className="absolute bottom-6 left-6">
        <h4 className="text-white text-xl font-headline font-bold">{title}</h4>
        <div className="h-1 w-8 bg-white mt-2 rounded-full" />
      </div>
    </div>
  );
}
