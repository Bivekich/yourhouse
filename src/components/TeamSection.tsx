import Image from 'next/image';
import FadeInSection from './FadeInSection';

const team = [
  {
    id: 1,
    name: 'Степанов Денис',
    position: 'Основатель и владелец компании',
    image: '/images/Stepan.jpg',
  },
  {
    id: 2,
    name: 'Романов Даниил',
    position: 'Генеральный директор',
    image: '/images/Roman.jpg',
  },
  {
    id: 3,
    name: 'Степанова Оксана',
    position: 'Финансовый директор',
    image: '/images/Oksana.jpg',
  },
  {
    id: 4,
    name: 'Семенов Максим',
    position: 'Производитель работ',
    image: '/images/Maksim.jpg',
  },
];

const TeamSection = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <FadeInSection as="h2" className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 md:mb-12 text-center">
          Наша команда
        </FadeInSection>
        <FadeInSection as="p" className="text-base sm:text-lg text-gray-600 text-center mb-8 md:mb-12 max-w-2xl mx-auto" delay={0.2}>
          Каждый день работает над тем, чтобы предоставить лучший сервис и сделать наших клиентов счастливыми
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {team.map((member, index) => (
            <FadeInSection 
              key={member.id} 
              as="div" 
              className="text-center bg-gray-50 p-4 rounded-xl hover:shadow-lg transition-shadow"
              delay={0.3 + (index * 0.1)}
            >
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                {member.name}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">
                {member.position}
              </p>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection; 