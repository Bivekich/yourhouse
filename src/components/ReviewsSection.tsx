import Image from 'next/image';
import { Star } from 'lucide-react';
import FadeInSection from './FadeInSection';

type ReviewsSectionProps = {
  onExcursionClick?: () => void;
};

const reviews = [
  {
    id: 1,
    name: 'Александр Петров',
    text: 'Очень доволен качеством строительства. Команда профессионалов, все работы выполнены в срок и с соблюдением всех норм.',
    rating: 5,
    image: '/images/Sasha.jpg',
  },
  {
    id: 2,
    name: 'Елена Смирнова',
    text: 'Спасибо за отличную работу! Дом построен качественно, все пожелания были учтены. Рекомендую всем!',
    rating: 5,
    image: '/images/Elena.jpg',
  },
  {
    id: 3,
    name: 'Дмитрий Иванов',
    text: 'Профессиональный подход к делу. Все этапы строительства контролировались, результат превзошел ожидания.',
    rating: 5,
    image: '/images/Dmitry.jpg',
  },
];

const ReviewsSection = ({ onExcursionClick }: ReviewsSectionProps) => {
  return (
    <section id="reviews" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <FadeInSection as="h2" className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Отзывы клиентов
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <FadeInSection 
              key={review.id} 
              as="div" 
              className="bg-white p-6 rounded-lg shadow-sm"
              delay={0.2 * index}
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={review.image}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {review.name}
                  </h3>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                {review.text}
              </p>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection as="div" className="mt-12 text-center" delay={0.8}>
          <button
            className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-50 transition-colors"
            onClick={onExcursionClick}
          >
            Записаться на экскурсию
          </button>
        </FadeInSection>
      </div>
    </section>
  );
};

export default ReviewsSection; 