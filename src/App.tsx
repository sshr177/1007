// src/App.tsx
import { useEffect, useState } from 'react';
import { getPosts, createPost, deletePost } from './api/posts';
import PostForm from './components/PostForm';
import type { Async, NewPost, Post } from './types';

function App() {
  const [state, setState] = useState<Async<Post[]>>({ status: 'loading' });
  const [deletingIds, setDeletingIds] = useState<number[]>([]);
  const [deleteError, setDeleteError] = useState('');

  useEffect(() => {
    getPosts()
      .then((data) => setState({ status: 'success', data }))
      .catch((e) => setState({ status: 'error', message: String(e) }));
  }, []);

  const addPost = async (data: NewPost) => {
    const created = await createPost(data);
    setState((prev) =>
      prev.status === 'success'
        ? { status: 'success', data: [created, ...prev.data] }
        : prev
    );
  };

  const removePost = async (id: number): Promise<void> => {
    setDeleteError('');
    setDeletingIds((prev) => [...prev, id]);
    try {
      await deletePost(id);
      setState((prev) =>
        prev.status === 'success'
          ? { status: 'success', data: prev.data.filter((post) => post.id !== id) }
          : prev
      );
    } catch (error: unknown) {
      setDeleteError(`삭제에 실패했습니다: ${String(error)}`);
    } finally {
      setDeletingIds((prev) => prev.filter((deletingId) => deletingId !== id));
    }
  };

  if (state.status === 'loading') return <p>불러오는 중...</p>;
  if (state.status === 'error') return <p>에러: {state.message}</p>;

  // 여기서부터 state는 success로 좁혀짐 (왜?? 성공해야 띄울 수 있으니까!!)
  return (
    <div>
      <PostForm onAdd={addPost} />
      {deleteError && <p role="alert">{deleteError}</p>}
      {state.data.length === 0 && <p>등록된 게시글이 없습니다.</p>}
      {state.data.map((post) => (
        <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button
            type="button"
            disabled={deletingIds.includes(post.id)}
            onClick={() => void removePost(post.id)}
          >
            {deletingIds.includes(post.id) ? '삭제 중...' : '삭제'}
          </button>
        </article>
      ))}
    </div>
  );
}

export default App;
