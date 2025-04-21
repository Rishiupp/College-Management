import React, { useEffect, useState } from 'react';
import { Book, Users, Calendar, Search, Activity, BookOpen, Lightbulb, Package } from 'lucide-react';
import Card from '../../components/ui/Card';

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const modules = [
    {
      title: 'Clubs',
      description: 'Join, create and manage campus clubs',
      icon: <Users className="text-blue-600 dark:text-blue-400" size={24} />,
      path: '/clubs',
    },
    {
      title: 'Attendance Tracker',
      description: 'Monitor your class attendance',
      icon: <Calendar className="text-purple-600 dark:text-purple-400" size={24} />,
      path: '/attendance',
    },
    {
      title: 'Lost & Found',
      description: 'Report or find lost items',
      icon: <Search className="text-green-600 dark:text-green-400" size={24} />,
      path: '/lostfound',
    },
    {
      title: 'Library',
      description: 'Browse available books and resources',
      icon: <Book className="text-amber-600 dark:text-amber-400" size={24} />,
      path: '/library',
    },
    {
      title: 'Wellness',
      description: 'Resources for physical and mental wellbeing',
      icon: <Activity className="text-red-600 dark:text-red-400" size={24} />,
      path: '/wellness',
    },
    {
      title: 'Syllabus Tracker',
      description: 'Track your academic progress',
      icon: <BookOpen className="text-indigo-600 dark:text-indigo-400" size={24} />,
      path: '/syllabus',
    },
    {
      title: 'Startup Corner',
      description: 'Share and discover startup ideas',
      icon: <Lightbulb className="text-cyan-600 dark:text-cyan-400" size={24} />,
      path: '/startup',
    },
    {
      title: 'Inventory',
      description: 'Manage club equipment and resources',
      icon: <Package className="text-fuchsia-600 dark:text-fuchsia-400" size={24} />,
      path: '/inventory',
    },
  ];

  const filteredModules = modules.filter(module => 
    module.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    module.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">Dashboard</h1>
      
      <div className="mb-8 relative max-w-md">
        <input
          type="text"
          placeholder="Search modules..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredModules.map((module, index) => (
          <Card
            key={module.title}
            title={module.title}
            description={module.description}
            icon={module.icon}
            path={module.path}
            delay={index * 100}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;