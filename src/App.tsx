import { useState, useEffect, useMemo, useCallback, Suspense, lazy } from 'react';
import { AnimatePresence } from 'motion/react';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { Product, CartItem, View } from './types';

// Lazy load views for performance optimization
const HomeView = lazy(() => import('./views/HomeView').then(m => ({ default: m.HomeView })));
const ShopView = lazy(() => import('./views/ShopView').then(m => ({ default: m.ShopView })));
const ProductDetailView = lazy(() => import('./views/ProductDetailView').then(m => ({ default: m.ProductDetailView })));
const CartView = lazy(() => import('./views/CartView').then(m => ({ default: m.CartView })));

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Initialize state from localStorage if available
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('tsedey-cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('tsedey-wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [isScrolled, setIsScrolled] = useState(false);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('tsedey-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('tsedey-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Optimized handlers using useCallback
  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  }, []);

  const navigateToProduct = useCallback((product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    window.scrollTo(0, 0);
  }, []);

  const handleNavigate = useCallback((view: View) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  }, []);

  // Optimized calculations using useMemo
  const { subtotal, tax, total, cartCount } = useMemo(() => {
    const sub = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const t = sub * 0.082;
    return {
      subtotal: sub,
      tax: t,
      total: sub + t,
      cartCount: cart.reduce((s, i) => s + i.quantity, 0)
    };
  }, [cart]);

  return (
    <div className="min-h-screen bg-background text-on-surface">
      <Header 
        isScrolled={isScrolled} 
        currentView={currentView} 
        cartCount={cartCount}
        onNavigate={handleNavigate}
        onBack={() => setCurrentView('shop')}
      />

      <main className={`pb-24 lg:pb-0 ${currentView === 'home' ? '' : 'pt-16'}`}>
        <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
          <AnimatePresence mode="wait">
            {currentView === 'home' && (
              <HomeView key="home" onNavigate={navigateToProduct} onShop={() => handleNavigate('shop')} />
            )}
            {currentView === 'shop' && (
              <ShopView key="shop" onNavigate={navigateToProduct} wishlist={wishlist} onToggleWishlist={toggleWishlist} />
            )}
            {currentView === 'product' && selectedProduct && (
              <ProductDetailView 
                key="product" 
                product={selectedProduct} 
                onAddToCart={addToCart} 
                onBack={() => setCurrentView('shop')}
              />
            )}
            {currentView === 'cart' && (
              <CartView 
                key="cart" 
                cart={cart} 
                onUpdateQty={updateQuantity} 
                onRemove={removeFromCart}
                subtotal={subtotal}
                tax={tax}
                total={total}
              />
            )}
          </AnimatePresence>
        </Suspense>
      </main>

      <BottomNav currentView={currentView} onNavigate={handleNavigate} />
    </div>
  );
}
