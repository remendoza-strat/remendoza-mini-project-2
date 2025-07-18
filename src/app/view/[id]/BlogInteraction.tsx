"use client";
import {useTransition} from "react";
import {Button} from "@/components/ui/button";
import {IconThumbUp, IconArrowBigUpLine, IconArrowBigDownLine} from "@tabler/icons-react";
import {blogInteractions} from "@/app/utils/BlogActions";

// interface for props
interface BlogInteractionsProps{
    blogId: string;
    likes: number;
    upvote: number;
    downvote: number;
}

export function BlogInteraction({blogId, likes, upvote, downvote} : BlogInteractionsProps){
    // hook for transition 
    const [isPending, startTransition] = useTransition();

    // call blog interaction and send type of interaction done
    const handleInteract = (type: "likes" | "upvote" | "downvote") => {
        startTransition(() => {blogInteractions(blogId, type)});
    };

    return(
        <div className="flex">
            <Button
                onClick={() => handleInteract("likes")}
                disabled={isPending}
                className="interaction-button mx-2">
                    <IconThumbUp stroke={2}/>
                    <p>{likes}</p>
            </Button>
            <Button
                onClick={() => handleInteract("upvote")}
                disabled={isPending}
                className="interaction-button mx-2">
                    <IconArrowBigUpLine stroke={2}/>
                    <p>{upvote}</p>
            </Button>
            <Button
                onClick={() => handleInteract("downvote")}
                disabled={isPending}
                className="interaction-button mx-2">
                    <IconArrowBigDownLine stroke={2}/>
                    <p>{downvote}</p>
            </Button>
        </div>
    );
}