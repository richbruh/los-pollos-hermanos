import Navbar from './components/navbar.tsx'
import HeroSection from './components/hero-section.tsx'
import Chatbot from './components/chatbot.tsx'
import './App.css'
import './index.css'

function App() {

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <HeroSection/>

      {/* Features Section */}
      <section id="menu" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-red-700 mb-4 font-oswald">
              Why Choose Los Pollos Hermanos?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-oswald">
              We're not just another chicken restaurant. We're a family tradition.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl bg-yellow-50 border-2 border-yellow-200 hover:border-red-300 transition-all duration-300 hover:shadow-lg">
              <div className="text-6xl mb-4">🍗</div>
              <h3 className="text-2xl font-bold text-red-700 mb-4">Secret Recipe</h3>
              <p className="text-gray-600">
                Our original family recipe with 11 herbs and spices, passed down through generations.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-yellow-50 border-2 border-yellow-200 hover:border-red-300 transition-all duration-300 hover:shadow-lg">
              <div className="text-6xl mb-4">🌟</div>
              <h3 className="text-2xl font-bold text-red-700 mb-4">Fresh Daily</h3>
              <p className="text-gray-600">
                All our chicken is prepared fresh daily with the highest quality ingredients.
              </p>
            </div>
            
            <div className="text-center p-8 rounded-xl bg-yellow-50 border-2 border-yellow-200 hover:border-red-300 transition-all duration-300 hover:shadow-lg">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-2xl font-bold text-red-700 mb-4">Fast Service</h3>
              <p className="text-gray-600">
                Quick service without compromising on quality. Hot, fresh chicken in minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Menu Section */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-red-700 mb-4">Popular Menu Items</h2>
            <p className="text-xl text-gray-600">Try our customer favorites</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Original Crispy Chicken", price: "$12.99", emoji: "🍗" },
              { name: "Spicy Wings", price: "$8.99", emoji: "🔥" },
              { name: "Chicken Sandwich", price: "$6.99", emoji: "🥪" },
              { name: "Family Bucket", price: "$24.99", emoji: "🪣" }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-yellow-200 hover:border-red-300">
                <div className="text-4xl mb-4 text-center">{item.emoji}</div>
                <h3 className="font-bold text-red-700 text-lg mb-2">{item.name}</h3>
                <p className="text-2xl font-black text-red-600">{item.price}</p>
                <button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold transition-colors duration-200">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-red-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Los Pollos Hermanos</h3>
              <p className="text-red-200">
                The best chicken restaurant in town. Serving quality food since 1989.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <p className="text-red-200 mb-2">📞 (505) 555-0123</p>
              <p className="text-red-200 mb-2">📧 info@lospolloshermanos.com</p>
              <p className="text-red-200">📍 123 Chicken Street, Albuquerque, NM</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Hours</h4>
              <p className="text-red-200 mb-2">Monday - Thursday: 10:00 AM - 10:00 PM</p>
              <p className="text-red-200 mb-2">Friday - Saturday: 10:00 AM - 11:00 PM</p>
              <p className="text-red-200">Sunday: 11:00 AM - 9:00 PM</p>
            </div>
          </div>
          
          <div className="border-t border-red-600 mt-8 pt-8 text-center">
            <p className="text-red-200">© 2025 Los Pollos Hermanos. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <Chatbot/>
    </div>
  )
}

export default App