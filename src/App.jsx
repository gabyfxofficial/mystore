import React, { useState, useMemo } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./slices/store";
import Login from "./components/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FilterSidebar from "./components/FilterSidebar";
import ProductList from "./components/ProductList";
import LiveChat from "./components/LiveChat";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import MyAccount from "./pages/MyAccount";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import PurchaseCompleted from "./pages/PurchaseCompleted";
import CardPayment from "./pages/CardPayment";
import productsData from "./data/products";
import "./styles/Login.css";
import "./styles/FilterSidebar.css";
import "./styles/ProductCard.css";
import "./styles/Wishlist.css";
import "./styles/LiveChat.css";
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
                <div className="main-content">
                  <FilterSidebar filters={filters} setFilters={setFilters} />
                  <div className="content">
                    <ProductList products={filteredProducts} />
                  </div>
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
            path="/wishlist"
            element={isAuthenticated ? <Wishlist /> : <Navigate to="/login" />}
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
          <Route
            path="/card-payment"
            element={
              isAuthenticated ? <CardPayment /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </div>
      {!isLoginPage && <Footer />}
      {!isLoginPage && <LiveChat />}
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AppContent />
      </Router>
    </Provider>
  );
}

export default App;
