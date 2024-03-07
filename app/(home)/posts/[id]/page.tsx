import PostPage from "@/components/postpage";

export default function Page({ params }: { params: { id: string } }) {
    return <PostPage postId={params.id} />
}
