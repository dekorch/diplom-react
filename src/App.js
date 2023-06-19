import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import Banner from "./components/Banner";
import HomePage from "./pages/HomePage.js";
import CatalogPage from "./pages/CatalogPage.js";
import ProductItemPage from "./pages/ProductItemPage.js";
import CartPage from "./pages/CartPage.js";
import InfoPage from "./pages/InfoPage.js";
import ContactPage from "./pages/ContactPage.js";
import NotFoundPage from "./pages/NotFoundPage.js";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Banner>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/catalog/:id" element={<ProductItemPage />} />
          <Route path="/info" element={<InfoPage />} />
          <Route path="/contacts" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Banner>
      <Footer />
    </BrowserRouter>
  );
}

export default App;