'use server';

import { cookiesClient } from "@/utils/amplify-utils";

export type MicropostType = {
  id: string;
  title: string;
  image_url: string;
  createdAt: string;
  updatedAt: string;
};

export async function getMicroposts() {
  try {
    const { data } = await cookiesClient.models.Micropost.list();
    return data.map(post => ({
      id: post.id,
      title: post.title ?? '',
      image_url: post.image_url ?? '',
      createdAt: post.createdAt,
      updatedAt: post.updatedAt
    })).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  } catch (err) {
    throw err instanceof Error ? err : new Error('Unknown error occurred');
  }
}

export async function createMicropost(post: { title: string; image_url: string }) {
  try {
    const { data: newPost } = await cookiesClient.models.Micropost.create({
      title: post.title,
      image_url: post.image_url
    });
    
    if (!newPost) {
      throw new Error('Failed to create post');
    }
    
    return {
      id: newPost.id,
      title: newPost.title ?? '',
      image_url: newPost.image_url ?? '',
      createdAt: newPost.createdAt,
      updatedAt: newPost.updatedAt
    };
  } catch (err) {
    throw err instanceof Error ? err : new Error('Failed to create post');
  }
} 