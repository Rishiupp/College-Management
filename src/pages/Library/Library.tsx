import React, { useState } from 'react';
import { Search, BookOpen, BookMarked, Clock } from 'lucide-react';
import Button from '../../components/ui/Button';

interface Book {
  id: string;
  title: string;
  author: string;
  category: string;
  isbn: string;
  available: boolean;
  dueDate?: string;
  coverImage: string;
}

const sampleBooks: Book[] = [
  {
    id: '1',
    title: 'Introduction to Algorithms',
    author: 'Rishi',
    category: 'Computer Science',
    isbn: '978-0262033848',
    available: true,
    coverImage: 'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '2',
    title: 'Physics of the Impossible',
    author: 'Kala Bhai',
    category: 'Physics',
    isbn: '978-0307278821',
    available: false,
    dueDate: '2025-05-01',
    coverImage: 'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=300'
  },
  {
    id: '3',
    title: 'Calculus: Early Transcendentals',
    author: 'Jamenss papa',
    category: 'Mathematics',
    isbn: '978-1285741550',
    available: true,
    coverImage: 'https://images.pexels.com/photos/2927750/pexels-photo-2927750.jpeg?auto=compress&cs=tinysrgb&w=300'
  }
];

const categories = ['All', 'Computer Science', 'Physics', 'Mathematics', 'Chemistry', 'Biology'];

const Library: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showReserveModal, setShowReserveModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const filteredBooks = sampleBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.includes(searchTerm);
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleReserve = (book: Book) => {
    setSelectedBook(book);
    setShowReserveModal(true);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">Library</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search by title, author, or ISBN..."
              className="w-full px-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                        bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                        focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          </div>

          <select
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                      focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map(book => (
          <div key={book.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="h-48 overflow-hidden">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{book.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">by {book.author}</p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
                <BookOpen size={16} className="mr-1" />
                {book.category}
              </div>
              <div className="flex items-center text-sm mb-4">
                <BookMarked size={16} className="mr-1" />
                <span className="text-gray-600 dark:text-gray-300">ISBN: {book.isbn}</span>
              </div>
              {book.available ? (
                <Button onClick={() => handleReserve(book)} fullWidth>
                  Reserve Book
                </Button>
              ) : (
                <div className="flex items-center text-sm text-red-500">
                  <Clock size={16} className="mr-1" />
                  Due back on {new Date(book.dueDate!).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showReserveModal && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Reserve Book
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You are about to reserve "{selectedBook.title}". The book will be held for 24 hours.
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowReserveModal(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                setShowReserveModal(false);
              }}>
                Confirm Reservation
              </Button>
            </div>
          </div>
        </div>
      )}

      {filteredBooks.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">No books found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Library;