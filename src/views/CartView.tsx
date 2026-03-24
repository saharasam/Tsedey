import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartViewProps {
  cart: CartItem[];
  onUpdateQty: (id: string, d: number) => void;
  onRemove: (id: string) => void;
  subtotal: number;
  tax: number;
  total: number;
}

export function CartView({ cart, onUpdateQty, onRemove, subtotal, tax, total }: CartViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="px-6 max-w-5xl mx-auto"
    >
      <header className="mb-10">
        <h2 className="text-4xl font-headline font-bold text-primary tracking-tight mb-2 uppercase">Your Bag</h2>
        <p className="text-on-surface-variant font-bold">{cart.length} Items selected for performance</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-6">
          {cart.length === 0 ? (
            <div className="py-20 text-center bg-surface-container-low rounded-3xl">
              <ShoppingBag size={48} className="mx-auto text-on-surface-variant/20 mb-4" />
              <p className="text-on-surface-variant">Your bag is empty.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="bg-surface-container-lowest rounded-2xl p-4 flex gap-6 items-center shadow-sm">
                <div className="w-24 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold">{item.name}</h3>
                      <p className="text-on-surface-variant text-sm font-medium">{item.color} / {item.size}</p>
                    </div>
                    <span className="text-lg font-bold text-primary">ETB {item.price.toFixed(2)}</span>
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <div className="flex items-center bg-surface-container rounded-full px-2 py-1">
                      <button onClick={() => onUpdateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"><Minus size={16} /></button>
                      <span className="px-4 font-bold">{item.quantity}</span>
                      <button onClick={() => onUpdateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"><Plus size={16} /></button>
                    </div>
                    <button onClick={() => onRemove(item.id)} className="text-on-surface-variant/40 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <div className="bg-surface-container-low rounded-[2rem] p-6 shadow-xl border border-outline-variant/20">
              <h2 className="text-xl font-semibold tracking-tight mb-6 text-on-surface">Order Summary</h2>
              <div className="space-y-5 mb-6">
                <div className="flex justify-between text-sm text-on-surface-variant"><span>Subtotal</span><span className="font-semibold text-on-surface">ETB {subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-sm text-on-surface-variant"><span>Shipping</span><span className="font-semibold text-green-700">Free</span></div>
                <div className="flex justify-between text-sm text-on-surface-variant"><span>Tax</span><span className="font-semibold text-on-surface">ETB {tax.toFixed(2)}</span></div>
              </div>
              <div className="h-px bg-gradient-to-r from-transparent via-outline-variant/40 to-transparent mb-6" />
              <div className="flex justify-between items-end mb-8"><span className="text-base text-on-surface-variant">Total</span><span className="text-4xl font-bold tracking-tight text-primary">ETB {total.toFixed(2)}</span></div>
              <button className="w-full h-14 rounded-full bg-primary text-white font-semibold text-base shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2">
                Checkout <ArrowRight size={18} />
              </button>
              <div className="mt-6 flex items-center justify-center gap-2 text-on-surface-variant/50">
                <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center"><div className="w-1.5 h-1.5 bg-current rounded-full" /></div>
                <span className="text-[10px] tracking-widest uppercase">Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
