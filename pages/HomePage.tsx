import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { mockProducts } from '@/lib/mockData';
import ProductCard from '@/components/products/ProductCard';
import Button from '@/components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2070&auto=format&fit=crop',
    title: 'Your Trusted Partner in Health',
    subtitle: 'Kingzy Pharmaceuticals provides high-quality, reliable pharmaceutical products for both wholesale and individual needs.',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=2070&auto=format&fit=crop',
    title: 'Quality You Can Rely On',
    subtitle: 'Sourcing the best medications and healthcare products for our communities.',
  },
  {
    imageUrl: 'https://images.unsplash.com/photo-1550831107-1553da8c8464?q=80&w=1974&auto=format&fit=crop',
    title: 'Seamless Supply for Professionals',
    subtitle: 'Efficiently manage your inventory with our streamlined wholesale purchasing process.',
  }
];

const HomePage: React.FC = () => {
  const featuredProducts = mockProducts.slice(0, 4);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);
  
  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    const sliderInterval = setInterval(() => {
      goToNext();
    }, 5000); // Change slide every 5 seconds
    
    return () => clearInterval(sliderInterval);
  }, [goToNext]);


  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[550px] w-full overflow-hidden text-white">
        {/* Slides Container */}
        <div 
          className="w-full h-full flex transition-transform ease-in-out duration-1000"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div 
              key={index} 
              className="w-full h-full flex-shrink-0 bg-cover bg-center" 
              style={{ backgroundImage: `url('${slide.imageUrl}')` }}
            ></div>
          ))}
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-brand-blue-900 opacity-50"></div>
        
        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="relative container mx-auto px-4 lg:px-6">
                 <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-shadow-lg">
                    {slides[currentIndex].title}
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-blue-50 text-shadow">
                    {slides[currentIndex].subtitle}
                </p>
                <div className="mt-8 flex justify-center gap-4">
                    <Link to="/products">
                    <Button size="lg">Browse Products</Button>
                    </Link>
                    <Link to="/auth/login">
                    <Button size="lg" variant="secondary" className="bg-white/90 hover:bg-white text-brand-blue-800">
                        Wholesale Login
                    </Button>
                    </Link>
                </div>
            </div>
        </div>
        
        {/* Navigation Arrows */}
        <button onClick={goToPrevious} className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-black/30 rounded-full hover:bg-black/50 transition">
          <ChevronLeft size={28} />
        </button>
        <button onClick={goToNext} className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-black/30 rounded-full hover:bg-black/50 transition">
          <ChevronRight size={28} />
        </button>

        {/* Indicator Dots */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, slideIndex) => (
                <div
                    key={slideIndex}
                    onClick={() => goToSlide(slideIndex)}
                    className={`h-3 w-3 rounded-full cursor-pointer transition-all ${currentIndex === slideIndex ? 'bg-white scale-110' : 'bg-white/50'}`}
                ></div>
            ))}
        </div>

      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;