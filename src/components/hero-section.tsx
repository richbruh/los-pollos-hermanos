import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  return (
    <section className="relative min-h-[120vh] overflow-hidden bg-[#021F59] pt-16 lg:pt-20">
      {/* Main Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[10s] ease-out"
          style={{
            backgroundImage: `url('/images/los-pollos.jpg')`,
            transform: `scale(1.05) translate(${(mousePosition.x - 50) * 0.01}px, ${(mousePosition.y - 50) * 0.01}px)`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#021F59]/95 via-[#021F59]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#021F59]/90 via-transparent to-[#021F59]/60" />
      </div>

      {/* Static Background Elements - Non-interactive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-[#F2E205]/5 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-[#F20519]/5 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 bg-[#F2E205]/5 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-[#F20519]/5 rounded-full animate-pulse delay-1500"></div>
        
        {/* Reduced Floating particles - Non-interactive */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-[#F2E205]/20 rounded-full pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${4 + Math.random() * 3}s ease-in-out infinite ${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Logo with Glow Effect */}
            <div className={`transform transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-[#F2E205] rounded-full blur-3xl opacity-30 scale-150 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-[#F2E205] to-[#F20519] p-4 rounded-full shadow-2xl border-4 border-white/20 backdrop-blur-sm">
                  <img
                    className="h-16 w-16 md:h-20 md:w-20 filter drop-shadow-lg"
                    src="/los-pollos-hermanos.svg"
                    alt="Los Pollos Hermanos"
                  />
                </div>
              </div>
            </div>

            {/* Main Title */}
            <div className={`space-y-4 transform transition-all duration-1000 delay-200 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-tight uppercase tracking-wide font-oswald">
                <span className="bg-gradient-to-r from-[#F2E205] via-[#F20519] to-[#F2E205] bg-clip-text text-transparent drop-shadow-2xl animate-gradient-x">
                  Los Pollos
                </span>
                <br />
                <span className="text-white drop-shadow-2xl">
                  Hermanos
                </span>
              </h1>
              
              <div className="flex items-center space-x-4 text-xl md:text-2xl text-[#F2E205] font-bold">
                <div className="w-12 h-0.5 bg-gradient-to-r from-[#F2E205] to-[#F20519]"></div>
                <span className="font-['Oswald'] uppercase tracking-wide">The Best Chicken in Town</span>
              </div>
              
              <p className="text-lg md:text-xl text-white/90 max-w-lg leading-relaxed font-light font-oswald">
                Experience the authentic taste of our family recipe, perfected since 1989. 
                Made fresh daily with our secret blend of 11 herbs and spices.
              </p>
            </div>

            {/* Action Buttons */}
            <div className={`flex flex-wrap gap-4 transform transition-all duration-1000 delay-400 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}>
              <button 
                className="group relative bg-gradient-to-r from-[#F20519] to-[#F20519]/80 hover:from-[#F20519] hover:to-[#F2E205] text-white px-8 py-4 rounded-2xl font-['Oswald'] font-bold text-lg uppercase tracking-wide transition-all duration-500 hover:shadow-2xl hover:scale-105 border-2 border-[#F20519] overflow-hidden"
                onMouseEnter={() => setHoveredButton('order')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <span className="relative z-10 flex items-center space-x-3">
                  <span className="text-2xl">🍗</span>
                  <span>Order Now</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                {hoveredButton === 'order' && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F2E205] to-[#F20519] opacity-20"></div>
                )}
              </button>
              
              <button 
                className="group bg-transparent border-2 border-[#F2E205] text-[#F2E205] hover:bg-[#F2E205] hover:text-[#021F59] px-8 py-4 rounded-2xl font-['Oswald'] font-bold text-lg uppercase tracking-wide transition-all duration-300 hover:shadow-2xl hover:scale-105 backdrop-blur-sm"
                onMouseEnter={() => setHoveredButton('menu')}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <span className="flex items-center space-x-3">
                  <span className="text-xl">📖</span>
                  <span>View Menu</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;