import React, { useState } from 'react';
import { Package, Search, Filter, Plus, User, Calendar } from 'lucide-react';
import Button from '../../components/ui/Button';

interface Equipment {
  id: string;
  name: string;
  category: string;
  status: 'available' | 'checked-out';
  checkedOutTo?: string;
  checkedOutDate?: string;
  dueDate?: string;
  condition: 'excellent' | 'good' | 'fair' | 'poor';
}

const sampleEquipment: Equipment[] = [
  {
    id: '1',
    name: 'Football',
    category: 'Sports',
    status: 'checked-out',
    checkedOutTo: 'John Smith',
    checkedOutDate: '2025-04-15T10:00:00Z',
    dueDate: '2025-04-17T10:00:00Z',
    condition: 'good'
  },
  {
    id: '2',
    name: 'Tennis Racket',
    category: 'Sports',
    status: 'available',
    condition: 'excellent'
  },
  {
    id: '3',
    name: 'Basketball',
    category: 'Sports',
    status: 'available',
    condition: 'fair'
  }
];

const categories = ['All', 'Sports', 'Music', 'Technology', 'Art'];
const conditions = ['excellent', 'good', 'fair', 'poor'];

const Inventory: React.FC = () => {
  const [equipment, setEquipment] = useState<Equipment[]>(sampleEquipment);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [newEquipment, setNewEquipment] = useState({
    name: '',
    category: 'Sports',
    condition: 'good' as Equipment['condition']
  });
  const [checkoutDetails, setCheckoutDetails] = useState({
    name: '',
    dueDate: ''
  });

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddEquipment = () => {
    if (!newEquipment.name.trim()) return;

    const equipment: Equipment = {
      id: Date.now().toString(),
      name: newEquipment.name,
      category: newEquipment.category,
      status: 'available',
      condition: newEquipment.condition
    };

    setEquipment(prev => [...prev, equipment]);
    setNewEquipment({
      name: '',
      category: 'Sports',
      condition: 'good'
    });
    setShowAddModal(false);
  };

  const handleCheckout = () => {
    if (!selectedEquipment || !checkoutDetails.name || !checkoutDetails.dueDate) return;

    setEquipment(equipment.map(item =>
      item.id === selectedEquipment.id
        ? {
            ...item,
            status: 'checked-out',
            checkedOutTo: checkoutDetails.name,
            checkedOutDate: new Date().toISOString(),
            dueDate: new Date(checkoutDetails.dueDate).toISOString()
          }
        : item
    ));

    setCheckoutDetails({ name: '', dueDate: '' });
    setShowCheckoutModal(false);
    setSelectedEquipment(null);
  };

  const handleReturn = (id: string) => {
    setEquipment(equipment.map(item =>
      item.id === id
        ? {
            ...item,
            status: 'available',
            checkedOutTo: undefined,
            checkedOutDate: undefined,
            dueDate: undefined
          }
        : item
    ));
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Inventory Management</h1>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus size={18} className="mr-2" />
          Add Equipment
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search equipment..."
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
        {filteredEquipment.map(item => (
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{item.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  item.status === 'available'
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {item.status === 'available' ? 'Available' : 'Checked Out'}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Category: {item.category}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Condition: {item.condition.charAt(0).toUpperCase() + item.condition.slice(1)}
                </p>
                {item.status === 'checked-out' && (
                  <>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Checked out to: {item.checkedOutTo}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Due: {new Date(item.dueDate!).toLocaleDateString()}
                    </p>
                  </>
                )}
              </div>

              {item.status === 'available' ? (
                <Button
                  onClick={() => {
                    setSelectedEquipment(item);
                    setShowCheckoutModal(true);
                  }}
                  fullWidth
                >
                  Check Out
                </Button>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => handleReturn(item.id)}
                  fullWidth
                >
                  Return
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Add New Equipment</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                value={newEquipment.name}
                onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                          text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                value={newEquipment.category}
                onChange={(e) => setNewEquipment({ ...newEquipment, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                          text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.slice(1).map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Condition
              </label>
              <select
                value={newEquipment.condition}
                onChange={(e) => setNewEquipment({ ...newEquipment, condition: e.target.value as Equipment['condition'] })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                          text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {conditions.map(condition => (
                  <option key={condition} value={condition}>
                    {condition.charAt(0).toUpperCase() + condition.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddEquipment}>
                Add Equipment
              </Button>
            </div>
          </div>
        </div>
      )}

      {showCheckoutModal && selectedEquipment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Check Out Equipment
            </h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Student Name
              </label>
              <input
                type="text"
                value={checkoutDetails.name}
                onChange={(e) => setCheckoutDetails({ ...checkoutDetails, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                          text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={checkoutDetails.dueDate}
                onChange={(e) => setCheckoutDetails({ ...checkoutDetails, dueDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                          text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => {
                setShowCheckoutModal(false);
                setSelectedEquipment(null);
                setCheckoutDetails({ name: '', dueDate: '' });
              }}>
                Cancel
              </Button>
              <Button onClick={handleCheckout}>
                Check Out
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;