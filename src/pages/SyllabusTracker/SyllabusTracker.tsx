import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Button from '../../components/ui/Button';
import 'react-circular-progressbar/dist/styles.css';

interface Topic {
  id: string;
  name: string;
  completed: boolean;
}

interface Subject {
  id: string;
  name: string;
  topics: Topic[];
  expanded: boolean;
}

const SyllabusTracker: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: '1',
      name: 'Data Structures',
      expanded: false,
      topics: [
        { id: '1-1', name: 'Arrays and Strings', completed: true },
        { id: '1-2', name: 'Linked Lists', completed: true },
        { id: '1-3', name: 'Trees and Graphs', completed: false },
        { id: '1-4', name: 'Dynamic Programming', completed: false },
      ]
    },
    {
      id: '2',
      name: 'Operating Systems',
      expanded: false,
      topics: [
        { id: '2-1', name: 'Process Management', completed: true },
        { id: '2-2', name: 'Memory Management', completed: false },
        { id: '2-3', name: 'File Systems', completed: false },
      ]
    }
  ]);

  const [showAddSubject, setShowAddSubject] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [showAddTopic, setShowAddTopic] = useState<string | null>(null);
  const [newTopicName, setNewTopicName] = useState('');

  const toggleSubject = (subjectId: string) => {
    setSubjects(subjects.map(subject =>
      subject.id === subjectId
        ? { ...subject, expanded: !subject.expanded }
        : subject
    ));
  };

  const toggleTopic = (subjectId: string, topicId: string) => {
    setSubjects(subjects.map(subject =>
      subject.id === subjectId
        ? {
            ...subject,
            topics: subject.topics.map(topic =>
              topic.id === topicId
                ? { ...topic, completed: !topic.completed }
                : topic
            )
          }
        : subject
    ));
  };

  const addSubject = () => {
    if (newSubjectName.trim()) {
      const newSubject: Subject = {
        id: Date.now().toString(),
        name: newSubjectName,
        topics: [],
        expanded: false
      };
      setSubjects([...subjects, newSubject]);
      setNewSubjectName('');
      setShowAddSubject(false);
    }
  };

  const addTopic = (subjectId: string) => {
    if (newTopicName.trim()) {
      const newTopic: Topic = {
        id: Date.now().toString(),
        name: newTopicName,
        completed: false
      };
      setSubjects(subjects.map(subject =>
        subject.id === subjectId
          ? { ...subject, topics: [...subject.topics, newTopic] }
          : subject
      ));
      setNewTopicName('');
      setShowAddTopic(null);
    }
  };

  const deleteSubject = (subjectId: string) => {
    setSubjects(subjects.filter(subject => subject.id !== subjectId));
  };

  const calculateProgress = (topics: Topic[]): number => {
    if (topics.length === 0) return 0;
    const completed = topics.filter(topic => topic.completed).length;
    return Math.round((completed / topics.length) * 100);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Syllabus Tracker</h1>
        <Button onClick={() => setShowAddSubject(true)}>
          <Plus size={18} className="mr-2" />
          Add Subject
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map(subject => {
          const progress = calculateProgress(subject.topics);
          
          return (
            <div key={subject.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <button
                    onClick={() => toggleSubject(subject.id)}
                    className="text-xl font-semibold text-gray-800 dark:text-white flex items-center"
                  >
                    {subject.expanded ? <ChevronUp size={20} className="mr-2" /> : <ChevronDown size={20} className="mr-2" />}
                    {subject.name}
                  </button>
                  <button
                    onClick={() => deleteSubject(subject.id)}
                    className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="w-24 h-24">
                    <CircularProgressbar
                      value={progress}
                      text={`${progress}%`}
                      styles={buildStyles({
                        textSize: '16px',
                        pathColor: progress < 50 ? '#EF4444' : progress < 75 ? '#F59E0B' : '#10B981',
                        textColor: progress < 50 ? '#EF4444' : progress < 75 ? '#F59E0B' : '#10B981',
                        trailColor: '#E5E7EB',
                      })}
                    />
                  </div>
                  <div className="text-right">
                    <p className="text-gray-600 dark:text-gray-300">
                      Topics completed: {subject.topics.filter(t => t.completed).length}/{subject.topics.length}
                    </p>
                  </div>
                </div>

                {subject.expanded && (
                  <div className="space-y-2">
                    {subject.topics.map(topic => (
                      <div
                        key={topic.id}
                        className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={topic.completed}
                            onChange={() => toggleTopic(subject.id, topic.id)}
                            className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 dark:border-gray-600"
                          />
                          <span className={`ml-2 ${topic.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>
                            {topic.name}
                          </span>
                        </label>
                      </div>
                    ))}
                    
                    {showAddTopic === subject.id ? (
                      <div className="mt-4 flex">
                        <input
                          type="text"
                          value={newTopicName}
                          onChange={(e) => setNewTopicName(e.target.value)}
                          placeholder="Enter topic name"
                          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-l-md
                                    text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <Button
                          onClick={() => addTopic(subject.id)}
                          className="rounded-l-none"
                        >
                          Add
                        </Button>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => setShowAddTopic(subject.id)}
                        fullWidth
                      >
                        <Plus size={18} className="mr-2" />
                        Add Topic
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showAddSubject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Add New Subject</h3>
            <input
              type="text"
              value={newSubjectName}
              onChange={(e) => setNewSubjectName(e.target.value)}
              placeholder="Enter subject name"
              className="w-full px-3 py-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-md
                        text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowAddSubject(false)}>
                Cancel
              </Button>
              <Button onClick={addSubject}>
                Add Subject
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SyllabusTracker;