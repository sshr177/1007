// 실습 2. 응답 모양을 확인하고 Post 타입 만들기
export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

// 실습 3. 글 작성용 NewPost 타입 만들기 (id는 서버가 붙여줌)

export type NewPost = Omit<Post, 'id'>;

// 실습 4. 로딩 / 성공 / 실패 상태 타입 만들기
export type Async<T> =
    | { status: 'loading'}
    | { status: 'success'; data: T}
    | { status: 'error'; message: string}
export {};
