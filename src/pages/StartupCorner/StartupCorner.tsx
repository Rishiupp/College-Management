import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Share2, Plus, User } from 'lucide-react';
import Button from '../../components/ui/Button';

interface Comment {
  id: string;
  author: string;
  authorImage: string;
  content: string;
  timestamp: string;
}

interface Post {
  id: string;
  title: string;
  description: string;
  author: string;
  authorImage: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  liked: boolean;
}

const samplePosts: Post[] = [
  {
    id: '1',
    title: 'Campus Food Delivery App',
    description: 'A platform connecting students with local restaurants for quick and affordable food delivery within campus.',
    author: 'Abhinav',
    authorImage: 'https://e7.pngegg.com/pngimages/683/60/png-clipart-man-s-profile-illustration-computer-icons-user-profile-profile-ico-photography-silhouette-thumbnail.png',
    timestamp: '2025-04-15T10:30:00Z',
    likes: 24,
    liked: false,
    comments: [
      {
        id: '1-1',
        author: 'Sarah',
        authorImage: 'https://e7.pngegg.com/pngimages/683/60/png-clipart-man-s-profile-illustration-computer-icons-user-profile-profile-ico-photography-silhouette-thumbnail.png',
        content: 'Great idea! Would love to see this implemented.',
        timestamp: '2025-04-15T11:00:00Z'
      }
    ]
  },
  {
    id: '2',
    title: 'Study Group Finder',
    description: 'An app that helps students find and join study groups based on their courses and schedules.',
    author: 'Raju',
    authorImage: 'https://e7.pngegg.com/pngimages/683/60/png-clipart-man-s-profile-illustration-computer-icons-user-profile-profile-ico-photography-silhouette-thumbnail.png',
    timestamp: '2025-04-14T15:45:00Z',
    likes: 18,
    liked: false,
    comments: []
  }
];

const StartupCorner: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    description: ''
  });
  const [showComments, setShowComments] = useState<string | null>(null);
  const [newComment, setNewComment] = useState('');

  const handleLike = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked }
        : post
    ));
  };

  const handleAddComment = (postId: string) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      authorImage: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
      content: newComment,
      timestamp: new Date().toISOString()
    };

    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, comments: [...post.comments, comment] }
        : post
    ));

    setNewComment('');
  };

  const handleSubmitPost = () => {
    if (!newPost.title.trim() || !newPost.description.trim()) return;

    const post: Post = {
      id: Date.now().toString(),
      title: newPost.title,
      description: newPost.description,
      author: 'You',
      authorImage: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=100',
      timestamp: new Date().toISOString(),
      likes: 0,
      liked: false,
      comments: []
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', description: '' });
    setShowNewPostModal(false);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Startup Corner</h1>
        <Button onClick={() => setShowNewPostModal(true)}>
          <Plus size={18} className="mr-2" />
          Share Idea
        </Button>
      </div>

      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <img
                  src={post.authorImage}
                  alt={post.author}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-medium text-gray-800 dark:text-white">{post.author}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(post.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{post.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{post.description}</p>

              <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center ${
                    post.liked
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  <ThumbsUp size={18} className="mr-1" />
                  {post.likes}
                </button>

                <button
                  onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                  className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                  <MessageSquare size={18} className="mr-1" />
                  {post.comments.length}
                </button>

                <button className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <Share2 size={18} className="mr-1" />
                  Share
                </button>
              </div>

              {showComments === post.id && (
                <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                  {post.comments.map(comment => (
                    <div key={comment.id} className="flex items-start mb-4">
                      <img
                        src={comment.authorImage}
                        alt={comment.author}
                        className="w-8 h-8 rounded-full mr-3"
                      />
                      <div className="flex-1">
                        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                          <p className="font-medium text-gray-800 dark:text-white">{comment.author}</p>
                          <p className="text-gray-600 dark:text-gray-300">{comment.content}</p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {new Date(comment.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-start mt-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
                      <User size={16} className="text-gray-500 dark:text-gray-400" />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                                  text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddComment(post.id)}
                        className="mt-2"
                      >
                        Post Comment
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {showNewPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Share Your Startup Idea</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                placeholder="Give your idea a catchy title"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                          text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={newPost.description}
                onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                placeholder="Describe your startup idea..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                          text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800
                          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowNewPostModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitPost}>
                Share Idea
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartupCorner;