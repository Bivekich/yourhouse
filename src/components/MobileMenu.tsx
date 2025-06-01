'use client';

import Link from 'next/link';
import { X, Phone } from 'lucide-react';
import { useEffect } from 'react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 animate-fadeIn">
      <div className="container mx-auto px-4 py-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            ВашДом
          </Link>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Закрыть меню"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 flex flex-col space-y-6">
          <Link 
            href="#about" 
            className="text-xl text-gray-600 hover:text-blue-600 transition-colors py-2"
            onClick={onClose}
          >
            О компании
          </Link>
          <Link 
            href="#projects" 
            className="text-xl text-gray-600 hover:text-blue-600 transition-colors py-2"
            onClick={onClose}
          >
            Проекты
          </Link>
          <Link 
            href="#reviews" 
            className="text-xl text-gray-600 hover:text-blue-600 transition-colors py-2"
            onClick={onClose}
          >
            Отзывы
          </Link>
          <Link 
            href="#contacts" 
            className="text-xl text-gray-600 hover:text-blue-600 transition-colors py-2"
            onClick={onClose}
          >
            Контакты
          </Link>
        </nav>

        <div className="mt-auto pb-8">
          <a 
            href="tel:+79001234567" 
            className="flex items-center text-blue-600 hover:text-blue-700 transition-colors mb-6 group"
          >
            <Phone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
            <span className="text-lg">+7 (900) 123-45-67</span>
          </a>
          <button 
            onClick={onClose}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors hover:shadow-lg"
          >
            Заказать звонок
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu; 