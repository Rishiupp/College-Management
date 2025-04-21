import React, { useState } from 'react';
import { Search, Clock, MapPin, ThumbsUp, MessageSquare } from 'lucide-react';
import Button from '../../components/ui/Button';

interface LostItem {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  author: string;
  authorImage: string;
  type: 'lost' | 'found';
  likes: number;
  comments: number;
}

const sampleItems: LostItem[] = [
  {
    id: '1',
    title: 'Lost: Blue Backpack',
    description: 'I lost my blue  backpack near the Engineering building. It has my laptop and notes inside.',
    location: 'Engineering Building',
    date: '2025-04-15T10:30',
    author: 'Harshit gan',
    authorImage: 'https://e7.pngegg.com/pngimages/683/60/png-clipart-man-s-profile-illustration-computer-icons-user-profile-profile-ico-photography-silhouette-thumbnail.png',
    type: 'lost',
    likes: 3,
    comments: 2
  },
  {
    id: '2',
    title: 'Found: Student ID Card',
    description: 'Found a student ID card for Sarah Miller in the library. If it\'s yours, please describe its appearance.',
    location: 'Main Library',
    date: '2025-04-17T15:45',
    author: 'Mika janu',
    authorImage: 'https://e7.pngegg.com/pngimages/683/60/png-clipart-man-s-profile-illustration-computer-icons-user-profile-profile-ico-photography-silhouette-thumbnail.png',
    type: 'found',
    likes: 8,
    comments: 4
  },
  {
    id: '3',
    title: 'Lost: Graphing Calculator',
    description: 'Lost my TI-84 graphing calculator during the Math final. It has my name on the back.',
    location: 'Science Hall, Room 201',
    date: '2025-04-16T14:15',
    author: 'Ronak paad',
    authorImage: 'https://e7.pngegg.com/pngimages/683/60/png-clipart-man-s-profile-illustration-computer-icons-user-profile-profile-ico-photography-silhouette-thumbnail.png',
    type: 'lost',
    likes: 1,
    comments: 0
  }
];

const LostFound: React.FC = () => {
  const [items, setItems] = useState<LostItem[]>(sampleItems);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'lost' | 'found'>('all');
  const [showPostForm, setShowPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    location: '',
    type: 'lost' as 'lost' | 'found'
  });

  const handleLike = (id: string) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, likes: item.likes + 1 } : item
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: LostItem = {
      id: Date.now().toString(),
      title: newPost.title,
      description: newPost.description,
      location: newPost.location,
      date: new Date().toISOString(),
      author: 'You',
      authorImage: 'https://e7.pngegg.com/pngimages/683/60/png-clipart-man-s-profile-illustration-computer-icons-user-profile-profile-ico-photography-silhouette-thumbnail.png',
      type: newPost.type,
      likes: 0,
      comments: 0
    };
    
    setItems([newItem, ...items]);
    setShowPostForm(false);
    setNewPost({
      title: '',
      description: '',
      location: '',
      type: 'lost'
    });
  };

  const filteredItems = items
    .filter(item => filter === 'all' || item.type === filter)
    .filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">Lost & Found</h1>
        <Button onClick={() => setShowPostForm(true)}>Post Item</Button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search lost or found items..."
              className="w-full px-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                        bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                        focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          </div>
          
          <div className="flex space-x-2">
            <button 
              className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
            <button 
              className={`px-4 py-2 rounded-lg ${filter === 'lost' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
              onClick={() => setFilter('lost')}
            >
              Lost
            </button>
            <button 
              className={`px-4 py-2 rounded-lg ${filter === 'found' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
              onClick={() => setFilter('found')}
            >
              Found
            </button>
          </div>
        </div>
      </div>
      
      {showPostForm && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Post a Lost or Found Item</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Item Type
              </label>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-600"
                    name="type"
                    value="lost"
                    checked={newPost.type === 'lost'}
                    onChange={() => setNewPost({...newPost, type: 'lost'})}
                  />
                  <span className="ml-2">Lost Item</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-blue-600"
                    name="type"
                    value="found"
                    checked={newPost.type === 'found'}
                    onChange={() => setNewPost({...newPost, type: 'found'})}
                  />
                  <span className="ml-2">Found Item</span>
                </label>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                          text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief title describing the item"
                value={newPost.title}
                onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                required
              />
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
                placeholder="Provide details about the item"
                value={newPost.description}
                onChange={(e) => setNewPost({...newPost, description: e.target.value})}
                required
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                          text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Where was it lost or found?"
                value={newPost.location}
                onChange={(e) => setNewPost({...newPost, location: e.target.value})}
                required
              />
            </div>
            
            <div className="flex justify-end space-x-3">
              <Button variant="outline" type="button" onClick={() => setShowPostForm(false)}>
                Cancel
              </Button>
              <Button type="submit">
                Post
              </Button>
            </div>
          </form>
        </div>
      )}
      
      <div className="space-y-6">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={item.authorImage}
                  alt={item.author}
                  className="w-10 h-10 rounded-full mr-3 object-cover"
                />
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">{item.author}</h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Clock size={14} className="mr-1" />
                    {new Date(item.date).toLocaleString()}
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
                  <span className={`inline-block px-2 py-1 text-xs rounded mr-2 ${
                    item.type === 'lost' 
                      ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
                      : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                  }`}>
                    {item.type === 'lost' ? 'LOST' : 'FOUND'}
                  </span>
                  {item.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
              
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                <MapPin size={14} className="mr-1" />
                {item.location}
              </div>
              
              <div className="flex justify-between">
                <button 
                  onClick={() => handleLike(item.id)}
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <ThumbsUp size={18} className="mr-1" />
                  {item.likes}
                </button>
                <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <MessageSquare size={18} className="mr-1" />
                  {item.comments}
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {filteredItems.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600 dark:text-gray-300">No items found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LostFound;