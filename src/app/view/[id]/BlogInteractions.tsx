'use client';
import {useTransition} from 'react';
import {blogInteractions} from '@/app/view/[id]/actions';
import {Button} from '@/components/ui/button';
import {IconThumbUp, IconArrowBigUpLine, IconArrowBigDownLine} from '@tabler/icons-react';

interface BlogInteractionsProps{
    blogId: string;
    likes: number;
    upvote: number;
    downvote: number;
}

export function BlogInteractions({blogId, likes, upvote, downvote} : BlogInteractionsProps){
    const [isPending, startTransition] = useTransition();

    const handleInteract = (type: 'likes' | 'upvote' | 'downvote') => {
        startTransition(() => {blogInteractions(blogId, type)});
    };

    return(
        <div className="flex">
            <Button
                onClick={() => handleInteract('likes')}
                className="view-slug-stats flex py-1 px-3 rounded-full m-2"
                disabled={isPending}>
                    <IconThumbUp stroke={1}/>
                    <p>{likes}</p>
            </Button>

            <Button
                onClick={() => handleInteract('upvote')}
                className="view-slug-stats flex py-1 px-3 rounded-full m-2"
                disabled={isPending}>
                    <IconArrowBigUpLine stroke={1}/>
                    <p>{upvote}</p>
            </Button>

            <Button
                onClick={() => handleInteract('downvote')}
                className="view-slug-stats flex py-1 px-3 rounded-full m-2"
                disabled={isPending}>
                    <IconArrowBigDownLine stroke={1}/>
                    <p>{downvote}</p>
            </Button>
        </div>
    );
}