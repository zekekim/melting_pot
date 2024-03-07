'use client'
import { useState, useEffect } from "react";
import { addLike, removeLike } from "@/lib/helpers/addlike";
import { Like } from "@prisma/client";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";

function LikeButton({ postId, likes, userId }: { postId: string, likes: Like[], userId: string }) {
    // Initial state from props
    const [optimisticLikes, setOptimisticLikes] = useState(likes);
    const userHasLiked = optimisticLikes.some((like) => like.userId === userId);

    // Optimistic update handler
    const handleLikeClick = async () => {
        // Toggle like state optimistically
        const newLikes = userHasLiked
            ? optimisticLikes.filter((like) => like.userId !== userId)
            : [...optimisticLikes, { postId, userId } as Like];

        setOptimisticLikes(newLikes);

        // Attempt to update server state
        try {
            if (userHasLiked) {
                await removeLike({ postId: postId });
            } else {
                await addLike({ postId: postId });
            }
        } catch (error) {
            // Revert optimistic update on error
            setOptimisticLikes(likes);
            console.error("Failed to update like", error);
        }
    };

    // Synchronize state with props
    useEffect(() => {
        setOptimisticLikes(likes);
    }, [likes]);

    return (
        <button className="flex gap-2 items-center" onClick={handleLikeClick}>
            {userHasLiked ? <FcLike /> : <FcLikePlaceholder />}
            <h3 className="font-light text-sm">{optimisticLikes.length}</h3>
        </button>
    );
}

export default LikeButton;

