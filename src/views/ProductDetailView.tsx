import React from 'react';
import { motion } from 'motion/react';
import { Star, AirVent, ChevronsUpDown, Leaf, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailViewProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  onBack: () => void;
}

export function ProductDetailView({ product, onAddToCart, onBack }: ProductDetailViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pb-12"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 grid grid-cols-6 gap-4">
            <div className="col-span-6 rounded-2xl overflow-hidden bg-surface-container aspect-[4/5]">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
            </div>
            <div className="col-span-2 rounded-xl overflow-hidden bg-surface-container aspect-square">
              <img src={product.image} alt="detail" className="w-full h-full object-cover object-top brightness-90" referrerPolicy="no-referrer" />
            </div>
            <div className="col-span-2 rounded-xl overflow-hidden bg-surface-container aspect-square">
              <img src={product.image} alt="detail" className="w-full h-full object-cover object-top scale-150" referrerPolicy="no-referrer" />
            </div>
            <div className="col-span-2 rounded-xl overflow-hidden bg-surface-container aspect-square relative flex items-center justify-center bg-primary/10">
              <span className="font-bold text-primary">+3</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="mb-8">
              <span className="inline-block px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold tracking-widest uppercase mb-4">New Drop</span>
              <h2 className="text-4xl font-headline font-bold tracking-tight mb-2">{product.name}</h2>
              <div className="flex items-baseline gap-4">
                <span className="text-2xl font-headline font-bold text-primary">${product.price.toFixed(2)}</span>
                <div className="flex items-center gap-1 text-secondary">
                  <Star size={14} fill="currentColor" />
                  <span className="text-sm font-medium">{product.rating} ({product.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <p className="text-on-surface-variant leading-relaxed mb-10">{product.description}</p>

            <div className="flex flex-wrap gap-3 mb-10">
              <FeatureChip icon={<AirVent size={16} />} label="Moisture-Wicking" />
              <FeatureChip icon={<ChevronsUpDown size={16} />} label="4-Way Stretch" />
              <FeatureChip icon={<Leaf size={16} />} label="Recycled Fabric" />
            </div>

            <div className="mb-8">
              <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-4">Select Color: <span className="text-on-surface">{product.color}</span></label>
              <div className="flex gap-4">
                <button className="w-10 h-10 rounded-full bg-primary ring-2 ring-offset-4 ring-primary" />
                <button className="w-10 h-10 rounded-full bg-secondary ring-2 ring-offset-2 ring-transparent hover:ring-outline-variant" />
                <button className="w-10 h-10 rounded-full bg-[#f7e02a] ring-2 ring-offset-2 ring-transparent hover:ring-outline-variant" />
              </div>
            </div>

            <div className="mb-10">
              <div className="flex justify-between items-end mb-4">
                <label className="block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Select Size</label>
                <button className="text-xs font-bold underline text-secondary">Size Guide</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {['XS', 'S', 'M', 'L', 'XL'].map(s => (
                  <button key={s} className={`h-12 rounded-lg flex items-center justify-center font-bold transition-all ${s === product.size ? 'border-2 border-primary bg-primary/5 text-primary' : 'border border-outline-variant hover:border-primary'}`}>{s}</button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => onAddToCart(product)}
              className="w-full h-16 bg-gradient-to-br from-primary to-primary-container text-white rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <ShoppingBag size={20} /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const FeatureChip: React.FC<{ icon: React.ReactNode, label: string, active?: boolean }> = ({ icon, label, active = false }) => {
  return (
    <button className={`flex items-center gap-1.5 px-3 h-7 rounded-full text-xs font-medium transition-all duration-150 ${active ? "bg-primary text-white shadow-sm" : "border border-border text-on-surface-variant hover:bg-surface-container-highest"}`}>
      <span className="flex items-center justify-center w-3.5 h-3.5">{icon}</span> {label}
    </button>
  );
}
