import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import FilterSidebar from "./components/FilterSidebar";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import OrderHistory from "./pages/OrderHistory";
import MyAccount from "./pages/MyAccount";
import CheckoutPage from "./pages/CheckoutPage"; // Importă CheckoutPage
import productsData from "./data/products";
import { CartProvider } from "./pages/CartContext";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [filters, setFilters] = useState({
    search: "",
    models: [],
    storage: [],
    colors: [],
  });

  const products = useMemo(
    () => (Array.isArray(productsData) ? productsData : []),
    []
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        !filters.search ||
        product.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesModel =
        filters.models.length === 0 || filters.models.includes(product.model);
      const matchesStorage =
        filters.storage.length === 0 ||
        filters.storage.includes(product.storage);
      const matchesColor =
        filters.colors.length === 0 || filters.colors.includes(product.color);
      const matchesPrice =
        (!filters.minPrice || product.price >= parseFloat(filters.minPrice)) &&
        (!filters.maxPrice || product.price <= parseFloat(filters.maxPrice));

      return (
        matchesSearch &&
        matchesModel &&
        matchesStorage &&
        matchesColor &&
        matchesPrice
      );
    });
  }, [filters, products]);

  return (
    <CartProvider>
      <Router>
        <div className="app">
          <Header />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/products"
                element={
                  <div className="content">
                    <FilterSidebar filters={filters} setFilters={setFilters} />
                    <ProductList products={filteredProducts} />
                  </div>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders-history" element={<OrderHistory />} />
              <Route path="/my-account" element={<MyAccount />} />
              <Route path="/checkout" element={<CheckoutPage />} />{" "}
              {/* Ruta pentru Checkout */}
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
