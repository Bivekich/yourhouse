"use client";
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import AboutSection from '@/components/AboutSection';
import ProjectsSection from '@/components/ProjectsSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import TeamSection from '@/components/TeamSection';
import ReviewsSection from '@/components/ReviewsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import Image from 'next/image';
import HouseCalculatorModal from '@/components/HouseCalculatorModal';
import CatalogRequestModal from '@/components/CatalogRequestModal';
import ExcursionModal from '@/components/ExcursionModal';
import FadeInSection from '@/components/FadeInSection';
import Preloader from '@/components/Preloader';

export default function Home() {
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isExcursionModalOpen, setIsExcursionModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hidePreloader, setHidePreloader] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setHidePreloader(true), 600); // для плавного исчезновения
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen">
      {!hidePreloader && (
        <div className={`fixed inset-0 z-[9999] transition-opacity duration-500 ${isLoading ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <Preloader />
        </div>
      )}
      <Header />
      <HouseCalculatorModal isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
      <CatalogRequestModal isOpen={isCatalogModalOpen} onClose={() => setIsCatalogModalOpen(false)} />
      <ExcursionModal isOpen={isExcursionModalOpen} onClose={() => setIsExcursionModalOpen(false)} />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
            <FadeInSection as="div" className="flex-1 order-2 md:order-1 text-center md:text-left" delay={0.2}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
                Строительство каменных домов в России
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-6 md:mb-8">
                Построим технологичный дом от 6 млн. руб за 90 дней
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-full hover:bg-blue-700 transition-colors shadow-lg text-base sm:text-lg font-semibold"
                  onClick={() => setIsCalculatorOpen(true)}
                >
                  Рассчитать стоимость дома
                </button>
                <button
                  className="w-full sm:w-auto border-2 border-blue-600 text-blue-600 px-6 sm:px-8 py-3 rounded-full hover:bg-blue-50 transition-colors text-base sm:text-lg"
                  onClick={() => setIsCatalogModalOpen(true)}
                >
                  Получить каталог проектов
                </button>
              </div>
            </FadeInSection>
            <FadeInSection as="div" className="flex-1 relative h-[300px] sm:h-[400px] w-full order-1 md:order-2 mb-8 md:mb-0" delay={0.4}>
              <Image
                src="/images/hero-house.jpg"
                alt="Современный дом"
                fill
                className="object-cover rounded-2xl shadow-2xl"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 text-center">
            <FadeInSection as="div" className="p-4 md:p-6 bg-gray-50 rounded-xl" delay={0.2}>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">+100</div>
              <div className="text-gray-600">Реализованных объектов</div>
            </FadeInSection>
            <FadeInSection as="div" className="p-4 md:p-6 bg-gray-50 rounded-xl" delay={0.3}>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">20</div>
              <div className="text-gray-600">Лет гарантии</div>
            </FadeInSection>
            <FadeInSection as="div" className="p-4 md:p-6 bg-gray-50 rounded-xl sm:col-span-2 md:col-span-1" delay={0.4}>
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">37%</div>
              <div className="text-gray-600">Клиентов по рекомендации</div>
            </FadeInSection>
          </div>
        </div>
      </section>

      <AboutSection />
      <ProjectsSection onCatalogClick={() => setIsCatalogModalOpen(true)} />
      <WhyChooseUsSection />
      <TeamSection />
      <ReviewsSection onExcursionClick={() => setIsExcursionModalOpen(true)} />
      <ContactSection />
      <Footer />
    </main>
  );
}
