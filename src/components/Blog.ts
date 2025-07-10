export type Blog = {
    id: string;
    title: string;
    imageUrl: string;
    content: string;
    author: string;
    likes: number | null;
    upvote: number | null;
    downvote: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    code: string;
};