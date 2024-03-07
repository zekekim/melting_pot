'use client'
import {
    Card,
    CardTitle,
    CardFooter,
    CardHeader,
    CardContent,
    CardDescription
} from "@/components/ui/card";
import { PostWithRecipeAndComments } from "@/lib/types";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { randomUUID } from "crypto";
import { Reply } from "@prisma/client";
import { ReplyWithUser } from "@/lib/types";
import { createComment } from "@/lib/helpers/createcomment";
import { User } from "lucia";

export function CommentSection({ post, userId, user }: { post: PostWithRecipeAndComments, userId: string, user: User }) {

    const [commentContent, setCommentContent] = useState('')
    const [optimisticComments, setOptimisticComments] = useState<ReplyWithUser[]>(post.replies)


    async function postComment() {
        const newComment = { postId: post.id, body: commentContent }
        const newComments: ReplyWithUser[] = [{ id: crypto.randomUUID(), userId: userId, user: user, postId: post.id, body: commentContent } as ReplyWithUser, ...optimisticComments]
        setOptimisticComments(newComments)
        await createComment(newComment)
    }
    return (
        <Card className="grow h-[36rem] flex flex-col justify-between">
            <CardHeader>
                <CardTitle>
                    comments
                </CardTitle>
            </CardHeader>
            <CardContent className="h-fit overflow-y-scroll">
                {optimisticComments.map((comment) => {
                    return (<Card>
                        <CardHeader>
                            <CardTitle>
                                {comment.user.user}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            {comment.body}
                        </CardContent>
                    </Card>)
                })}
            </CardContent>
            <CardFooter className="min-w-40 flex flex-col items-start gap-4">
                <Textarea
                    value={commentContent}
                    onChange={e => setCommentContent(e.target.value)}
                    placeholder='your comment here...' id="message" />
                <Button onClick={() => {
                    postComment()
                }}>post comment</Button>
            </CardFooter>
        </Card>
    )
}
