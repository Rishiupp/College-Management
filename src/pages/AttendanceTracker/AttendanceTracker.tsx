import React, { useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Plus, Trash2, Calendar, AlertCircle } from 'lucide-react';
import Button from '../../components/ui/Button';

interface Subject {
  id: string;
  name: string;
  attended: number;
  total: number;
}

const AttendanceTracker: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: '1', name: 'Mathematics', attended: 18, total: 22 },
    { id: '2', name: 'Computer Science', attended: 15, total: 20 },
    { id: '3', name: 'Physics', attended: 12, total: 20 },
  ]);
  const [newSubject, setNewSubject] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState<string | null>(null);

  const handleAddSubject = () => {
    if (newSubject.trim()) {
      setSubjects([
        ...subjects,
        { id: Date.now().toString(), name: newSubject, attended: 0, total: 0 }
      ]);
      setNewSubject('');
    }
  };

  const confirmDelete = (id: string) => {
    setSubjectToDelete(id);
    setShowConfirmation(true);
  };

  const handleDelete = () => {
    if (subjectToDelete) {
      setSubjects(subjects.filter(subject => subject.id !== subjectToDelete));
      setShowConfirmation(false);
      setSubjectToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setSubjectToDelete(null);
  };

  const incrementAttended = (id: string) => {
    setSubjects(subjects.map(subject => {
      if (subject.id === id) {
        return { ...subject, attended: subject.attended + 1, total: subject.total + 1 };
      }
      return subject;
    }));
  };

  const incrementMissed = (id: string) => {
    setSubjects(subjects.map(subject => {
      if (subject.id === id) {
        return { ...subject, total: subject.total + 1 };
      }
      return subject;
    }));
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6">Attendance Tracker</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Add New Subject</h2>
        <div className="flex">
          <input
            type="text"
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md
                      text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter subject name"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
          />
          <Button
            onClick={handleAddSubject}
            className="rounded-l-none"
          >
            <Plus size={18} className="mr-2" />
            Add Subject
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map(subject => {
          const attendancePercentage = subject.total > 0 
            ? Math.round((subject.attended / subject.total) * 100) 
            : 0;
          
          const isLow = attendancePercentage < 75;
          
          return (
            <div 
              key={subject.id} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{subject.name}</h3>
                <button 
                  onClick={() => confirmDelete(subject.id)}
                  className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div className="w-24 h-24">
                  <CircularProgressbar
                    value={attendancePercentage}
                    text={`${attendancePercentage}%`}
                    styles={buildStyles({
                      textSize: '16px',
                      pathColor: isLow ? '#EF4444' : '#10B981',
                      textColor: isLow ? '#EF4444' : '#10B981',
                      trailColor: '#E5E7EB',
                    })}
                  />
                </div>
                
                <div className="text-right">
                  <p className="text-gray-600 dark:text-gray-300">
                    Classes attended: <span className="font-semibold">{subject.attended}/{subject.total}</span>
                  </p>
                  {isLow && (
                    <p className="text-red-500 flex items-center justify-end mt-2">
                      <AlertCircle size={16} className="mr-1" />
                      Below 75% attendance
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => incrementAttended(subject.id)}
                  className="flex-1 mr-2"
                >
                  Attended
                </Button>
                <Button
                  variant="outline"
                  onClick={() => incrementMissed(subject.id)}
                  className="flex-1"
                >
                  Missed
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Schedule Upload Section */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <Calendar size={24} className="text-blue-600 dark:text-blue-400 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Weekly Schedule</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">Upload your weekly class schedule to get notifications.</p>
        <div className="flex items-center">
          <input
            type="file"
            id="schedule"
            className="hidden"
            accept=".pdf,.doc,.docx,image/*"
          />
          <label
            htmlFor="schedule"
            className="px-4 py-2 bg-blue-600 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-colors"
          >
            Upload Schedule
          </label>
          <span className="ml-4 text-gray-500 dark:text-gray-400 text-sm">
            Accepted formats: PDF, DOC, DOCX, or images
          </span>
        </div>
      </div>
      
      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Are you sure you want to remove this subject? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={cancelDelete}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceTracker;