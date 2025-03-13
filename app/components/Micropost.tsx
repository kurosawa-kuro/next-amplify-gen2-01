'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { type MicropostType, createMicropost } from '../actions/microposts';
import { useRouter } from 'next/navigation';
import { Amplify } from 'aws-amplify';
import { uploadData } from 'aws-amplify/storage';
import config from '../../amplify_outputs.json';

export const MicropostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [bucketReady, setBucketReady] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const checkBucketConfig = async () => {
      try {
        Amplify.configure(config);
        console.log('Amplify Config:', config);
        if (!config.storage?.bucket_name) {
          throw new Error('バケットが設定されていません');
        }
        setBucketReady(true);
      } catch (error) {
        console.error('ストレージ設定エラー:', error);
        alert('ストレージの設定が見つかりません。管理者に連絡してください。');
      }
    };

    checkBucketConfig();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !selectedFile || !bucketReady) return;

    try {
      setIsSubmitting(true);

      const fileReader = new FileReader();
      const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
        fileReader.onload = () => resolve(fileReader.result as ArrayBuffer);
        fileReader.onerror = () => reject(fileReader.error);
        fileReader.readAsArrayBuffer(selectedFile);
      });

      // S3にアップロード
      const fileName = `${Date.now()}-${selectedFile.name}`;
      console.log('Uploading to:', fileName);
      const result = await uploadData({
        data: arrayBuffer,
        path: `public/${fileName}`  // publicプレフィックスを付与
      }).result;

      const imageUrl = `https://${config.storage.bucket_name}.s3.${config.storage.aws_region}.amazonaws.com/${result.path}`;

      await createMicropost({ 
        title, 
        image_url: imageUrl
      });

      setTitle('');
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
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
        <label className="block text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
          画像
        </label>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-900 dark:text-gray-100
                   file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-blue-700
                   hover:file:bg-blue-100"
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
        disabled={isSubmitting || !selectedFile || !bucketReady}
      >
        {!bucketReady ? 'ストレージ設定を確認中...' : (isSubmitting ? '投稿中...' : '投稿する')}
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