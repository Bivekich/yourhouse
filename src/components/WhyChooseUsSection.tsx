import { Shield, FileText, Clock, Users } from 'lucide-react';
import FadeInSection from './FadeInSection';

const features = [
  {
    icon: Shield,
    title: 'Аккредитованный застройщик',
    description: 'Ведущими банками для оформления безопасной и выгодной сделки',
  },
  {
    icon: FileText,
    title: 'Открытые и честные сметы',
    description: 'Закрытый договор с фиксацией цены, стоимость не изменится на протяжении всего строительства',
  },
  {
    icon: Clock,
    title: 'Повышенная гарантия до 20 лет',
    description: 'Гарантия качества дома',
  },
  {
    icon: Users,
    title: 'Профессиональная команда',
    description: 'Опытные специалисты с многолетним стажем в строительстве',
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <FadeInSection as="h2" className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Почему выбирают нас?
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FadeInSection 
              key={index} 
              as="div" 
              className="bg-white p-6 rounded-lg shadow-sm"
              delay={0.2 * index}
            >
              <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection; 