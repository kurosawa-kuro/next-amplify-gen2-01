import React, { useState } from 'react';

interface Micropost {
  title: string;
  image_url: string;
}

interface MicropostFormProps {
  onSubmit: (post: Micropost) => void;
}

export const MicropostForm: React.FC<MicropostFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, image_url: imageUrl });
    setTitle('');
    setImageUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-8">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          タイトル
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
          画像URL
        </label>
        <input
          id="image_url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        投稿する
      </button>
    </form>
  );
};

interface MicropostListProps {
  posts: Micropost[];
}

export const MicropostList: React.FC<MicropostListProps> = ({ posts }) => {
  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <div key={index} className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">{post.title}</h2>
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-48 object-cover rounded-md"
          />
        </div>
      ))}
    </div>
  );
}; 