import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, Search, ShoppingBag, Heart, Home, User, ArrowRight, ArrowLeft, Plus, Minus, Trash2, Star, AirVent, ChevronsUpDown, Leaf, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { PRODUCTS } from './constants';
import { Product, CartItem, View } from './types';

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================
// The App component manages the global state (cart, wishlist, current view)
// and handles the routing between different views (Home, Shop, Product, Cart).
export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]);
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    window.scrollTo(0, 0);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.082;
  const total = subtotal + tax;

  const headerTextColor = !isScrolled && currentView === 'home' ? 'text-white' : 'text-primary';

  return (
    <div className="min-h-screen bg-background text-on-surface">
      {/* ==================== TOP NAVIGATION BAR ==================== */}
      {/* Sticky header containing the logo, menu, search, and cart icon */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-surface/80 backdrop-blur-md border-b border-outline-variant/10' : 'bg-transparent border-transparent'}`}>
        <div className="flex justify-between items-center px-6 h-16 max-w-7xl mx-auto relative">
          <button 
            className={`${headerTextColor} hover:opacity-80 transition-opacity`}
            onClick={() => currentView === 'product' ? setCurrentView('shop') : null}
          >
            {currentView === 'product' ? <ArrowLeft size={24} /> : <Search size={24} />}
          </button>
          
          {/* Centered logo and title using absolute positioning to ensure it's perfectly centered regardless of side icon widths */}
          <h1 
            className={`absolute left-1/2 -translate-x-1/2 text-2xl font-headline font-bold tracking-[0.2em] ${headerTextColor} cursor-pointer transition-colors flex items-center gap-2`}
            onClick={() => setCurrentView('home')}
          >
            {/* Logo image, scaled down to h-5 per user request */}
            <img src={!isScrolled && currentView === 'home' ? "/logo.png" : "/logo_colored.png"} alt="TSEDEY Logo" className="h-5 w-auto" />
            TSEDEY
          </h1>
          
          <div className="flex items-center gap-4">
            <button 
              className={`${headerTextColor} hover:opacity-80 transition-opacity relative`}
              onClick={() => setCurrentView('cart')}
            >
              <ShoppingBag size={24} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cart.reduce((s, i) => s + i.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ==================== MAIN CONTENT AREA ==================== */}
      {/* Handles transitions between different views based on state */}
      <main className={`pb-24 ${currentView === 'home' ? '' : 'pt-16'}`}>
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <HomeView key="home" onNavigate={navigateToProduct} />
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
      </main>

      {/* ==================== BOTTOM NAVIGATION BAR ==================== */}
      {/* Fixed bottom bar for mobile-friendly primary navigation */}
      <nav className="fixed bottom-0 left-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-t border-outline-variant/10 rounded-t-[2rem] shadow-lg">
        <div className="flex justify-around items-center px-4 pb-6 pt-3 max-w-md mx-auto">
          <NavItem 
            icon={<Home size={24} />} 
            label="Home" 
            active={currentView === 'home'} 
            onClick={() => setCurrentView('home')} 
          />
          <NavItem 
            icon={<ShoppingBag size={24} />} 
            label="Shop" 
            active={currentView === 'shop' || currentView === 'product'} 
            onClick={() => setCurrentView('shop')} 
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
    </div>
  );
}

// ============================================================================
// BOTTOM NAVIGATION ITEM COMPONENT
// ============================================================================
// Renders individual buttons in the bottom navigation bar.
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

// ============================================================================
// HOME VIEW COMPONENT
// ============================================================================
// The landing page of the application featuring the hero section, trending
// categories, and featured collection.
function HomeView({ onNavigate }: { onNavigate: (p: Product) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col"
    >
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full overflow-hidden">
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
        <div className="absolute bottom-12 left-0 right-0 px-6 flex flex-col items-start gap-4 z-10">
          <div className="flex flex-col gap-1 max-w-xl">
            <h1 className="text-4xl md:text-5xl font-headline font-bold text-white leading-[1.1] tracking-tight">
              Designed for movement.
            </h1>
            <p className="text-lg md:text-xl font-headline font-medium text-white/90">
              Styled for everyday life.
            </p>
          </div>
          <button className="mt-4 bg-[#b7d854] text-black px-8 py-4 rounded-full font-headline font-bold uppercase tracking-widest text-xs shadow-xl hover:opacity-95 transition-all active:scale-95">
            Shop Now
          </button>
        </div>
      </section>

      {/* Trending Categories */}
      <section className="mt-8 px-6">
        <div className="flex items-baseline justify-between mb-8">
          <h3 className="text-2xl font-headline font-bold">Trending Now</h3>
          <button className="text-xs font-bold uppercase tracking-widest text-primary">View All</button>
        </div>
        <div className="flex overflow-x-auto hide-scrollbar gap-6 snap-x snap-mandatory">
          <CategoryCard 
            title="Sleek" 
            image="/Trending1.jpg" 
          />
          <CategoryCard 
            title="Running" 
            image="/Trending2.jpg" 
          />
          <CategoryCard 
            title="Gym" 
            image="/Trending3.jpg" 
          />
        </div>
      </section>

      {/* Mission Section */}
      {/* <section className="mt-20 mx-6 py-16 bg-surface-container-low rounded-[3rem] text-center px-8">
        <Leaf className="mx-auto text-primary mb-6" size={48} />
        <h3 className="text-3xl font-headline font-bold mb-6">Built by women, for the movement.</h3>
        <p className="text-on-surface-variant font-light text-lg leading-relaxed mb-8">
          At Tsedey, we believe movement is the ultimate expression of self. Our mission is to engineer garments that don't just perform, but inspire the resilience within every woman.
        </p>
        <div className="flex justify-center gap-4">
          <div className="w-12 h-0.5 bg-outline-variant" />
          <div className="w-12 h-0.5 bg-primary" />
          <div className="w-12 h-0.5 bg-outline-variant" />
        </div>
      </section> */}

      {/* Featured Collection */}
      <section className="mt-20 px-6 pb-12">
        <h3 className="text-2xl font-headline font-bold mb-8">Featured Elements</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 relative aspect-[4/5] rounded-2xl overflow-hidden shadow-lg group cursor-pointer" onClick={() => onNavigate(PRODUCTS[0])}>
            <img src="/Featured1.jpg" alt="Premium Drop" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-secondary-container mb-2 block">Premium Drop</span>
              <h4 className="text-white text-xl font-bold">{PRODUCTS[0].name}</h4>
              <div className="flex items-center justify-between mt-2">
                <span className="text-white font-medium">${PRODUCTS[0].price.toFixed(2)}</span>
                <span className="bg-primary text-white text-[10px] px-3 py-1 rounded-full uppercase font-bold tracking-widest">New</span>
              </div>
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md group cursor-pointer" onClick={() => onNavigate(PRODUCTS[1])}>
            <img src="/Featured2.jpg" alt="Featured Style" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10">
              <h5 className="text-white text-sm font-bold truncate">{PRODUCTS[1].name}</h5>
              <p className="text-white/90 text-xs mt-1 font-medium">${PRODUCTS[1].price.toFixed(2)}</p>
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-md group cursor-pointer" onClick={() => onNavigate(PRODUCTS[4])}>
            <img src="/Featured3.jpg" alt="Featured Style" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10">
              <h5 className="text-white text-sm font-bold truncate">{PRODUCTS[4].name}</h5>
              <p className="text-white/90 text-xs mt-1 font-medium">${PRODUCTS[4].price.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

// ============================================================================
// CATEGORY CARD COMPONENT
// ============================================================================
// Displays a single category (e.g., Yoga, Running) in the trending section.
function CategoryCard({ title, image }: { title: string, image: string }) {
  return (
    <div className="flex-shrink-0 snap-center w-64 h-80 rounded-2xl overflow-hidden relative group">
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
      <div className="absolute bottom-6 left-6">
        <h4 className="text-white text-xl font-headline font-bold">{title}</h4>
        <div className="h-1 w-8 bg-white mt-2 rounded-full" />
      </div>
    </div>
  );
}

// ============================================================================
// SHOP VIEW COMPONENT
// ============================================================================
// Displays the product catalog with filtering options and a grid of products.
function ShopView({ onNavigate, wishlist, onToggleWishlist }: { onNavigate: (p: Product) => void, wishlist: string[], onToggleWishlist: (id: string) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-6"
    >
      <header className="mt-8 mb-4">
        <span className="text-xs uppercase tracking-[0.2em] text-on-surface-variant font-bold">Our Collection</span>
        <h3 className="text-4xl font-headline font-bold text-primary leading-tight mt-2">Movement <br/>Redefined</h3>
      </header>

      {/* Filters */}
     <div className="sticky top-16 z-40 bg-background/80 backdrop-blur-md border-b border-border -mx-6 px-6 py-3 mb-6 flex items-center gap-3 overflow-x-auto hide-scrollbar">

  {/* Activity */}
  <div className="flex items-center gap-2 flex-shrink-0">
    <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">
      Activity
    </span>

    <div className="flex gap-2">
      <button className="px-3 h-7 bg-primary text-white rounded-full text-xs font-medium shadow-sm">
        Yoga
      </button>

      <button className="px-3 h-7 border border-border text-on-surface-variant rounded-full text-xs font-medium hover:bg-surface-container-highest transition">
        Training
      </button>
    </div>
  </div>

  {/* Divider */}
  <div className="h-5 w-px bg-border flex-shrink-0" />

  {/* Size */}
  <div className="flex items-center gap-2 flex-shrink-0">
    <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">
      Size
    </span>

    <button className="flex items-center gap-1 px-3 h-7 rounded-full border border-border text-xs font-medium hover:bg-surface-container-highest transition">
      All Sizes
      <ChevronDown size={14} />
    </button>
  </div>

  {/* Spacer */}
  <div className="flex-1" />

  {/* Global Filter */}
  <button className="flex-shrink-0 h-9 px-4 flex items-center gap-2 bg-secondary-container text-on-secondary-container rounded-full text-xs font-semibold shadow-sm hover:opacity-90 transition">
    <SlidersHorizontal size={16} />
    Filters
  </button>
</div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-10">
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

// ============================================================================
// PRODUCT CARD COMPONENT
// ============================================================================
// Represents a single product in the shop grid, including image, price, and wishlist toggle.
function ProductCard({
  product,
  onNavigate,
  isWishlisted,
  onToggleWishlist
}: {
  product: Product
  onNavigate: (p: Product) => void
  isWishlisted: boolean
  onToggleWishlist: (id: string) => void
}) {
  return (
    <div
      className="flex flex-col group cursor-pointer"
      onClick={() => onNavigate(product)}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-surface-container-low">
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-top transition-transform duration-300 ease-out group-hover:scale-105"
        />

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onToggleWishlist(product.id)
          }}
          className="absolute top-2.5 right-2.5 w-8 h-8 flex items-center justify-center 
                     bg-white/70 backdrop-blur-sm rounded-full 
                     opacity-0 group-hover:opacity-100 transition"
        >
          <Heart
            size={16}
            className={
              isWishlisted
                ? "fill-primary text-primary"
                : "text-on-surface-variant"
            }
          />
        </button>

        {/* Badge */}
        {product.isNew && (
          <div className="absolute top-2.5 left-2.5">
            <span className="bg-primary text-white text-[9px] font-semibold px-2 py-[2px] rounded-full uppercase tracking-wide">
              New
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-2 px-0.5 space-y-0.5">
        <h3 className="text-sm font-medium leading-tight line-clamp-2">
          {product.name}
        </h3>

        <p className="text-[11px] text-on-surface-variant">
          {product.category}
        </p>

        <div className="pt-0.5">
          <span className="text-base font-semibold tracking-tight">
            ${product.price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  )
}

// ============================================================================
// PRODUCT DETAIL VIEW COMPONENT
// ============================================================================
// Shows detailed information about a selected product, including an image gallery,
// size/color selectors, and the "Add to Cart" button.
function ProductDetailView({ product, onAddToCart, onBack }: { product: Product, onAddToCart: (p: Product) => void, onBack: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="pb-12"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Images */}
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

          {/* Details */}
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

            <p className="text-on-surface-variant leading-relaxed mb-10">
              {product.description}
            </p>

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
                  <button 
                    key={s}
                    className={`h-12 rounded-lg flex items-center justify-center font-bold transition-all ${s === product.size ? 'border-2 border-primary bg-primary/5 text-primary' : 'border border-outline-variant hover:border-primary'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => onAddToCart(product)}
              className="w-full h-16 bg-gradient-to-br from-primary to-primary-container text-white rounded-full font-bold text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <ShoppingBag size={20} />
              Add to Cart
            </button>
            <p className="text-center mt-6 text-xs text-on-surface-variant">Free shipping on orders over $150. 30-day easy returns.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// FEATURE CHIP COMPONENT
// ============================================================================
// A small pill-shaped badge used to highlight product features (e.g., "Moisture-Wicking").
function FeatureChip({
  icon,
  label,
  active = false
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
}) {
  return (
    <button
      className={`
        flex items-center gap-1.5 px-3 h-7 rounded-full text-xs font-medium
        transition-all duration-150
        ${active
          ? "bg-primary text-white shadow-sm"
          : "border border-border text-on-surface-variant hover:bg-surface-container-highest"
        }
      `}
    >
      <span className="flex items-center justify-center w-3.5 h-3.5">
        {icon}
      </span>
      {label}
    </button>
  );
}

// ============================================================================
// CART VIEW COMPONENT
// ============================================================================
// Displays the user's shopping bag, allowing them to update quantities, remove items,
// and proceed to checkout.
function CartView({ cart, onUpdateQty, onRemove, subtotal, tax, total }: { cart: CartItem[], onUpdateQty: (id: string, d: number) => void, onRemove: (id: string) => void, subtotal: number, tax: number, total: number }) {
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
                    <span className="text-lg font-bold text-primary">${item.price.toFixed(2)}</span>
                  </div>
                  <div className="mt-6 flex justify-between items-center">
                    <div className="flex items-center bg-surface-container rounded-full px-2 py-1">
                      <button 
                        onClick={() => onUpdateQty(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQty(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-on-surface-variant/40 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

       <div className="lg:col-span-4">
  <div className="sticky top-24">
    
    <div className="bg-surface-container-low rounded-[2rem] p-6 shadow-xl border border-outline-variant/20">
      
      {/* Header */}
      <h2 className="text-xl font-semibold tracking-tight mb-6 text-on-surface">
        Order Summary
      </h2>

      {/* Breakdown */}
      <div className="space-y-5 mb-6">
        
        <div className="flex justify-between text-sm text-on-surface-variant">
          <span>Subtotal</span>
          <span className="font-semibold text-on-surface">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-sm text-on-surface-variant">
          <span>Shipping</span>
          <span className="font-semibold text-green-700">
            Free
          </span>
        </div>

        <div className="flex justify-between text-sm text-on-surface-variant">
          <span>Tax</span>
          <span className="font-semibold text-on-surface">
            ${tax.toFixed(2)}
          </span>
        </div>

      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-outline-variant/40 to-transparent mb-6" />

      {/* Total */}
      <div className="flex justify-between items-end mb-8">
        <span className="text-base text-on-surface-variant">
          Total
        </span>
        <span className="text-4xl font-bold tracking-tight text-primary">
          ${total.toFixed(2)}
        </span>
      </div>

      {/* CTA */}
      <button className="w-full h-14 rounded-full bg-primary text-white font-semibold text-base 
        shadow-lg shadow-primary/20 
        hover:scale-[1.02] active:scale-[0.98] 
        transition-all duration-200 
        flex items-center justify-center gap-2">
        
        Checkout
        <ArrowRight size={18} />
      </button>

      {/* Trust Indicator */}
      <div className="mt-6 flex items-center justify-center gap-2 text-on-surface-variant/50">
        <div className="w-4 h-4 rounded-full border border-current flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-current rounded-full" />
        </div>
        <span className="text-[10px] tracking-widest uppercase">
          Secure checkout
        </span>
      </div>

    </div>

  </div>
</div>
      </div>
    </motion.div>
  );
}
