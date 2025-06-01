import Image from 'next/image';
import FadeInSection from './FadeInSection';

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <FadeInSection as="div" className="flex-1 relative h-[500px] w-full">
            <Image
              src="/images/company.jpg"
              alt="О нашей компании"
              fill
              className="object-cover rounded-lg shadow-xl"
            />
          </FadeInSection>
          <FadeInSection as="div" className="flex-1" delay={0.2}>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              О компании
            </h2>
            <p className="text-gray-600 mb-6">
              Мы - команда профессионалов с более чем 10-летним опытом в строительстве 
              современных домов. Наша миссия - создавать качественное и комфортное 
              жилье для наших клиентов.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <FadeInSection as="div" delay={0.3}>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600 mb-2">10+</div>
                  <div className="text-gray-600">Лет на рынке</div>
                </div>
              </FadeInSection>
              <FadeInSection as="div" delay={0.4}>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600 mb-2">123</div>
                  <div className="text-gray-600">Реализованных проекта</div>
                </div>
              </FadeInSection>
              <FadeInSection as="div" delay={0.5}>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600 mb-2">22</div>
                  <div className="text-gray-600">Проекта в работе</div>
                </div>
              </FadeInSection>
              <FadeInSection as="div" delay={0.6}>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-600 mb-2">100%</div>
                  <div className="text-gray-600">Гарантия качества</div>
                </div>
              </FadeInSection>
            </div>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

export default AboutSection; 