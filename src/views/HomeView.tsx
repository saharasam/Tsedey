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
        <picture className="absolute inset-0 w-400 h-230">
          <source media="(min-width: 1024px)" srcSet="/hero.png" />
          <img 
            src="/hero_mobile.png" 
            onError={(e) => {
              e.currentTarget.src = "https://lh3.googleusercontent.com/aida-public/AB6AXuBt-NNDAsy-TMJKrH3qGdlHomHDJiRaZbsdC_y1VEjqu1Ahb2GArOGX7isJgkqvig4Zgdf5w859aI7o20I9tSKb62VqxmfJ_n7l-4LF8KdThX-c6LriWRde-HJ6PLO0QFWypvpsTIm89Hk0u1fyue8lWrqJg4bGv6Cywtdvh7yCQcJJCmUheIAiAtbhcBuBvDBE0zoVFEvB1cilCZ6p4wotFtLxrGM-a2KnvbTBMAuZxbdYwVgPyoLjV1idb_guqST305arV2U7yRU";
            }}
            alt="Hero" 
            className="absolute inset-0 w-full h-full object-cover object-center lg:object" 
            referrerPolicy="no-referrer"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-15 bg-gradient-to-t from-background via-background/10 to-transparent pointer-events-none" />

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
      {/* ── Featured Elements ──────────────────────────────────────────── */}
      <section className="mt-16 lg:mt-24 px-6 pb-16 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="max-w-xl">
            <h3 className="text-3xl lg:text-4xl font-headline font-bold tracking-tight mb-2">Featured Elements</h3>
            <p className="text-muted-foreground font-medium">Curated pieces from our latest high-performance drop.</p>
          </div>
          <button className="hidden md:block text-xs font-bold uppercase tracking-[0.2em] px-6 py-3 border border-primary/20 rounded-full hover:bg-primary/5 transition-colors">
            View Collection
          </button>
        </div>

        {/* Bento Grid: 3-Card Balanced Layout */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {[
            { 
              product: PRODUCTS[0], 
              image: "/Featured1.jpg", 
              isHero: true,
              gridClass: "col-span-2 lg:col-span-2 lg:row-span-2",
              aspectClass: "aspect-[4/5] lg:aspect-square",
              // Tweak these parameters to adjust framing and text
              objectPosition: "center 10%", 
              textY: "bottom-8" 
            },
            { 
              product: PRODUCTS[1], 
              image: "/Featured2.jpg", 
              isHero: false,
              gridClass: "col-span-1 lg:col-span-2 lg:row-span-1",
              aspectClass: "aspect-square lg:aspect-auto lg:h-full",
              // Tweak these parameters to adjust framing and text
              objectPosition: "center 20%", 
              textY: "bottom-8" 
            },
            { 
              product: PRODUCTS[4], 
              image: "/Featured3.jpg", 
              isHero: false,
              gridClass: "col-span-1 lg:col-span-2 lg:row-span-1",
              aspectClass: "aspect-square lg:aspect-auto lg:h-full",
              // Tweak these parameters to adjust framing and text
              objectPosition: "center 15%", 
              textY: "top-8" 
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              className={`${item.gridClass} relative ${item.aspectClass} group cursor-pointer overflow-hidden rounded-3xl bg-secondary/10 ${item.isHero ? 'shadow-xl' : ''}`}
              onClick={() => onNavigate(item.product)}
            >
              <img 
                src={item.image} 
                alt={item.product.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out lg:group-hover:scale-105" 
                style={{ objectPosition: item.objectPosition }}
                referrerPolicy="no-referrer" 
              />
              
              {item.isHero ? (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 lg:group-hover:opacity-100 transition-opacity" />
                  <div className={`absolute left-0 right-0 p-6 lg:p-8 z-10 lg:translate-y-2 lg:group-hover:translate-y-0 transition-transform duration-500 ${item.textY.includes('top') ? 'top-0' : 'bottom-0'}`}>
                    <span className="inline-block px-3 py-1 rounded-full bg-[#b7d854] text-black text-[10px] font-bold uppercase tracking-widest mb-3 lg:mb-4">
                      Premium Drop
                    </span>
                    <h4 className="text-white text-2xl lg:text-3xl font-headline font-bold mb-2 leading-tight">
                      {item.product.name}
                    </h4>
                    <p className="hidden lg:block text-white/70 text-sm mb-6 max-w-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      Performance-driven design meets effortless urban style.
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-white text-lg lg:text-xl font-bold">ETB {item.product.price.toFixed(2)}</span>
                      <span className="h-px flex-1 bg-white/20" />
                      <span className="text-white/80 text-[10px] lg:text-xs font-bold uppercase tracking-widest">Shop &rarr;</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="absolute inset-0 bg-black/20 lg:group-hover:bg-black/40 transition-colors duration-500" />
                  <div className={`absolute inset-x-3 lg:inset-x-6 p-3 lg:p-5 backdrop-blur-md bg-white/10 rounded-2xl border border-white/20 lg:translate-y-4 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 transition-all duration-500 ${item.textY.includes('top') ? 'top-3 lg:top-8' : 'bottom-3 lg:bottom-8'}`}>
                    <h5 className="text-white text-xs lg:text-base font-bold truncate">{item.product.name}</h5>
                    <p className="text-white/90 text-[10px] lg:text-sm mt-1 font-medium">ETB {item.product.price.toFixed(2)}</p>
                  </div>
                </>
              )}
            </div>
          ))}
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
