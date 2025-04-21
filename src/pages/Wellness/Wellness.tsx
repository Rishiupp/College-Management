import React, { useState } from 'react';
import { Dumbbell, Cog as Yoga, Brain, Play, ExternalLink } from 'lucide-react';
import Button from '../../components/ui/Button';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  youtubeId: string;
  category: 'yoga' | 'gym' | 'motivation';
}

const videos: Video[] = [
  {
    id: '1',
    title: 'Morning Yoga Routine',
    description: '20-minute energizing yoga flow to start your day',
    thumbnail: 'https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=300',
    youtubeId: 'v9LsMHvwQds',
    category: 'yoga'
  },
  {
    id: '2',
    title: 'Full Body Workout',
    description: 'No equipment needed - 30-minute intense workout',
    thumbnail: 'https://images.pexels.com/photos/4162487/pexels-photo-4162487.jpeg?auto=compress&cs=tinysrgb&w=300',
    youtubeId: 'oKPAqY2OovY',
    category: 'gym'
  },
  {
    id: '3',
    title: 'Mindset for Success',
    description: 'Transform your mindset and achieve your goals',
    thumbnail: 'https://images.pexels.com/photos/3758104/pexels-photo-3758104.jpeg?auto=compress&cs=tinysrgb&w=300',
    youtubeId: 'oKPAqY2OovY',
    category: 'motivation'
  }
];

const Wellness: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'yoga' | 'gym' | 'motivation'>('yoga');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const categories = [
    { id: 'yoga', label: 'Yoga', icon: <Yoga size={20} /> },
    { id: 'gym', label: 'Gym', icon: <Dumbbell size={20} /> },
    { id: 'motivation', label: 'Motivation', icon: <Brain size={20} /> }
  ];

  const filteredVideos = videos.filter(video => video.category === activeCategory);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">Wellness Center</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6 overflow-hidden">
        <div className="flex flex-wrap">
          {categories.map(category => (
            <button
              key={category.id}
              className={`
                flex items-center px-6 py-3 focus:outline-none transition-colors
                ${activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'
                }
              `}
              onClick={() => setActiveCategory(category.id as typeof activeCategory)}
            >
              {category.icon}
              <span className="ml-2">{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map(video => (
          <div key={video.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="relative group cursor-pointer" onClick={() => setSelectedVideo(video)}>
              <img
                src={video.thumbnail}
                alt={video.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play size={48} className="text-white" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{video.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{video.description}</p>
              <Button
                onClick={() => setSelectedVideo(video)}
                fullWidth
              >
                Watch Video
              </Button>
            </div>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-4xl w-full">
            <div className="relative pt-[56.25%]">
              <iframe
                className="absolute inset-0 w-full h-full rounded-t-lg"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {selectedVideo.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {selectedVideo.description}
                  </p>
                </div>
                <a
                  href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <ExternalLink size={20} />
                </a>
              </div>
              <Button
                variant="outline"
                onClick={() => setSelectedVideo(null)}
                fullWidth
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wellness;
