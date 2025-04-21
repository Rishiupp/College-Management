import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  delay?: number;
}

const Card: React.FC<CardProps> = ({ title, description, icon, path, delay = 0 }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <div
      ref={cardRef}
      onClick={() => navigate(path)}
      className={`
        bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden
        cursor-pointer hover:shadow-lg transform transition-all duration-300
        hover:-translate-y-1 h-full 
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="p-6">
        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default Card;