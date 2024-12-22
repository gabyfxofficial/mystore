import React, { useState, useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login";
import "./styles/Login.css";
import "./styles/Notification.css";
import "./styles/FilterSidebar.css";
import "./styles/ProductCard.css";
import Header from "./components/Header";
import FilterSidebar from "./components/FilterSidebar";
import ProductList from "./components/ProductList";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import MyAccount from "./pages/MyAccount";
import Checkout from "./pages/Checkout";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import PurchaseCompleted from "./pages/PurchaseCompleted";
import productsData from "./data/products";
import { CartProvider } from "./pages/CartContext";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function AppContent() {
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

  const isAuthenticated = localStorage.getItem("token") !== null;
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="app">
      {!isLoginPage && <Header />}
      <div className="page-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/products"
            element={
              isAuthenticated ? (
                <div className="content">
                  <FilterSidebar filters={filters} setFilters={setFilters} />
                  <ProductList products={filteredProducts} />
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/about"
            element={isAuthenticated ? <About /> : <Navigate to="/login" />}
          />
          <Route
            path="/contact"
            element={isAuthenticated ? <Contact /> : <Navigate to="/login" />}
          />
          <Route
            path="/cart"
            element={isAuthenticated ? <Cart /> : <Navigate to="/login" />}
          />
          <Route
            path="/my-account"
            element={isAuthenticated ? <MyAccount /> : <Navigate to="/login" />}
          />
          <Route
            path="/checkout"
            element={isAuthenticated ? <Checkout /> : <Navigate to="/login" />}
          />
          <Route
            path="/PrivacyPolicy"
            element={
              isAuthenticated ? <PrivacyPolicy /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/TermsOfService"
            element={
              isAuthenticated ? <TermsOfService /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/purchase-completed"
            element={
              isAuthenticated ? <PurchaseCompleted /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </div>
      {!isLoginPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;
