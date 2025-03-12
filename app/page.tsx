import React, { Suspense } from 'react';
import { MicropostForm, MicropostList } from './components/Micropost';
import { getMicroposts } from './actions/microposts';
import styles from './page.module.css';

export default async function Home() {
  const posts = await getMicroposts();

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white text-center">
          マイクロポスト
        </h1>
        <Suspense fallback={
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
          </div>
        }>
          <MicropostForm />
          <MicropostList posts={posts} />
        </Suspense>
      </main>
    </div>
  );
}
