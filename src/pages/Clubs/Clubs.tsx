import React, { useState } from 'react';
import { Users, Plus, UserPlus } from 'lucide-react';
import Button from '../../components/ui/Button';

interface Club {
  id: string;
  name: string;
  category: 'sports' | 'cultural' | 'technical';
  description: string;
  members: number;
}

const sampleClubs: Club[] = [
  { id: '1', name: 'Football Club', category: 'sports', description: 'Campus football team and recreational play', members: 22 },
  { id: '2', name: 'Basketball Team', category: 'sports', description: 'Competitive basketball for all skill levels', members: 15 },
  { id: '3', name: 'Cricket Club', category: 'sports', description: 'Join us for cricket practice and matches', members: 18 },
  { id: '4', name: 'Dance Troupe', category: 'cultural', description: 'Express yourself through various dance styles', members: 24 },
  { id: '5', name: 'Music Band', category: 'cultural', description: 'For all music enthusiasts and performers', members: 12 },
  { id: '6', name: 'Drama Club', category: 'cultural', description: 'Theater and performance arts group', members: 16 },
  { id: '7', name: 'Web Dev Club', category: 'technical', description: 'Learn and build web applications together', members: 28 },
  { id: '8', name: 'Competitive Programming', category: 'technical', description: 'Sharpen your coding skills for competitions', members: 20 },
];

const Clubs: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'sports' | 'cultural' | 'technical'>('all');
  const [activeSection, setActiveSection] = useState<'browse' | 'create'>('browse');

  const filteredClubs = filter === 'all' 
    ? sampleClubs 
    : sampleClubs.filter(club => club.category === filter);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">Clubs</h1>
        
        <div className="flex space-x-3">
          <Button 
            variant={activeSection === 'browse' ? 'primary' : 'outline'} 
            onClick={() => setActiveSection('browse')}
          >
            <Users size={18} className="mr-2" />
            Browse Clubs
          </Button>
          <Button 
            variant={activeSection === 'create' ? 'primary' : 'outline'} 
            onClick={() => setActiveSection('create')}
          >
            <Plus size={18} className="mr-2" />
            Create Club
          </Button>
        </div>
      </div>

      {activeSection === 'browse' && (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6 overflow-hidden">
            <div className="flex flex-wrap">
              <button 
                className={`px-4 py-3 focus:outline-none ${filter === 'all' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                onClick={() => setFilter('all')}
              >
                All Clubs
              </button>
              <button 
                className={`px-4 py-3 focus:outline-none ${filter === 'sports' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                onClick={() => setFilter('sports')}
              >
                Sports
              </button>
              <button 
                className={`px-4 py-3 focus:outline-none ${filter === 'cultural' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                onClick={() => setFilter('cultural')}
              >
                Cultural
              </button>
              <button 
                className={`px-4 py-3 focus:outline-none ${filter === 'technical' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
                onClick={() => setFilter('technical')}
              >
                Technical
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club) => (
              <div key={club.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{club.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      club.category === 'sports' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      club.category === 'cultural' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {club.category.charAt(0).toUpperCase() + club.category.slice(1)}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{club.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <Users size={16} className="mr-1" />
                      {club.members} members
                    </span>
                    <Button variant="outline" size="sm">
                      <UserPlus size={16} className="mr-1" />
                      Join
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {activeSection === 'create' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Create a New Club</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Club Name
              </label>
              <input 
                type="text" 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                          text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter club name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                          text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a category</option>
                <option value="sports">Sports</option>
                <option value="cultural">Cultural</option>
                <option value="technical">Technical</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea 
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                          text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                placeholder="Describe your club's purpose and activities"
              ></textarea>
            </div>
            <Button type="submit">
              <Plus size={18} className="mr-2" />
              Create Club
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Clubs;