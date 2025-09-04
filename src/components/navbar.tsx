import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Unified Navbar for Both Desktop and Mobile */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#021F59]/95 backdrop-blur-md shadow-2xl border-b border-[#F2E205]/20' 
          : 'bg-[#021F59]/80 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo Section */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-[#F2E205] to-[#F20519] p-2 rounded-xl shadow-lg border border-white/20">
                <img
                  className="h-8 w-8 lg:h-10 lg:w-10"
                  src="/los-pollos-hermanos.svg"
                  alt="Los Pollos Hermanos"
                />
              </div>
              <div>
                <h1 className="text-lg lg:text-xl font-bold text-white tracking-wide uppercase font-oswald">
                  Los Pollos Hermanos
                </h1>
                <p className="text-xs text-[#F2E205] font-medium uppercase tracking-wider hidden lg:block font-oswald">
                  The Best Chicken in Town
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links - Hidden on small screens */}
            <div className="hidden lg:flex items-center space-x-6">
              <a
                href="#home"
                className="font-['Oswald'] text-white hover:text-[#F2E205] px-4 py-2 rounded-lg text-sm font-medium uppercase tracking-wide transition-all duration-300 hover:bg-white/5 relative group"
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F2E205] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#menu"
                className="font-['Oswald'] text-white hover:text-[#F2E205] px-4 py-2 rounded-lg text-sm font-medium uppercase tracking-wide transition-all duration-300 hover:bg-white/5 relative group"
              >
                Menu
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F2E205] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#locations"
                className="font-['Oswald'] text-white hover:text-[#F2E205] px-4 py-2 rounded-lg text-sm font-medium uppercase tracking-wide transition-all duration-300 hover:bg-white/5 relative group"
              >
                Locations
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F2E205] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#about"
                className="font-['Oswald'] text-white hover:text-[#F2E205] px-4 py-2 rounded-lg text-sm font-medium uppercase tracking-wide transition-all duration-300 hover:bg-white/5 relative group"
              >
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F2E205] transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a
                href="#contact"
                className="font-['Oswald'] text-white hover:text-[#F2E205] px-4 py-2 rounded-lg text-sm font-medium uppercase tracking-wide transition-all duration-300 hover:bg-white/5 relative group"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F2E205] transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>

            {/* Right Side - CTA Buttons & Menu Toggle */}
            <div className="flex items-center space-x-3">
              {/* Desktop CTA Buttons */}
              <div className="hidden lg:flex items-center space-x-3">
                <button className="font-['Oswald'] bg-[#F20519] hover:bg-[#d41729] text-white px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wide transition-all duration-300 hover:shadow-xl hover:scale-105">
                  Order Online
                </button>
                <button className="font-['Oswald'] bg-transparent border-2 border-[#F2E205] text-[#F2E205] hover:bg-[#F2E205] hover:text-[#021F59] px-6 py-3 rounded-full font-semibold text-sm uppercase tracking-wide transition-all duration-300 hover:shadow-xl hover:scale-105">
                  Find Location
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden bg-[#F20519] p-2 rounded-lg text-white hover:bg-[#d41729] focus:outline-none focus:ring-2 focus:ring-[#F2E205] transition-colors duration-200"
              >
                <span className="sr-only">Open menu</span>
                {/* Animated Hamburger Icon */}
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span
                    className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                      isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
                    }`}
                  ></span>
                  <span
                    className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                      isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                  ></span>
                  <span
                    className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                      isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        <div
          className={`lg:hidden ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden transition-all duration-300 ease-in-out bg-[#021F59]/95 backdrop-blur-md border-t border-[#F2E205]/20`}
        >
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Navigation Links */}
            <a
              href="#home"
              className="font-['Oswald'] block text-white hover:text-[#F2E205] hover:bg-white/5 px-4 py-3 rounded-lg text-lg font-medium uppercase tracking-wide transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              🏠 Home
            </a>
            <a
              href="#menu"
              className="font-['Oswald'] block text-white hover:text-[#F2E205] hover:bg-white/5 px-4 py-3 rounded-lg text-lg font-medium uppercase tracking-wide transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              🍗 Menu
            </a>
            <a
              href="#locations"
              className="font-['Oswald'] block text-white hover:text-[#F2E205] hover:bg-white/5 px-4 py-3 rounded-lg text-lg font-medium uppercase tracking-wide transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              📍 Locations
            </a>
            <a
              href="#about"
              className="font-['Oswald'] block text-white hover:text-[#F2E205] hover:bg-white/5 px-4 py-3 rounded-lg text-lg font-medium uppercase tracking-wide transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              ℹ️ About Us
            </a>
            <a
              href="#contact"
              className="font-['Oswald'] block text-white hover:text-[#F2E205] hover:bg-white/5 px-4 py-3 rounded-lg text-lg font-medium uppercase tracking-wide transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              📞 Contact
            </a>
            
            {/* Mobile CTA Buttons */}
            <div className="pt-4 space-y-3 border-t border-[#F2E205]/20">
              <button 
                className="font-['Oswald'] w-full bg-[#F20519] hover:bg-[#d41729] text-white px-4 py-4 rounded-xl font-semibold text-lg uppercase tracking-wide transition-all duration-200 hover:shadow-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🛒 Order Online
              </button>
              <button 
                className="font-['Oswald'] w-full bg-transparent border-2 border-[#F2E205] text-[#F2E205] hover:bg-[#F2E205] hover:text-[#021F59] px-4 py-4 rounded-xl font-semibold text-lg uppercase tracking-wide transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                📍 Find Location
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;