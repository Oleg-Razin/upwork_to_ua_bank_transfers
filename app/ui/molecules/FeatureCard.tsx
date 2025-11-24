import { ReactNode } from 'react';
import Card from '../atoms/Card';

interface FeatureCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard = ({ icon, title, description, className = '' }: FeatureCardProps) => {
  return (
    <Card className={`text-center hover:shadow-lg transition-shadow ${className}`}>
      {icon && (
        <div className="flex justify-center mb-4 text-green-500 text-4xl">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-sm">
        {description}
      </p>
    </Card>
  );
};

export default FeatureCard;