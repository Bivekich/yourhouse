'use client';

import Link from 'next/link';
import { Phone, Menu } from 'lucide-react';
import { useState } from 'react';
import CallbackModal from './CallbackModal';
import MobileMenu from './MobileMenu';
import FadeInOnMount from './FadeInOnMount';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <FadeInOnMount as="header" className={`fixed w-full z-50 bg-white/90 py-3`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/" className="text-xl sm:text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors flex-shrink-0 py-1">
              ВашДом
            </Link>
            
            <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
              <Link href="#about" className="text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base py-1">
                О компании
              </Link>
              <Link href="#projects" className="text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base py-1">
                Проекты
              </Link>
              <Link href="#reviews" className="text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base py-1">
                Отзывы
              </Link>
              <Link href="#contacts" className="text-gray-600 hover:text-blue-600 transition-colors text-sm lg:text-base py-1">
                Контакты
              </Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
              <a 
                href="tel:+79001234567" 
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors group text-sm lg:text-base whitespace-nowrap py-1"
              >
                <Phone className="w-4 h-4 lg:w-5 lg:h-5 mr-1 lg:mr-2 group-hover:scale-110 transition-transform" />
                <span>+7 (900) 123-45-67</span>
              </a>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-1 md:px-6 md:py-1.5 rounded-full hover:bg-blue-700 transition-colors hover:shadow-lg text-sm lg:text-base font-semibold flex-shrink-0"
              >
                Заказать консультацию
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              aria-label="Открыть меню"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </FadeInOnMount>

      <CallbackModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Header; 