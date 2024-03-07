'use client'
import {
    Card,
    CardTitle,
    CardFooter,
    CardHeader,
    CardContent,
    CardDescription
} from "@/components/ui/card";
import { PostWithRecipe } from "@/lib/types";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import { randomUUID } from "crypto";
import { Reply } from "@prisma/client";
import { createComment } from "@/lib/helpers/createcomment";
import { commentSchema } from "@/lib/validations/createcomment";

export function CommentSection({ post, userId }: { post: PostWithRecipe, userId: string}) {

    const [commentContent, setCommentContent] = useState('')
    const [optimisticComments, setOptimisticComments] = useState<Reply[]>(post.replies)


    async function postComment() {
        const newComment = {postId: post.id, body: commentContent}
        const newComments: Reply[] = [ { id: randomUUID(), userId: userId, postId: post.id, body: commentContent } as Reply,... optimisticComments]
        setOptimisticComments(newComments)
        await createComment(newComment)
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    comments
                </CardTitle>
            </CardHeader>
            <CardContent>
                {post.replies.map((comment) => {
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
            <CardFooter>
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
