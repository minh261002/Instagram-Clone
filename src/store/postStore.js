import { create } from "zustand";

const usePostStore = create((set) => ({
    post: [],
    createPost: (post) => set((state) => ({ post: [...state.post, post] })),
    setPosts: (posts) => set({ posts }),
    deletePost: (id) => set((state) => ({ posts: state.posts.filter((post) => post.id !== id) })),
    addComment: (postId, comment) =>
        set((state) => ({
            posts: state.posts.map((post) => {
                if (post.id === postId) {
                    return {
                        ...post,
                        comments: [...post.comments, comment],
                    };
                }
                return post;
            }),
        })),
}));

export default usePostStore;