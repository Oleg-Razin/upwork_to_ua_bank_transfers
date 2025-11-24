import { FaCalculator, FaChartLine, FaShieldAlt, FaClock } from 'react-icons/fa';
import Container from '../components/Container';
import Section from '../components/Section';
import FeatureCard from '../molecules/FeatureCard';

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaCalculator size={32} />,
      title: 'Точні розрахунки',
      description: 'Враховуємо всі комісії Upwork, включаючи додаткову комісію 20%'
    },
    {
      icon: <FaChartLine size={32} />,
      title: 'Порівняння методів',
      description: 'Автоматично визначаємо найвигідніший спосіб виводу коштів'
    },
    {
      icon: <FaShieldAlt size={32} />,
      title: 'Безпека даних',
      description: 'Всі розрахунки відбуваються локально у вашому браузері'
    },
    {
      icon: <FaClock size={32} />,
      title: 'Миттєвий результат',
      description: 'Отримайте розрахунок за лічені секунди без реєстрації'
    }
  ];

  return (
    <Section background="secondary" padding="lg">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Переваги цього калькулятора
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Професійний інструмент для українських фрілансерів, 
            який допоможе планувати бюджет та обирати оптимальні способи виводу коштів.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default FeaturesSection;