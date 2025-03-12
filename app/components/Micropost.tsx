'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { type MicropostType, createMicropost } from '../actions/microposts';
import { useRouter } from 'next/navigation';

export const MicropostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await createMicropost({ title, image_url: imageUrl });
      setTitle('');
      setImageUrl('');
      router.refresh();
    } catch (error) {
      console.error('投稿エラー:', error);
      alert('投稿に失敗しました。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          タイトル
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400"
          required
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label htmlFor="image_url" className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          画像URL
        </label>
        <input
          id="image_url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-3 
                   bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400"
          required
          disabled={isSubmitting}
        />
      </div>
      <button
        type="submit"
        className="w-full px-6 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 
                 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors duration-200
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? '投稿中...' : '投稿する'}
      </button>
    </form>
  );
};

interface MicropostListProps {
  posts: MicropostType[];
}

export const MicropostList: React.FC<MicropostListProps> = ({ posts }) => {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h2>
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <Image
                src={post.image_url}
                alt={post.title}
                width={200}
                height={160}
                className="object-cover w-full h-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}; 