/**
 * Vaidhira Herbals - Application State, Router, Cart, Checkout, and Admin Panel Controller
 */

// ----------------------------------------------------
// DEFAULT PRODUCT DATABASE
// ----------------------------------------------------
const DEFAULT_PRODUCTS = [
  {
    id: "p1",
    name: "Amla & Bhringraj Kesh Gold Cleanser",
    category: "Hair Care",
    price: 349,
    originalPrice: 450,
    rating: 4.8,
    reviewsCount: 142,
    image: "assets/shampoo.png",
    badge: "organic",
    stock: 45,
    description: "Restores vitality and natural luster to dry, damaged hair. Rich in Vitamin C from wild organic Amla and cooling Bhringraj, it stimulates follicles and prevents premature hair fall.",
    ingredients: "Amla Extract, Bhringraj Oil, Shikakai, Reetha, Coconut Oil Base, Rosemary Essential Oil, Purified Water.",
    howToUse: "Wet hair thoroughly. Squeeze a coin-sized amount into palms and lather onto scalp. Massage for 2 minutes. Rinse well with cold water."
  },
  {
    id: "p2",
    name: "Tejas Saffron & Turmeric Glow Serum",
    category: "Skin Care",
    price: 599,
    originalPrice: 799,
    rating: 4.9,
    reviewsCount: 88,
    image: "assets/serum.png",
    badge: "sale",
    stock: 22,
    description: "Infused with authentic Kashmiri saffron threads and fresh turmeric extracts. Fades pigmentation, brightens dull skin tone, and provides an intense luxurious glow overnight.",
    ingredients: "Kashmiri Saffron (Kumkumadi), Wild Turmeric Extract, Organic Rosehip Oil, Sandalwood Essential Oil, Sweet Almond Oil, Vitamin E.",
    howToUse: "Apply 3-4 drops onto clean, damp face and neck. Gently press and tap into skin. Use every night before bedtime."
  },
  {
    id: "p3",
    name: "Neem Tulsi Purifying Soap Bar",
    category: "Body Care",
    price: 149,
    originalPrice: 199,
    rating: 4.7,
    reviewsCount: 215,
    image: "assets/soap.png",
    badge: "organic",
    stock: 80,
    description: "A rustic, cold-pressed bathing bar designed to purify and heal the skin. Rich in antibacterial Neem and soothing Holy Basil (Tulsi), it keeps acne and body odor at bay while keeping skin moisturized.",
    ingredients: "Pure Neem Oil, Tulsi Leaves Extract, Tea Tree Essential Oil, Organic Virgin Coconut Oil, Castor Oil, Vegetable Glycerin.",
    howToUse: "Lather soap between wet hands and gently apply to body. Rub in circular motions. Wash off thoroughly."
  },
  {
    id: "p4",
    name: "Aloe Vera & Teatree Soothing Gel",
    category: "Skin Care",
    price: 249,
    originalPrice: 299,
    rating: 4.6,
    reviewsCount: 173,
    image: "assets/serum.png",
    badge: "new",
    stock: 35,
    description: "Multi-purpose hydrating gel sourced from organic aloe vera fields. Enriched with tea tree essential oil, it instantly cools sunburns, heals minor rashes, and acts as a lightweight hydrator.",
    ingredients: "99% Pure Organic Aloe Vera Leaf Juice, Tea Tree Essential Oil, Cucumber Extract, Xanthan Gum, Citric Acid.",
    howToUse: "Apply generously over face, body, or hair scalp. Leave on as a cooling mask, or use as a light daytime moisturizer."
  },
  {
    id: "p5",
    name: "Pure Steam-Distilled Jasmine Oil",
    category: "Aromatherapy",
    price: 449,
    originalPrice: 550,
    rating: 4.9,
    reviewsCount: 64,
    image: "assets/shampoo.png",
    badge: "",
    stock: 12,
    description: "100% pure, steam-distilled essential oil harvested from fresh Jasmine blooms. Renowned for its calming floral aroma, it eases stress, improves sleep, and can be used for luxurious massages.",
    ingredients: "100% Pure Steam-Distilled Jasmine (Jasminum Officinale) Essential Oil.",
    howToUse: "Add 4-6 drops to a water-based diffuser. For body application, dilute with a carrier oil (like Jojoba or Sesame) before massaging."
  },
  {
    id: "p6",
    name: "Tea Tree & Honey Purifying Wash",
    category: "Skin Care",
    price: 299,
    originalPrice: 349,
    rating: 4.5,
    reviewsCount: 110,
    image: "assets/soap.png",
    badge: "",
    stock: 4,
    description: "A gentle face wash designed for oily and acne-prone skin. Pure Tea Tree oil deeply cleanses pores, while raw wild forest Honey locks in natural hydration to prevent post-wash tightness.",
    ingredients: "Tea Tree Extract, Raw Forest Honey, Aloe Vera Gel Base, Salicylic Acid (0.5%), Neem Infusion, Organic Rosemary.",
    howToUse: "Squeeze a pea-sized amount onto wet hands. Lather and massage gently on face. Rinse off and pat dry."
  }
];

// MOCK INITIAL ORDERS
const INITIAL_ORDERS = [
  {
    id: "V-1001",
    date: "2026-05-24",
    customer: {
      name: "Aarav Sharma",
      email: "aarav@gmail.com",
      phone: "9876543211",
      address: "12, Malviya Nagar",
      city: "New Delhi",
      pincode: "110017"
    },
    items: [
      { productId: "p2", quantity: 1, price: 599 },
      { productId: "p3", quantity: 2, price: 149 }
    ],
    subtotal: 897,
    discount: 89.7,
    shipping: 0,
    total: 807.3,
    paymentMethod: "UPI",
    status: "delivered"
  },
  {
    id: "V-1002",
    date: "2026-05-25",
    customer: {
      name: "Priya Patel",
      email: "priya@yahoo.com",
      phone: "9123456789",
      address: "A-404, Shanti Heights",
      city: "Mumbai",
      pincode: "400001"
    },
    items: [
      { productId: "p1", quantity: 1, price: 349 }
    ],
    subtotal: 349,
    discount: 0,
    shipping: 50,
    total: 399,
    paymentMethod: "COD",
    status: "shipped"
  }
];

// ----------------------------------------------------
// STATE MANAGEMENT & LOCAL STORAGE INITIALIZATION
// ----------------------------------------------------
let state = {
  products: JSON.parse(localStorage.getItem("vaidhira_products")) || DEFAULT_PRODUCTS,
  cart: JSON.parse(localStorage.getItem("vaidhira_cart")) || [],
  orders: JSON.parse(localStorage.getItem("vaidhira_orders")) || INITIAL_ORDERS,
  activeView: "home",
  filters: {
    category: "",
    search: "",
    maxPrice: 800,
    sortBy: "default",
    onlyOrganic: false
  },
  couponApplied: null, // Stores coupon code or null
  adminCurrentTab: "dashboard",
  checkoutStep: 1, // 1: Shipping, 2: Payment, 3: Success
  tempOrder: null // Stores checkout order data before submission
};

// Helper function to sync databases
function saveToLocalStorage() {
  localStorage.setItem("vaidhira_products", JSON.stringify(state.products));
  localStorage.setItem("vaidhira_cart", JSON.stringify(state.cart));
  localStorage.setItem("vaidhira_orders", JSON.stringify(state.orders));
  updateCartCounter();
}

// ----------------------------------------------------
// APP INITIALIZATION
// ----------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  // Sync initial setup
  saveToLocalStorage();
  
  // Listen for hash changes for routing
  window.addEventListener("hashchange", handleRouting);
  
  // Set initial route
  handleRouting();

  // Setup Event Listeners for static layouts
  setupStaticListeners();
}

// ----------------------------------------------------
// ROUTING / SPA VIEW SWITCHER
// ----------------------------------------------------
function handleRouting() {
  const hash = window.location.hash || "#home";
  const rawPath = hash.substring(1);
  
  // Parse path (e.g. shop, admin, checkout)
  let view = rawPath;
  if (rawPath.startsWith("shop")) {
    view = "shop";
  }
  
  state.activeView = view;

  // Highlight Nav Links
  document.querySelectorAll("#desktop-nav a").forEach(link => {
    if (link.getAttribute("href") === hash) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // Render Views
  const appContainer = document.getElementById("app");
  if (view === "home") {
    renderHomeView(appContainer);
  } else if (view === "shop") {
    renderShopView(appContainer);
  } else if (view === "checkout") {
    renderCheckoutView(appContainer);
  } else if (view === "admin") {
    renderAdminView(appContainer);
  } else {
    // 404 fallback
    appContainer.innerHTML = `<div class="container" style="text-align: center; padding: 100px 0;">
      <h1 style="font-size: 80px; color: var(--primary);">404</h1>
      <p style="margin-bottom: 24px; color: var(--text-muted);">The botanical trail you are looking for has grown over.</p>
      <a href="#home" class="btn btn-primary">Return to Vaidhira Home</a>
    </div>`;
  }

  // Scroll to top
  window.scrollTo(0, 0);
  
  // Add scroll handler for header sticky shrink
  window.addEventListener("scroll", () => {
    const header = document.getElementById("main-header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// ----------------------------------------------------
// STATIC COMPONENT LISTENERS
// ----------------------------------------------------
function setupStaticListeners() {
  // Cart Drawer open/close
  const cartOverlay = document.getElementById("cart-drawer-overlay");
  const cartTrigger = document.getElementById("header-cart-trigger");
  const closeCartBtn = document.getElementById("close-cart-drawer");
  const checkoutBtn = document.getElementById("drawer-checkout-btn");

  cartTrigger.addEventListener("click", () => {
    renderCartItems();
    cartOverlay.classList.add("open");
  });

  closeCartBtn.addEventListener("click", () => {
    cartOverlay.classList.remove("open");
  });

  cartOverlay.addEventListener("click", (e) => {
    if (e.target === cartOverlay) {
      cartOverlay.classList.remove("open");
    }
  });

  // Drawer coupon button
  document.getElementById("apply-coupon-btn").addEventListener("click", applyCoupon);

  // Drawer checkout button action
  checkoutBtn.addEventListener("click", () => {
    cartOverlay.classList.remove("open");
    if (state.cart.length === 0) {
      alert("Please add items to your cart first!");
      window.location.hash = "#shop";
      return;
    }
    state.checkoutStep = 1;
    window.location.hash = "#checkout";
  });

  // Mobile Menu toggle
  const mobileBtn = document.getElementById("mobile-menu-btn");
  const desktopNav = document.getElementById("desktop-nav");
  mobileBtn.addEventListener("click", () => {
    // Basic mobile nav show/hide
    if (desktopNav.style.display === "block") {
      desktopNav.style.display = "none";
    } else {
      desktopNav.style.display = "block";
      desktopNav.style.position = "absolute";
      desktopNav.style.top = "var(--header-height)";
      desktopNav.style.left = "0";
      desktopNav.style.right = "0";
      desktopNav.style.backgroundColor = "var(--white)";
      desktopNav.style.boxShadow = "var(--glass-shadow)";
      desktopNav.style.padding = "20px";
      desktopNav.style.zIndex = "1002";
      
      const navLinks = desktopNav.querySelectorAll("a");
      navLinks.forEach(link => {
        link.addEventListener("click", () => {
          desktopNav.style.display = "none";
        });
      });
    }
  });

  // Modal close handlers
  document.getElementById("close-detail-modal").addEventListener("click", () => {
    document.getElementById("product-detail-modal-overlay").classList.remove("open");
  });
  
  document.getElementById("close-admin-product-modal").addEventListener("click", () => {
    document.getElementById("admin-product-modal-overlay").classList.remove("open");
  });

  // Admin Custom Image selector display toggling
  const imageSelect = document.getElementById("admin-p-image");
  const customImageInput = document.getElementById("admin-p-image-custom");
  imageSelect.addEventListener("change", () => {
    if (imageSelect.value === "custom") {
      customImageInput.style.display = "block";
      customImageInput.required = true;
    } else {
      customImageInput.style.display = "none";
      customImageInput.required = false;
    }
  });

  // Admin submit product form
  document.getElementById("admin-product-form").addEventListener("submit", handleProductSave);
}

// ----------------------------------------------------
// VIEW RENDERING: HOME VIEW
// ----------------------------------------------------
function renderHomeView(container) {
  // Grab a few featured products (e.g. top 3 rated)
  const featured = [...state.products].sort((a,b) => b.rating - a.rating).slice(0, 3);
  
  container.innerHTML = `
    <!-- Hero Banner -->
    <div class="hero">
      <div class="container hero-grid">
        <div class="hero-content">
          <h1>Experience Pure Ayurvedic Healing with <span>Vaidhira Herbals</span></h1>
          <p>Hand-sourced ingredients, cold-pressed oils, and chemical-free recipes formulation directly from Vedic traditions to bring you radiant skin, strong hair, and aromatic serenity.</p>
          <div class="btn-group">
            <a href="#shop" class="btn btn-primary"><i class="fa-solid fa-seedling" style="margin-right: 8px;"></i> Shop Botanical Collection</a>
            <a href="#shop" class="btn btn-outline" onclick="window.setShopFilter('Aromatherapy')">Explore Essential Oils</a>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-bg-blob"></div>
          <img src="assets/shampoo.png" alt="Vaidhira Botanical Product" class="hero-img">
        </div>
      </div>
    </div>

    <!-- Core Brand Standards -->
    <div class="container" style="margin-bottom: 60px;">
      <div class="hero-features">
        <div class="feature-item">
          <div class="feature-icon"><i class="fa-solid fa-leaf"></i></div>
          <div class="feature-info">
            <h4>100% Organic</h4>
            <p>Direct from Haridwar farms</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon"><i class="fa-solid fa-flask-vial"></i></div>
          <div class="feature-info">
            <h4>No Toxins</h4>
            <p>Paraben & Sulfate free</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon"><i class="fa-solid fa-truck-moving"></i></div>
          <div class="feature-info">
            <h4>Free Shipping</h4>
            <p>On orders above ₹499</p>
          </div>
        </div>
        <div class="feature-item">
          <div class="feature-icon"><i class="fa-solid fa-hand-holding-heart"></i></div>
          <div class="feature-info">
            <h4>100% Vegan</h4>
            <p>Cruelty-free formulations</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Category Showcase Slider Grid -->
    <section class="container">
      <div class="section-header">
        <h2>Botanical Categories</h2>
        <p>Curated solutions for skin wellness, hair strength, and stress relief</p>
      </div>
      <div class="categories-grid">
        <div class="category-card" onclick="window.setShopFilter('Hair Care')">
          <div class="category-icon-wrapper"><i class="fa-solid fa-wind"></i></div>
          <h3>Hair Care</h3>
          <span>Shampoos, Oils, Masks</span>
        </div>
        <div class="category-card" onclick="window.setShopFilter('Skin Care')">
          <div class="category-icon-wrapper"><i class="fa-solid fa-face-smile-beam"></i></div>
          <h3>Skin Care</h3>
          <span>Serums, Gels, Face wash</span>
        </div>
        <div class="category-card" onclick="window.setShopFilter('Body Care')">
          <div class="category-icon-wrapper"><i class="fa-solid fa-spa"></i></div>
          <h3>Body Care</h3>
          <span>Soaps, Cleansers, Scrubs</span>
        </div>
        <div class="category-card" onclick="window.setShopFilter('Aromatherapy')">
          <div class="category-icon-wrapper"><i class="fa-solid fa-fire-burner"></i></div>
          <h3>Aromatherapy</h3>
          <span>Pure Essential Oils</span>
        </div>
      </div>
    </section>

    <!-- Promotional Middle Banner -->
    <div class="container">
      <div class="botanical-promo">
        <div class="botanical-promo-content">
          <h2>Ancient Wisdom. Modern Care.</h2>
          <p>Vaidhira Kesh Gold Hair Cleanser combines real Amla extract and Bhringraj leaf pulp to combat hair loss and damage. Restores hair structure with regular washes.</p>
          <a href="#shop" class="btn btn-primary" style="background-color: var(--accent); color: var(--text-dark);" onclick="window.openProductDetail('p1')">Claim Your Bottle Now</a>
        </div>
      </div>
    </div>

    <!-- Featured Products Showcase -->
    <section class="container">
      <div class="section-header">
        <h2>Highly Recommended</h2>
        <p>Loved by our natural skincare community. Explore the botanical favorites.</p>
      </div>
      <div class="products-grid">
        ${featured.map(product => renderProductCardHTML(product)).join("")}
      </div>
    </section>

    <!-- Customer Reviews Slider Simulation -->
    <section style="background-color: var(--bg-sage); border-radius: var(--radius-xl); padding: 80px 0; margin-top: 40px;">
      <div class="container">
        <div class="section-header">
          <h2>What Organic Lovers Say</h2>
          <p>Real reviews from verified Vaidhira customers</p>
        </div>
        <div class="products-grid" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
          <div class="category-card" style="align-items: flex-start; text-align: left; padding: 30px;">
            <div class="product-rating" style="margin-bottom: 12px;"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
            <p style="font-style: italic; font-size: 14px; margin-bottom: 20px; color: var(--text-muted);">"The Saffron Glow Serum is pure magic. I was highly skeptical but after using it for 2 weeks, my acne blemishes have faded and my skin feels deeply nourished. Best herbal purchase!"</p>
            <h4 style="font-family: var(--font-sans); font-size: 15px; color: var(--primary-dark);">Shalini K. <span style="font-size: 12px; font-weight: 400; color: var(--text-muted); margin-left: 6px;">(Verified Buyer)</span></h4>
          </div>
          <div class="category-card" style="align-items: flex-start; text-align: left; padding: 30px;">
            <div class="product-rating" style="margin-bottom: 12px;"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
            <p style="font-style: italic; font-size: 14px; margin-bottom: 20px; color: var(--text-muted);">"The Neem and Tulsi Soap smells like walking into a botanical garden in the morning. Clears out sweat and oil instantly. Highly recommend replacing synthetic chemical soaps."</p>
            <h4 style="font-family: var(--font-sans); font-size: 15px; color: var(--primary-dark);">Rohan Gupta <span style="font-size: 12px; font-weight: 400; color: var(--text-muted); margin-left: 6px;">(Verified Buyer)</span></h4>
          </div>
        </div>
      </div>
    </section>
  `;
}

// ----------------------------------------------------
// VIEW RENDERING: SHOP VIEW
// ----------------------------------------------------
function renderShopView(container) {
  container.innerHTML = `
    <div class="container">
      <div class="shop-layout">
        <!-- Sidebar filters -->
        <aside class="filters-sidebar">
          <div class="filter-group">
            <h3>Categories</h3>
            <div class="filter-options">
              <label><input type="radio" name="shop-category" value="" ${state.filters.category === "" ? "checked" : ""}> All Products</label>
              <label><input type="radio" name="shop-category" value="Hair Care" ${state.filters.category === "Hair Care" ? "checked" : ""}> Hair Care</label>
              <label><input type="radio" name="shop-category" value="Skin Care" ${state.filters.category === "Skin Care" ? "checked" : ""}> Skin Care</label>
              <label><input type="radio" name="shop-category" value="Body Care" ${state.filters.category === "Body Care" ? "checked" : ""}> Body Care</label>
              <label><input type="radio" name="shop-category" value="Aromatherapy" ${state.filters.category === "Aromatherapy" ? "checked" : ""}> Aromatherapy</label>
            </div>
          </div>

          <div class="filter-group">
            <h3>Max Price (₹)</h3>
            <div class="price-slider-container">
              <input type="range" id="price-range" min="100" max="1000" step="50" value="${state.filters.maxPrice}">
              <div class="price-values">
                <span>₹100</span>
                <span id="price-range-val" style="font-weight: 700; color: var(--primary);">₹${state.filters.maxPrice}</span>
                <span>₹1000</span>
              </div>
            </div>
          </div>

          <div class="filter-group">
            <h3>Product Badges</h3>
            <div class="filter-options">
              <label><input type="checkbox" id="filter-organic" ${state.filters.onlyOrganic ? "checked" : ""}> 100% Organic Only</label>
            </div>
          </div>

          <button class="btn btn-outline" id="clear-filters-btn" style="width: 100%; padding: 8px;">Reset Filters</button>
        </aside>

        <!-- Main Product Listing Content -->
        <div class="shop-content">
          <!-- Toolbar -->
          <div class="shop-toolbar">
            <div class="search-box">
              <i class="fa-solid fa-magnifying-glass"></i>
              <input type="text" id="shop-search-input" value="${state.filters.search}" placeholder="Search herbal shampoo, neem soap..." aria-label="Search herbal products">
            </div>
            
            <div style="display: flex; gap: 16px; align-items: center;">
              <span id="products-count" style="font-size: 14px; color: var(--text-muted);">Showing 0 products</span>
              <select class="sort-select" id="shop-sort-select" aria-label="Sort products grid">
                <option value="default" ${state.filters.sortBy === "default" ? "selected" : ""}>Featured / Default</option>
                <option value="price-low" ${state.filters.sortBy === "price-low" ? "selected" : ""}>Price: Low to High</option>
                <option value="price-high" ${state.filters.sortBy === "price-high" ? "selected" : ""}>Price: High to Low</option>
                <option value="rating" ${state.filters.sortBy === "rating" ? "selected" : ""}>Top Rated Only</option>
              </select>
            </div>
          </div>

          <!-- Product Grid -->
          <div class="products-grid" id="shop-products-grid">
            <!-- Dynamically rendered -->
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach handlers for filters
  const categoryInputs = container.querySelectorAll('input[name="shop-category"]');
  categoryInputs.forEach(input => {
    input.addEventListener("change", (e) => {
      state.filters.category = e.target.value;
      updateShopListing();
    });
  });

  const priceSlider = container.querySelector('#price-range');
  priceSlider.addEventListener("input", (e) => {
    state.filters.maxPrice = parseInt(e.target.value);
    container.querySelector('#price-range-val').innerText = `₹${state.filters.maxPrice}`;
    updateShopListing();
  });

  const organicCheck = container.querySelector('#filter-organic');
  organicCheck.addEventListener("change", (e) => {
    state.filters.onlyOrganic = e.target.checked;
    updateShopListing();
  });

  const searchInput = container.querySelector('#shop-search-input');
  searchInput.addEventListener("input", (e) => {
    state.filters.search = e.target.value;
    updateShopListing();
  });

  const sortSelect = container.querySelector('#shop-sort-select');
  sortSelect.addEventListener("change", (e) => {
    state.filters.sortBy = e.target.value;
    updateShopListing();
  });

  const clearBtn = container.querySelector('#clear-filters-btn');
  clearBtn.addEventListener("click", () => {
    state.filters = {
      category: "",
      search: "",
      maxPrice: 800,
      sortBy: "default",
      onlyOrganic: false
    };
    // Re-render view to clear elements state simply
    renderShopView(container);
  });

  // Initial products render
  updateShopListing();
}

function updateShopListing() {
  const grid = document.getElementById("shop-products-grid");
  if (!grid) return;

  // Apply filters
  let filtered = state.products.filter(product => {
    // Search filter
    if (state.filters.search) {
      const q = state.filters.search.toLowerCase();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchCat = product.category.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat) return false;
    }

    // Category filter
    if (state.filters.category && product.category !== state.filters.category) {
      return false;
    }

    // Price filter
    if (product.price > state.filters.maxPrice) {
      return false;
    }

    // Organic filter
    if (state.filters.onlyOrganic && product.badge !== "organic") {
      return false;
    }

    return true;
  });

  // Sort logic
  if (state.filters.sortBy === "price-low") {
    filtered.sort((a,b) => a.price - b.price);
  } else if (state.filters.sortBy === "price-high") {
    filtered.sort((a,b) => b.price - a.price);
  } else if (state.filters.sortBy === "rating") {
    filtered.sort((a,b) => b.rating - a.rating);
  }

  // Update counter
  document.getElementById("products-count").innerText = `Showing ${filtered.length} products`;

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 0; color: var(--text-muted);">
        <i class="fa-solid fa-magnifying-glass" style="font-size: 50px; color: var(--secondary); margin-bottom: 20px; display: block;"></i>
        <h3>No organic products found</h3>
        <p>Try adjusting your search filters or range slider.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(product => renderProductCardHTML(product)).join("");
}

// ----------------------------------------------------
// SHOP UTILITY TO BRIDGE HEADER / FOOTER CLICKS
// ----------------------------------------------------
window.setShopFilter = function(category) {
  state.filters.category = category;
  window.location.hash = "#shop";
};

// ----------------------------------------------------
// PRODUCT CARD COMPONENT BUILDER HTML
// ----------------------------------------------------
function renderProductCardHTML(product) {
  let badgeHTML = "";
  if (product.badge === "organic") {
    badgeHTML = `<span class="product-badge organic">Organic</span>`;
  } else if (product.badge === "sale") {
    badgeHTML = `<span class="product-badge sale">Sale</span>`;
  } else if (product.badge === "new") {
    badgeHTML = `<span class="product-badge">New</span>`;
  }

  const oldPriceHTML = product.originalPrice ? `<span class="original-price">₹${product.originalPrice}</span>` : "";

  return `
    <div class="product-card" id="card-${product.id}">
      ${badgeHTML}
      <div class="product-card-img-wrapper" onclick="window.openProductDetail('${product.id}')">
        <img src="${product.image}" alt="${product.name}" class="product-card-img" onerror="this.src='https://placehold.co/300x300/e8f5e9/1b4332?text=${encodeURIComponent(product.name)}'">
        <div class="product-card-actions">
          <button class="action-btn" onclick="event.stopPropagation(); window.openProductDetail('${product.id}')" title="Quick View"><i class="fa-solid fa-eye"></i></button>
          <button class="action-btn" onclick="event.stopPropagation(); window.addToCart('${product.id}')" title="Add to Cart"><i class="fa-solid fa-bag-shopping"></i></button>
        </div>
      </div>
      <div class="product-card-body">
        <span class="product-category">${product.category}</span>
        <h3 class="product-title" onclick="window.openProductDetail('${product.id}')">${product.name}</h3>
        <div class="product-rating">
          <i class="fa-solid fa-star"></i>
          <span>${product.rating.toFixed(1)} (${product.reviewsCount})</span>
        </div>
        <div class="product-card-footer">
          <div class="product-price">
            ₹${product.price}
            ${oldPriceHTML}
          </div>
          <button class="add-cart-btn" onclick="window.addToCart('${product.id}')">
            <i class="fa-solid fa-plus"></i> Add
          </button>
        </div>
      </div>
    </div>
  `;
}

// ----------------------------------------------------
// PRODUCT DETAIL MODAL CONTROLLER
// ----------------------------------------------------
window.openProductDetail = function(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const modalGrid = document.getElementById("modal-product-detail-grid");
  const oldPriceHTML = product.originalPrice ? `<span class="original-price">₹${product.originalPrice}</span>` : "";
  
  modalGrid.innerHTML = `
    <div class="detail-img-container">
      <img src="${product.image}" alt="${product.name}" class="detail-main-img" onerror="this.src='https://placehold.co/400x400/e8f5e9/1b4332?text=Natural'">
      <div class="detail-gallery">
        <img src="${product.image}" class="gallery-thumbnail active" alt="thumbnail 1" onerror="this.src='https://placehold.co/400x400/e8f5e9/1b4332?text=Natural'">
        <div class="gallery-thumbnail" style="background-color: var(--bg-sage); display: flex; align-items: center; justify-content: center; font-size: 18px; color: var(--primary);" title="Vaidhira Botanical Guarantee">
          <i class="fa-solid fa-shield-heart"></i>
        </div>
        <div class="gallery-thumbnail" style="background-color: var(--bg-sage); display: flex; align-items: center; justify-content: center; font-size: 18px; color: var(--primary);" title="100% Vegan Certified">
          <i class="fa-solid fa-seedling"></i>
        </div>
      </div>
    </div>

    <div class="detail-info-container">
      <span class="detail-category">${product.category}</span>
      <h2 class="detail-title">${product.name}</h2>
      
      <div class="detail-rating-share">
        <div class="detail-rating">
          <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star-half-stroke"></i>
          <span>${product.rating.toFixed(1)} (${product.reviewsCount} Customer Reviews)</span>
        </div>
      </div>

      <div class="detail-price">
        ₹${product.price}
        ${oldPriceHTML}
      </div>

      <p class="detail-description">${product.description}</p>

      <div class="detail-specs">
        <div class="spec-item"><strong>Availability:</strong> ${product.stock > 0 ? `<span style="color:var(--success); font-weight:700;">In Stock (${product.stock})</span>` : '<span style="color:var(--danger)">Out of Stock</span>'}</div>
        <div class="spec-item"><strong>Origin:</strong> Haridwar, Uttarakhand</div>
        <div class="spec-item"><strong>Formulation:</strong> Pure Ayurvedic</div>
        <div class="spec-item"><strong>Standards:</strong> Sulfate & Paraben Free</div>
      </div>

      <div class="detail-actions">
        <div class="detail-qty-select">
          <button id="modal-qty-minus"><i class="fa-solid fa-minus"></i></button>
          <span id="modal-qty-value">1</span>
          <button id="modal-qty-plus"><i class="fa-solid fa-plus"></i></button>
        </div>
        <button class="detail-add-btn" id="modal-add-to-cart-btn" ${product.stock === 0 ? "disabled" : ""}>
          <i class="fa-solid fa-bag-shopping"></i> Add to Green Bag
        </button>
      </div>

      <!-- Detail Accordion -->
      <div class="detail-accordion">
        <div class="accordion-tab active" id="tab-ingredients">
          <div class="accordion-header" onclick="window.toggleDetailAccordion('tab-ingredients')">
            <span>Ingredients / Composition</span>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <div class="accordion-content">
            <p>${product.ingredients}</p>
          </div>
        </div>

        <div class="accordion-tab" id="tab-usage">
          <div class="accordion-header" onclick="window.toggleDetailAccordion('tab-usage')">
            <span>How to Use</span>
            <i class="fa-solid fa-chevron-down"></i>
          </div>
          <div class="accordion-content">
            <p>${product.howToUse}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Qty selectors
  let selectedQty = 1;
  const qtyValNode = document.getElementById("modal-qty-value");
  document.getElementById("modal-qty-minus").addEventListener("click", () => {
    if (selectedQty > 1) {
      selectedQty--;
      qtyValNode.innerText = selectedQty;
    }
  });
  document.getElementById("modal-qty-plus").addEventListener("click", () => {
    if (selectedQty < product.stock) {
      selectedQty++;
      qtyValNode.innerText = selectedQty;
    }
  });

  // Modal add to cart button
  document.getElementById("modal-add-to-cart-btn").addEventListener("click", () => {
    addToCart(productId, selectedQty);
    document.getElementById("product-detail-modal-overlay").classList.remove("open");
  });

  // Open the overlay modal
  document.getElementById("product-detail-modal-overlay").classList.add("open");
};

window.toggleDetailAccordion = function(tabId) {
  const tabs = document.querySelectorAll(".accordion-tab");
  tabs.forEach(tab => {
    if (tab.id === tabId) {
      tab.classList.toggle("active");
    } else {
      tab.classList.remove("active");
    }
  });
};

// ----------------------------------------------------
// CART SYSTEM CONTROLLERS
// ----------------------------------------------------
window.addToCart = function(productId, qty = 1) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  if (product.stock === 0) {
    alert("Sorry, this natural herb is currently out of stock!");
    return;
  }

  // Check existing cart item
  const cartItem = state.cart.find(item => item.productId === productId);
  if (cartItem) {
    const totalNewQty = cartItem.quantity + qty;
    if (totalNewQty > product.stock) {
      alert(`Only ${product.stock} units available in stockpile!`);
      cartItem.quantity = product.stock;
    } else {
      cartItem.quantity = totalNewQty;
    }
  } else {
    state.cart.push({ productId, quantity: qty });
  }

  saveToLocalStorage();
  renderCartItems();
  
  // Show pop animation on cart count widget
  const cartCountNode = document.getElementById("cart-counter");
  cartCountNode.style.transform = "scale(1.4)";
  setTimeout(() => {
    cartCountNode.style.transform = "scale(1)";
  }, 250);

  // Auto slide-in cart drawer for positive feedback
  document.getElementById("cart-drawer-overlay").classList.add("open");
};

function updateCartCounter() {
  const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cart-counter").innerText = totalItems;
}

function renderCartItems() {
  const container = document.getElementById("cart-items-container");
  const footer = document.getElementById("cart-footer-panel");

  if (state.cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-message">
        <i class="fa-solid fa-leaf"></i>
        <h3>Your green bag is empty!</h3>
        <p>Bring the healing power of Haridwar's gardens into your home today.</p>
        <a href="#shop" class="btn btn-outline" style="margin-top:20px; font-size:13px;" onclick="document.getElementById('cart-drawer-overlay').classList.remove('open')">Browse Botanicals</a>
      </div>
    `;
    footer.style.display = "none";
    return;
  }

  footer.style.display = "block";
  let itemsHTML = "";
  let subtotal = 0;

  state.cart.forEach(item => {
    const product = state.products.find(p => p.id === item.productId);
    if (!product) return;

    const itemTotal = product.price * item.quantity;
    subtotal += itemTotal;

    itemsHTML += `
      <div class="cart-item">
        <img src="${product.image}" alt="${product.name}" class="cart-item-img" onerror="this.src='https://placehold.co/80x80/e8f5e9/1b4332?text=Natural'">
        <div class="cart-item-info">
          <h3 class="cart-item-title">${product.name}</h3>
          <div class="cart-item-price">₹${product.price}</div>
          <div class="cart-item-quantity">
            <button class="quantity-btn" onclick="window.changeCartQty('${product.id}', -1)"><i class="fa-solid fa-minus"></i></button>
            <span class="qty-val">${item.quantity}</span>
            <button class="quantity-btn" onclick="window.changeCartQty('${product.id}', 1)"><i class="fa-solid fa-plus"></i></button>
          </div>
        </div>
        <button class="remove-cart-item" onclick="window.removeCartItem('${product.id}')" title="Remove Item"><i class="fa-regular fa-trash-can"></i></button>
      </div>
    `;
  });

  container.innerHTML = itemsHTML;

  // Calculate pricing formulas
  let discount = 0;
  if (state.couponApplied === "VAIDHIRA10") {
    discount = subtotal * 0.1;
  }

  // Free shipping above 499
  let shipping = 0;
  if (subtotal - discount < 499) {
    shipping = 50;
  }

  const grandTotal = subtotal - discount + shipping;

  document.getElementById("cart-subtotal").innerText = `₹${subtotal.toFixed(2)}`;
  if (discount > 0) {
    document.getElementById("discount-row").style.display = "flex";
    document.getElementById("cart-discount").innerText = `-₹${discount.toFixed(2)}`;
  } else {
    document.getElementById("discount-row").style.display = "none";
  }
  document.getElementById("cart-shipping").innerText = shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`;
  document.getElementById("cart-total-price").innerText = `₹${grandTotal.toFixed(2)}`;
}

window.changeCartQty = function(productId, delta) {
  const item = state.cart.find(i => i.productId === productId);
  if (!item) return;

  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  const newQty = item.quantity + delta;
  if (newQty <= 0) {
    window.removeCartItem(productId);
    return;
  }

  if (newQty > product.stock) {
    alert(`Only ${product.stock} units available in stock!`);
    item.quantity = product.stock;
  } else {
    item.quantity = newQty;
  }

  saveToLocalStorage();
  renderCartItems();
};

window.removeCartItem = function(productId) {
  state.cart = state.cart.filter(item => item.productId !== productId);
  saveToLocalStorage();
  renderCartItems();
};

function applyCoupon() {
  const input = document.getElementById("coupon-input").value.trim().toUpperCase();
  const messageNode = document.getElementById("coupon-message");

  if (input === "VAIDHIRA10") {
    state.couponApplied = "VAIDHIRA10";
    messageNode.innerText = "Coupon applied! 10% off your purchase.";
    messageNode.style.color = "var(--success)";
  } else {
    state.couponApplied = null;
    messageNode.innerText = "Invalid coupon code.";
    messageNode.style.color = "var(--danger)";
  }

  renderCartItems();
}

// ----------------------------------------------------
// VIEW RENDERING: CHECKOUT VIEW
// ----------------------------------------------------
function renderCheckoutView(container) {
  if (state.cart.length === 0 && state.checkoutStep !== 3) {
    container.innerHTML = `
      <div class="container" style="text-align: center; padding: 60px 0;">
        <i class="fa-solid fa-cart-shopping" style="font-size: 60px; color: var(--secondary); margin-bottom: 20px; display: block;"></i>
        <h2>Checkout Pathway is Closed</h2>
        <p style="margin-bottom: 24px; color: var(--text-muted);">Please load items into your bag in our organic shop before checking out.</p>
        <a href="#shop" class="btn btn-primary">Go to Shop</a>
      </div>
    `;
    return;
  }

  // Assemble summary calculations
  let subtotal = 0;
  let summaryItemsHTML = "";
  state.cart.forEach(item => {
    const product = state.products.find(p => p.id === item.productId);
    if (!product) return;
    const itemCost = product.price * item.quantity;
    subtotal += itemCost;

    summaryItemsHTML += `
      <div class="cart-item" style="border: 0; margin-bottom: 12px; padding-bottom: 0;">
        <img src="${product.image}" alt="${product.name}" class="cart-item-img" style="width: 50px; height: 50px;" onerror="this.src='https://placehold.co/50x50/e8f5e9/1b4332?text=Natural'">
        <div class="cart-item-info">
          <div class="cart-item-title" style="font-size: 13px;">${product.name} (x${item.quantity})</div>
          <div class="cart-item-price" style="font-size: 13px;">₹${itemCost}</div>
        </div>
      </div>
    `;
  });

  let discount = 0;
  if (state.couponApplied === "VAIDHIRA10") {
    discount = subtotal * 0.1;
  }
  let shipping = (subtotal - discount >= 499) ? 0 : 50;
  let grandTotal = subtotal - discount + shipping;

  container.innerHTML = `
    <div class="container">
      <div class="section-header">
        <h2>Order Processing</h2>
        <p>Complete your purchase to experience organic purity</p>
      </div>

      <div class="checkout-grid">
        <!-- Forms panel -->
        <div class="checkout-card">
          <!-- Multi-step headers -->
          <div class="checkout-steps">
            <div class="step-node ${state.checkoutStep >= 1 ? 'active' : ''} ${state.checkoutStep > 1 ? 'completed' : ''}">
              <div class="step-circle">${state.checkoutStep > 1 ? '<i class="fa-solid fa-check"></i>' : '1'}</div>
              <span class="step-label">Shipping</span>
            </div>
            <div class="step-node ${state.checkoutStep >= 2 ? 'active' : ''} ${state.checkoutStep > 2 ? 'completed' : ''}">
              <div class="step-circle">${state.checkoutStep > 2 ? '<i class="fa-solid fa-check"></i>' : '2'}</div>
              <span class="step-label">Payment</span>
            </div>
            <div class="step-node ${state.checkoutStep === 3 ? 'active completed' : ''}">
              <div class="step-circle">3</div>
              <span class="step-label">Invoice</span>
            </div>
          </div>

          <!-- Step 1: Billing & Shipping Address -->
          <div class="checkout-step-content ${state.checkoutStep === 1 ? 'active' : ''}" id="checkout-step-1-content">
            <h3 style="margin-bottom: 20px; color: var(--primary-dark);">Shipping Address</h3>
            <form id="shipping-details-form">
              <div class="form-grid">
                <div class="form-group">
                  <label for="ship-name">Full Name *</label>
                  <input type="text" id="ship-name" required placeholder="e.g. Shalini Kashyap">
                </div>
                <div class="form-group">
                  <label for="ship-email">Email Address *</label>
                  <input type="email" id="ship-email" required placeholder="e.g. shalini@example.com">
                </div>
                <div class="form-group">
                  <label for="ship-phone">Phone Number *</label>
                  <input type="tel" pattern="[0-9]{10}" id="ship-phone" required placeholder="10-digit number e.g. 9876543210">
                </div>
                <div class="form-group">
                  <label for="ship-pincode">Pincode *</label>
                  <input type="text" pattern="[0-9]{6}" id="ship-pincode" required placeholder="6-digit Indian pincode e.g. 247667">
                </div>
                <div class="form-group full-width">
                  <label for="ship-address">Street Address *</label>
                  <input type="text" id="ship-address" required placeholder="House No, Apartment, Street name">
                </div>
                <div class="form-group">
                  <label for="ship-city">City *</label>
                  <input type="text" id="ship-city" required placeholder="e.g. Haridwar">
                </div>
                <div class="form-group">
                  <label for="ship-state">State *</label>
                  <select id="ship-state" required>
                    <option value="Uttarakhand">Uttarakhand</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                </div>
              </div>
              
              <button type="submit" class="btn btn-primary" style="margin-top: 30px; width: 100%;">Proceed to Payment Methods <i class="fa-solid fa-arrow-right" style="margin-left: 8px;"></i></button>
            </form>
          </div>

          <!-- Step 2: Payment Simulator -->
          <div class="checkout-step-content ${state.checkoutStep === 2 ? 'active' : ''}" id="checkout-step-2-content">
            <h3 style="margin-bottom: 10px; color: var(--primary-dark);">Choose Payment Method</h3>
            <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 20px;">Transactions are securely simulated for Vaidhira Botanical store.</p>
            
            <div class="payment-methods-grid">
              <div class="payment-method-card active" id="pay-method-card" onclick="window.selectPayment('Card')">
                <i class="fa-solid fa-credit-card"></i>
                <span style="font-weight:600; font-size:13px;">Credit/Debit Card</span>
              </div>
              <div class="payment-method-card" id="pay-method-upi" onclick="window.selectPayment('UPI')">
                <i class="fa-solid fa-qrcode"></i>
                <span style="font-weight:600; font-size:13px;">UPI QR Code</span>
              </div>
              <div class="payment-method-card" id="pay-method-cod" onclick="window.selectPayment('COD')">
                <i class="fa-solid fa-hand-holding-dollar"></i>
                <span style="font-weight:600; font-size:13px;">Cash on Delivery</span>
              </div>
            </div>

            <!-- Payment parameters forms dynamic -->
            <div id="payment-details-form-container">
              <!-- Default: Card form -->
              <div class="payment-details" id="card-payment-panel">
                <div class="form-grid" style="margin-top: 0;">
                  <div class="form-group full-width">
                    <label for="pay-card-num">Card Number *</label>
                    <input type="text" id="pay-card-num" placeholder="XXXX XXXX XXXX XXXX" required>
                  </div>
                  <div class="form-group">
                    <label for="pay-card-expiry">Expiry Date *</label>
                    <input type="text" id="pay-card-expiry" placeholder="MM/YY" required>
                  </div>
                  <div class="form-group">
                    <label for="pay-card-cvv">CVV *</label>
                    <input type="password" id="pay-card-cvv" placeholder="XXX" maxlength="3" required>
                  </div>
                </div>
              </div>
            </div>

            <div style="display:flex; gap:16px;">
              <button class="btn btn-outline" onclick="window.changeCheckoutStep(1)" style="flex: 1;"><i class="fa-solid fa-arrow-left" style="margin-right: 8px;"></i> Shipping Details</button>
              <button class="btn btn-primary" onclick="window.submitOrder()" style="flex: 1.5; background-color: var(--success);"><i class="fa-solid fa-circle-check" style="margin-right: 8px;"></i> Authorize Payment & Order</button>
            </div>
          </div>

          <!-- Step 3: Receipt Invoice -->
          <div class="checkout-step-content ${state.checkoutStep === 3 ? 'active' : ''}" id="checkout-step-3-content">
            <div class="receipt-container">
              <div class="receipt-success-icon"><i class="fa-solid fa-check"></i></div>
              <h2 style="color: var(--primary-dark); margin-bottom: 8px;">Order Placed Successfully!</h2>
              <p style="color: var(--text-muted); font-size: 14px;">Your herbal wellness package has entered packaging. Track invoice below.</p>
              
              <div class="receipt-card" id="receipt-invoice-card">
                <!-- Rendered by js order completion -->
              </div>

              <div style="display: flex; gap: 16px; justify-content: center; margin-top: 24px;">
                <button class="btn btn-outline" onclick="window.printInvoice()"><i class="fa-solid fa-print"></i> Print Invoice</button>
                <a href="#shop" class="btn btn-primary">Order More Herbs</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side Sticky Summary -->
        <div class="filters-sidebar" style="position: sticky; top: 110px; display: ${state.checkoutStep === 3 ? 'none' : 'block'};">
          <h3 style="font-size: 16px; padding-bottom: 8px; border-bottom: 2px solid var(--bg-sage); margin-bottom: 16px;">Order Summary</h3>
          
          <div class="summary-items" style="max-height: 200px; overflow-y: auto; margin-bottom: 20px; border-bottom: 1px solid var(--bg-sage); padding-bottom: 12px;">
            ${summaryItemsHTML}
          </div>

          <div class="cart-summary-row" style="font-size: 13px;">
            <span>Subtotal</span>
            <span>₹${subtotal.toFixed(2)}</span>
          </div>
          ${discount > 0 ? `
            <div class="cart-summary-row" style="font-size: 13px; color: var(--success);">
              <span>Promo Discount</span>
              <span>-₹${discount.toFixed(2)}</span>
            </div>
          ` : ''}
          <div class="cart-summary-row" style="font-size: 13px;">
            <span>Shipping Charge</span>
            <span>${shipping === 0 ? "FREE" : `₹${shipping.toFixed(2)}`}</span>
          </div>
          <div class="cart-summary-row total" style="font-size: 16px; border-top: 1px solid var(--bg-sage); padding-top: 12px; margin-top: 12px;">
            <span>Grand Total</span>
            <span style="color: var(--primary-light);">₹${grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  `;

  // Attach submit listeners to step 1 form
  if (state.checkoutStep === 1) {
    const shipForm = document.getElementById("shipping-details-form");
    shipForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      // Store temporary customer details in state
      state.tempOrder = {
        customer: {
          name: document.getElementById("ship-name").value,
          email: document.getElementById("ship-email").value,
          phone: document.getElementById("ship-phone").value,
          address: document.getElementById("ship-address").value,
          city: document.getElementById("ship-city").value,
          pincode: document.getElementById("ship-pincode").value
        },
        items: state.cart.map(item => {
          const product = state.products.find(p => p.id === item.productId);
          return {
            productId: item.productId,
            quantity: item.quantity,
            price: product ? product.price : 0
          };
        }),
        subtotal,
        discount,
        shipping,
        total: grandTotal,
        paymentMethod: "Card" // default
      };

      window.changeCheckoutStep(2);
    });
  }

  // If page is on step 3 receipt render the receipt info
  if (state.checkoutStep === 3 && state.tempOrder) {
    renderInvoiceMarkup(state.tempOrder);
  }
}

window.changeCheckoutStep = function(step) {
  state.checkoutStep = step;
  // Re-render checkout view to reflect step content
  const appContainer = document.getElementById("app");
  renderCheckoutView(appContainer);
};

window.selectPayment = function(method) {
  // Update UI active card states
  document.getElementById("pay-method-card").classList.remove("active");
  document.getElementById("pay-method-upi").classList.remove("active");
  document.getElementById("pay-method-cod").classList.remove("active");

  const panel = document.getElementById("payment-details-form-container");
  state.tempOrder.paymentMethod = method;

  if (method === "Card") {
    document.getElementById("pay-method-card").classList.add("active");
    panel.innerHTML = `
      <div class="payment-details" id="card-payment-panel">
        <div class="form-grid" style="margin-top: 0;">
          <div class="form-group full-width">
            <label for="pay-card-num">Card Number *</label>
            <input type="text" id="pay-card-num" placeholder="XXXX XXXX XXXX XXXX" required>
          </div>
          <div class="form-group">
            <label for="pay-card-expiry">Expiry Date *</label>
            <input type="text" id="pay-card-expiry" placeholder="MM/YY" required>
          </div>
          <div class="form-group">
            <label for="pay-card-cvv">CVV *</label>
            <input type="password" id="pay-card-cvv" placeholder="XXX" maxlength="3" required>
          </div>
        </div>
      </div>
    `;
  } else if (method === "UPI") {
    document.getElementById("pay-method-upi").classList.add("active");
    panel.innerHTML = `
      <div class="payment-details" id="upi-payment-panel">
        <div class="upi-qr-container">
          <div class="qr-placeholder"><i class="fa-solid fa-qrcode"></i></div>
          <p style="font-size:12px; color:var(--text-muted);">Scan QR code with BHIM/GPay/PhonePe to pay <strong>₹${state.tempOrder.total.toFixed(2)}</strong></p>
          <div class="form-group" style="width: 100%;">
            <label for="pay-upi-id">Or Pay via UPI ID *</label>
            <input type="text" id="pay-upi-id" placeholder="e.g. user@okhdfc" required style="width:100%;">
          </div>
        </div>
      </div>
    `;
  } else {
    document.getElementById("pay-method-cod").classList.add("active");
    panel.innerHTML = `
      <div class="payment-details" id="cod-payment-panel" style="text-align: center; padding: 20px;">
        <i class="fa-solid fa-truck-ramp-box" style="font-size: 32px; color: var(--primary); margin-bottom: 8px;"></i>
        <h4 style="font-family: var(--font-sans); color: var(--primary-dark);">Cash on Delivery</h4>
        <p style="font-size: 12px; color: var(--text-muted); max-width:350px; margin: 6px auto 0;">Pay with cash or digital code when our botanical delivery partner delivers the product at your address.</p>
      </div>
    `;
  }
};

window.submitOrder = function() {
  if (!state.tempOrder) return;

  // Simulate payment validation
  if (state.tempOrder.paymentMethod === "Card") {
    const num = document.getElementById("pay-card-num").value;
    const exp = document.getElementById("pay-card-expiry").value;
    const cvv = document.getElementById("pay-card-cvv").value;
    if (!num || !exp || !cvv) {
      alert("Please fill Card payment details!");
      return;
    }
  } else if (state.tempOrder.paymentMethod === "UPI") {
    const upi = document.getElementById("pay-upi-id").value;
    if (!upi) {
      alert("Please fill UPI ID!");
      return;
    }
  }

  // Create real order structure
  const orderId = `V-${Math.floor(1000 + Math.random() * 9000)}`;
  const finalOrder = {
    ...state.tempOrder,
    id: orderId,
    date: new Date().toISOString().split('T')[0],
    status: "pending"
  };

  // Adjust product stocks levels
  finalOrder.items.forEach(item => {
    const product = state.products.find(p => p.id === item.productId);
    if (product) {
      product.stock = Math.max(0, product.stock - item.quantity);
    }
  });

  // Save to DB
  state.orders.push(finalOrder);
  state.cart = []; // clear cart
  state.couponApplied = null; // clear coupon
  
  saveToLocalStorage();
  
  // Go to step 3 Success
  state.tempOrder = finalOrder;
  window.changeCheckoutStep(3);
};

function renderInvoiceMarkup(order) {
  const card = document.getElementById("receipt-invoice-card");
  if (!card) return;

  let itemsHTML = order.items.map(item => {
    const product = state.products.find(p => p.id === item.productId);
    const pName = product ? product.name : "Ayurvedic Product";
    return `
      <div style="display:flex; justify-content:space-between; font-size:13px; margin-bottom:8px;">
        <span>${pName} (x${item.quantity})</span>
        <span>₹${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    `;
  }).join("");

  card.innerHTML = `
    <div class="receipt-header">
      <span>Invoice ID: <strong>${order.id}</strong></span>
      <span>Date: ${order.date}</span>
    </div>
    
    <div style="font-size:13px; margin-bottom:16px;">
      <strong>Deliver To:</strong><br>
      ${order.customer.name}<br>
      ${order.customer.address}, ${order.customer.city} - ${order.customer.pincode}<br>
      Phone: ${order.customer.phone}
    </div>

    <div style="border-top:1px dashed var(--secondary); padding-top:12px; margin-bottom:12px;">
      <strong style="font-size:12px; text-transform:uppercase; color:var(--primary); display:block; margin-bottom:10px;">Items Ordered</strong>
      ${itemsHTML}
    </div>

    <div class="receipt-total-row">
      <span>Total Paid (${order.paymentMethod})</span>
      <span>₹${order.total.toFixed(2)}</span>
    </div>
  `;
}

window.printInvoice = function() {
  window.print();
};

// ----------------------------------------------------
// VIEW RENDERING: ADMIN PANEL
// ----------------------------------------------------
function renderAdminView(container) {
  container.innerHTML = `
    <div class="container">
      <div class="admin-layout">
        <!-- Sidebar -->
        <aside class="admin-sidebar">
          <h3 style="font-size: 16px; margin-bottom: 20px; padding: 0 16px; color: var(--primary); font-family:var(--font-sans); font-weight:700;"><i class="fa-solid fa-leaf"></i> Vaidhira Labs</h3>
          <div class="admin-nav-item ${state.adminCurrentTab === 'dashboard' ? 'active' : ''}" onclick="window.changeAdminTab('dashboard')"><i class="fa-solid fa-chart-line"></i> Dashboard</div>
          <div class="admin-nav-item ${state.adminCurrentTab === 'products' ? 'active' : ''}" onclick="window.changeAdminTab('products')"><i class="fa-solid fa-boxes-stacked"></i> Products</div>
          <div class="admin-nav-item ${state.adminCurrentTab === 'orders' ? 'active' : ''}" onclick="window.changeAdminTab('orders')"><i class="fa-solid fa-file-invoice-dollar"></i> Orders Log</div>
          <div class="admin-nav-item" onclick="window.resetAdminDB()" style="color:var(--danger); margin-top: 40px; border-top:1px solid var(--bg-sage); padding-top: 15px;"><i class="fa-solid fa-arrows-rotate"></i> Reset Database</div>
        </aside>

        <!-- Main Workspace -->
        <div class="admin-main" id="admin-workspace-content">
          <!-- Loaded dynamically -->
        </div>
      </div>
    </div>
  `;

  renderAdminWorkspace();
}

window.changeAdminTab = function(tab) {
  state.adminCurrentTab = tab;
  
  // Highlight tab active state
  document.querySelectorAll(".admin-nav-item").forEach(node => {
    if (node.innerText.toLowerCase().includes(tab)) {
      node.classList.add("active");
    } else {
      node.classList.remove("active");
    }
  });

  renderAdminWorkspace();
};

function renderAdminWorkspace() {
  const ws = document.getElementById("admin-workspace-content");
  if (!ws) return;

  if (state.adminCurrentTab === "dashboard") {
    // Calculate Analytics
    const totalRev = state.orders.reduce((sum, o) => sum + o.total, 0);
    const lowStock = state.products.filter(p => p.stock < 10).length;

    ws.innerHTML = `
      <h2 style="color: var(--primary-dark); margin-bottom: 24px;">Lab Dashboard Analytics</h2>
      
      <div class="admin-stats-grid">
        <div class="stat-card blue">
          <div class="stat-label">Total Revenue</div>
          <div class="stat-val">₹${totalRev.toFixed(2)}</div>
          <i class="fa-solid fa-indian-rupee-sign stat-icon"></i>
        </div>
        <div class="stat-card green">
          <div class="stat-label">Total Orders</div>
          <div class="stat-val">${state.orders.length}</div>
          <i class="fa-solid fa-file-invoice-dollar stat-icon"></i>
        </div>
        <div class="stat-card orange">
          <div class="stat-label">Catalog Herbs</div>
          <div class="stat-val">${state.products.length}</div>
          <i class="fa-solid fa-boxes-stacked stat-icon"></i>
        </div>
        <div class="stat-card purple">
          <div class="stat-label">Low Stock Alerts</div>
          <div class="stat-val" style="color: ${lowStock > 0 ? '#ffccd5' : '#ffffff'};">${lowStock} items</div>
          <i class="fa-solid fa-triangle-exclamation stat-icon"></i>
        </div>
      </div>

      <!-- sales trend chart -->
      <div class="admin-chart-section">
        <h3>Estimated Sales Trend (Weekly)</h3>
        <div class="custom-chart-wrapper">
          <div class="chart-bars-container">
            <div class="chart-bar-col">
              <span class="chart-bar-value">₹1200</span>
              <div class="chart-bar" style="height: 30%;"></div>
              <span class="chart-bar-label">Wk 1</span>
            </div>
            <div class="chart-bar-col">
              <span class="chart-bar-value">₹2400</span>
              <div class="chart-bar" style="height: 60%;"></div>
              <span class="chart-bar-label">Wk 2</span>
            </div>
            <div class="chart-bar-col">
              <span class="chart-bar-value">₹1800</span>
              <div class="chart-bar" style="height: 45%;"></div>
              <span class="chart-bar-label">Wk 3</span>
            </div>
            <div class="chart-bar-col">
              <span class="chart-bar-value">₹3200</span>
              <div class="chart-bar" style="height: 80%;"></div>
              <span class="chart-bar-label">Wk 4</span>
            </div>
            <div class="chart-bar-col">
              <span class="chart-bar-value">₹${totalRev > 1000 ? Math.round(totalRev).toString() : '900'}</span>
              <div class="chart-bar" style="height: 95%;"></div>
              <span class="chart-bar-label">Current</span>
            </div>
          </div>
        </div>
      </div>
    `;
  } 
  
  else if (state.adminCurrentTab === "products") {
    // Render inventory
    let rows = state.products.map(p => {
      return `
        <tr>
          <td><img src="${p.image}" class="table-img" alt="${p.name}" onerror="this.src='https://placehold.co/44x44/e8f5e9/1b4332?text=Natural'"></td>
          <td style="font-weight:600; color:var(--primary-dark);">${p.name}</td>
          <td>${p.category}</td>
          <td>₹${p.price}</td>
          <td><span style="color: ${p.stock < 10 ? 'var(--danger)' : 'var(--text-dark)'}; font-weight:700;">${p.stock}</span></td>
          <td>
            <div class="admin-actions-cell">
              <button class="admin-action-btn edit" onclick="window.openEditProductModal('${p.id}')">Edit</button>
              <button class="admin-action-btn delete" onclick="window.deleteProduct('${p.id}')">Delete</button>
            </div>
          </td>
        </tr>
      `;
    }).join("");

    ws.innerHTML = `
      <div class="admin-toolbar">
        <h2 style="color: var(--primary-dark);">Inventory Management</h2>
        <button class="btn btn-primary" onclick="window.openAddProductModal()"><i class="fa-solid fa-plus"></i> Add Herbal Product</button>
      </div>

      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    `;
  } 
  
  else if (state.adminCurrentTab === "orders") {
    // Render customer orders
    let rows = state.orders.map(order => {
      const orderTotalHTML = `₹${order.total.toFixed(2)}`;
      const itemsList = order.items.map(item => {
        const prod = state.products.find(p => p.id === item.productId);
        const name = prod ? prod.name : "Product";
        return `${name} (x${item.quantity})`;
      }).join(", ");

      return `
        <tr>
          <td style="font-weight: 700; color: var(--primary-light);">${order.id}</td>
          <td>${order.date}</td>
          <td>
            <strong>${order.customer.name}</strong><br>
            <span style="font-size:11px; color:var(--text-muted);">${order.customer.phone} | ${order.customer.city}</span>
          </td>
          <td style="max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${itemsList}">${itemsList}</td>
          <td style="font-weight: 700;">${orderTotalHTML}</td>
          <td>
            <select class="status-badge ${order.status}" style="border:0; padding:6px; cursor:pointer;" onchange="window.updateOrderStatus('${order.id}', this.value)">
              <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
              <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
              <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
            </select>
          </td>
        </tr>
      `;
    }).join("");

    ws.innerHTML = `
      <h2 style="color: var(--primary-dark); margin-bottom: 24px;">Customer Orders Log</h2>
      
      <div class="admin-table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer</th>
              <th>Items Ordered</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${rows.length > 0 ? rows : `<tr><td colspan="6" style="text-align:center; color:var(--text-muted);">No orders found.</td></tr>`}
          </tbody>
        </table>
      </div>
    `;
  }
}

// ----------------------------------------------------
// PRODUCT MUTATION CONTROLLERS (ADMIN)
// ----------------------------------------------------
window.openAddProductModal = function() {
  document.getElementById("admin-product-modal-title").innerText = "Add New Ayurvedic Product";
  document.getElementById("admin-product-id").value = "";
  
  // Clear inputs
  document.getElementById("admin-p-name").value = "";
  document.getElementById("admin-p-category").value = "Hair Care";
  document.getElementById("admin-p-price").value = "";
  document.getElementById("admin-p-old-price").value = "";
  document.getElementById("admin-p-stock").value = "50";
  document.getElementById("admin-p-badge").value = "";
  document.getElementById("admin-p-desc").value = "";
  
  document.getElementById("admin-p-image").value = "assets/shampoo.png";
  document.getElementById("admin-p-image-custom").style.display = "none";
  document.getElementById("admin-p-image-custom").value = "";

  document.getElementById("admin-product-modal-overlay").classList.add("open");
};

window.openEditProductModal = function(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  document.getElementById("admin-product-modal-title").innerText = `Edit: ${product.name}`;
  document.getElementById("admin-product-id").value = product.id;
  
  document.getElementById("admin-p-name").value = product.name;
  document.getElementById("admin-p-category").value = product.category;
  document.getElementById("admin-p-price").value = product.price;
  document.getElementById("admin-p-old-price").value = product.originalPrice || "";
  document.getElementById("admin-p-stock").value = product.stock;
  document.getElementById("admin-p-badge").value = product.badge || "";
  document.getElementById("admin-p-desc").value = product.description;

  // Set image select options
  const imageSelect = document.getElementById("admin-p-image");
  const customInput = document.getElementById("admin-p-image-custom");
  
  if (product.image.startsWith("assets/")) {
    imageSelect.value = product.image;
    customInput.style.display = "none";
  } else {
    imageSelect.value = "custom";
    customInput.style.display = "block";
    customInput.value = product.image;
  }

  document.getElementById("admin-product-modal-overlay").classList.add("open");
};

function handleProductSave(e) {
  e.preventDefault();

  const id = document.getElementById("admin-product-id").value;
  const name = document.getElementById("admin-p-name").value;
  const category = document.getElementById("admin-p-category").value;
  const price = parseInt(document.getElementById("admin-p-price").value);
  const oldPriceInput = document.getElementById("admin-p-old-price").value;
  const originalPrice = oldPriceInput ? parseInt(oldPriceInput) : null;
  const stock = parseInt(document.getElementById("admin-p-stock").value);
  const badge = document.getElementById("admin-p-badge").value;
  const description = document.getElementById("admin-p-desc").value;
  
  // Evaluate image path
  const imageSel = document.getElementById("admin-p-image").value;
  const image = imageSel === "custom" ? document.getElementById("admin-p-image-custom").value : imageSel;

  if (id) {
    // Edit existing product
    const product = state.products.find(p => p.id === id);
    if (product) {
      product.name = name;
      product.category = category;
      product.price = price;
      product.originalPrice = originalPrice;
      product.stock = stock;
      product.badge = badge;
      product.description = description;
      product.image = image;
    }
  } else {
    // Create new product
    const newId = `p${state.products.length + 10}`;
    const newProd = {
      id: newId,
      name,
      category,
      price,
      originalPrice,
      rating: 4.5,
      reviewsCount: 1,
      image,
      badge,
      stock,
      description,
      ingredients: "Natural Essential oil blend, Organic herb extracts, carrier elements.",
      howToUse: "Apply onto targeted area as needed. Follow individual skin instructions."
    };
    state.products.push(newProd);
  }

  saveToLocalStorage();
  document.getElementById("admin-product-modal-overlay").classList.remove("open");
  renderAdminWorkspace();
}

window.deleteProduct = function(productId) {
  if (confirm("Are you sure you want to remove this organic product from catalog?")) {
    state.products = state.products.filter(p => p.id !== productId);
    saveToLocalStorage();
    renderAdminWorkspace();
  }
};

window.updateOrderStatus = function(orderId, newStatus) {
  const order = state.orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    saveToLocalStorage();
    renderAdminWorkspace();
  }
};

window.resetAdminDB = function() {
  if (confirm("Reset database to initial default botanicals list and clear custom orders?")) {
    localStorage.removeItem("vaidhira_products");
    localStorage.removeItem("vaidhira_cart");
    localStorage.removeItem("vaidhira_orders");
    
    state.products = DEFAULT_PRODUCTS;
    state.cart = [];
    state.orders = INITIAL_ORDERS;
    state.couponApplied = null;
    
    saveToLocalStorage();
    location.reload();
  }
};
