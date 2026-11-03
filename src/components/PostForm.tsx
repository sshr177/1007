// src/components/PostForm.tsx
import { useState, type SubmitEvent } from 'react';
import type { NewPost } from '../types';

interface PostFormProps {
  onAdd: (data: NewPost) => Promise<void>;
}

function PostForm({ onAdd }: PostFormProps) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!title.trim() || !body.trim()) {
      setError('제목과 내용을 입력해주세요.');
      return;
    }
    setIsSubmitting(true);
    setError('');
    try {
      await onAdd({ userId: 1, title: title.trim(), body: body.trim() });
      setTitle('');
      setBody('');
    } catch (error: unknown) {
      setError(`작성에 실패했습니다: ${String(error)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input aria-label="제목" required disabled={isSubmitting} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="제목" />
      <textarea aria-label="내용" required disabled={isSubmitting} value={body} onChange={(e) => setBody(e.target.value)} placeholder="내용" />
      {error && <p role="alert">{error}</p>}
      <button type="submit" disabled={isSubmitting}>{isSubmitting ? '작성 중...' : '작성'}</button>
    </form>
  );
}

export default PostForm;
