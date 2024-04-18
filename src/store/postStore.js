import { create } from "zustand";

const usePostStore = create((set) => ({
    post: [],
    createPost: (post) => set((state) => ({ post: [...state.post, post] })),

    //delete post
    //update post
    //set post
}));

export default usePostStore;