import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import PageTransition from "./components/PageTransition";

import Home from "./pages/Home";
import Residences from "./pages/Residences";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import AboutUs from "./pages/AboutUs";
// import Gallery from "./pages/Gallery";
// import Contact from "./pages/Contact";

export default function App() {
  const [loading, setLoading] = useState(true);

  // fallback loader timing
  useEffect(() => {
    const loadEverything = async () => {
      // wait for fonts
      await document.fonts.ready;

      // small delay for smoothness
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    };

    loadEverything();
  }, []);

  return (
    <Router>
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {!loading && (
        <>
          <Navbar />
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/residences" element={<Residences />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="*" element={<NotFound />} />
            <Route path="/about" element={<AboutUs />} />

              {/* 
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            */}
            </Routes>
          </PageTransition>
          <Footer />
          <BackToTop />
        </>
      )}
    </Router>
  );
}
