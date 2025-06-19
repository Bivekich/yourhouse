'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import FadeInSection from './FadeInSection';

type ProjectsSectionProps = {
  onCatalogClick?: () => void;
};

const projects = [
  {
    id: 1,
    title: 'Гармония',
    description: 'Дом 11х9м, общая площадь 101,4 кв.м., 3 спальни, 1 санузел',
    image: '/images/garmony.png',
    file: '/projects/garmony.pdf',
  },
  {
    id: 2,
    title: 'Горизонт',
    description: 'Дом 14х13 м, общая площадь 142,8 кв.м, 3 спальни, 2 санузла',
    image: '/images/gorizont.png',
    file: '/projects/gorizont.pdf',
  },
  {
    id: 3,
    title: 'Филимонов',
    description: 'Дом 14,2х10,5 м, общая площадь 131,4 кв.м., 3 спальни, 2 санузла',
    image: '/images/filimonov.png',
    file: '/projects/filimonov.pdf',
  },
  {
    id: 4,
    title: 'Моронцов',
    description: 'Дом 12х8м, общая площадь 89,6 кв.м., 2 спальни, 1 санузел',
    image: '/images/moronchov.png',
    file: '/projects/moronchov.pdf',
  },
  {
    id: 5,
    title: 'Ранчо',
    description: 'Дом 15х12м, общая площадь 156,8 кв.м., 4 спальни, 2 санузла',
    image: '/images/rancho.png',
    file: '/projects/rancho.pdf',
  },
  {
    id: 6,
    title: 'Тихие Зори',
    description: 'Дом 13х9м, общая площадь 118,2 кв.м., 3 спальни, 1 санузел',
    image: '/images/zori.png',
    file: '/projects/zori.pdf',
  },
  {
    id: 7,
    title: 'Уютное гнездышко',
    description: 'Дом 16х10м, общая площадь 168,4 кв.м., 4 спальни, 3 санузла',
    image: '/images/gnezdo.png',
    file: '/projects/gnezdo.pdf',
  },
  {
    id: 8,
    title: 'Аура',
    description: 'Дом 10х8м, общая площадь 78,6 кв.м., 2 спальни, 1 санузел',
    image: '/images/aura.png',
    file: '/projects/aura.pdf',
  },
  {
    id: 9,
    title: 'Надежда',
    description: 'Дом 18х12м, общая площадь 198,4 кв.м., 5 спален, 3 санузла',
    image: '/images/nade.png',
    file: '/projects/nade.pdf',
  },
];

const ProjectsSection = ({ onCatalogClick }: ProjectsSectionProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Количество проектов для показа на разных экранах
  const getItemsPerView = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3; // lg и больше
      if (window.innerWidth >= 768) return 2;  // md
      return 1; // sm
    }
    return 3; // по умолчанию
  };

  const [itemsPerView, setItemsPerView] = useState(3);

  // Обновляем количество элементов при изменении размера экрана
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
      setCurrentIndex(0); // Сбрасываем индекс при изменении размера
    };

    // Устанавливаем начальное значение
    setItemsPerView(getItemsPerView());
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Общее количество слайдов (групп проектов)
  const totalSlides = Math.ceil(projects.length / itemsPerView);
  
  const handlePrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(totalSlides - 1, prev + 1));
  };

  // Получаем проекты для текущего слайда
  const startIndex = currentIndex * itemsPerView;
  const visibleProjects = projects.slice(startIndex, startIndex + itemsPerView);

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <FadeInSection as="h2" className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Типовые проекты
        </FadeInSection>
        
        {/* Карусель */}
        <div className="relative">
          {/* Стрелка влево */}
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Предыдущий проект"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Стрелка вправо */}
          <button
            onClick={handleNext}
            disabled={currentIndex >= totalSlides - 1}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Следующий проект"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Контейнер проектов */}
          <div className="overflow-hidden">
            <div 
              className="grid transition-transform duration-300 ease-in-out gap-8"
              style={{
                gridTemplateColumns: `repeat(${itemsPerView}, 1fr)`,
              }}
            >
              {visibleProjects.map((project, index) => (
                <FadeInSection 
                  key={`${project.id}-${currentIndex}`} 
                  as="div" 
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                  delay={0.1 * index}
                >
                  <div className="relative h-64">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {project.description}
                    </p>
                    <a
                      href={project.file}
                      download
                      className="w-full block bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-center font-semibold"
                    >
                      Скачать проект
                    </a>
                  </div>
                </FadeInSection>
              ))}
            </div>
          </div>
        </div>

        {/* Индикаторы */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalSlides }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
              }`}
              aria-label={`Перейти к слайду ${index + 1}`}
            />
          ))}
        </div>

        <FadeInSection as="div" className="mt-12 text-center" delay={0.8}>
          <button
            className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-50 transition-colors"
            onClick={onCatalogClick}
          >
            Получить каталог проектов
          </button>
        </FadeInSection>
      </div>
    </section>
  );
};

export default ProjectsSection; 