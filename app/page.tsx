'use client';

import React, { useState } from 'react';
import { MicropostForm, MicropostList } from './components/Micropost';
import styles from './page.module.css';

interface Micropost {
  title: string;
  image_url: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Micropost[]>([]);

  const handleSubmit = (post: Micropost) => {
    setPosts([post, ...posts]);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className="text-3xl font-bold mb-8">マイクロポスト</h1>
        <MicropostForm onSubmit={handleSubmit} />
        <MicropostList posts={posts} />
      </main>
    </div>
  );
}
