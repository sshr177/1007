import { api } from './client';
import type { Post, NewPost } from '../types';

// 실습 2. getPosts : 게시글 목록 불러오기 (응답 타입 붙이기)
export const getPosts = async (): Promise<Post[]> => {
    const res = await api.get<Post[]>('/posts');
    return res.data;
}

// 실습 3. createPost : 게시글 작성하기 (보낼 때 / 받을 때 타입 구분)
export const createPost = async (data: NewPost): Promise<Post> => {
    const res = await api.post<Post>('/posts', data);
    return res.data;
}

export const deletePost = async (id: number): Promise<void> => {
    await api.delete<void>(`/posts/${id}`);
};
