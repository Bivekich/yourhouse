import Image from 'next/image';
import FadeInSection from './FadeInSection';

type ProjectsSectionProps = {
  onCatalogClick?: () => void;
};

const projects = [
  {
    id: 1,
    title: 'Проект SD1',
    description: 'Дом 11х9м, общая площадь 101,4 кв.м., 3 спальни, 1 санузел',
    image: '/images/sd1.jpg',
    file: '/projects/sd1.pdf',
  },
  {
    id: 2,
    title: 'Проект SD-2',
    description: 'Дом 14х13 м, общая площадь 142,8 кв.м, 3 спальни, 2 санузла',
    image: '/images/sd2.jpg',
    file: '/projects/sd2.pdf',
  },
  {
    id: 3,
    title: 'Проект SD3',
    description: 'Дом 14,2х10,5 м, общая площадь 131,4 кв.м., 3 спальни, 2 санузла',
    image: '/images/sd3.jpg',
    file: '/projects/sd3.pdf',
  },
];

const ProjectsSection = ({ onCatalogClick }: ProjectsSectionProps) => {
  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <FadeInSection as="h2" className="text-3xl font-bold text-gray-900 mb-12 text-center">
          Типовые проекты
        </FadeInSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <FadeInSection 
              key={project.id} 
              as="div" 
              className="bg-white rounded-lg shadow-lg overflow-hidden"
              delay={0.2 * index}
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