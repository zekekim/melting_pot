import { twMerge } from "tailwind-merge";
import RecipePost from "./recipepost";
import { PostWithRecipe } from "@/lib/types";

interface UserPostsProps {
  className?: string;
  posts: PostWithRecipe[];
}

const UserPosts = ({ className = "", posts }: UserPostsProps) => {

  return (
    <div className={twMerge("grid grid-cols-3 gap-6", className)}>
      {posts.map((post, index) => (
        <div className="p-1" key={index}>
          <RecipePost post={post} />
        </div>
      ))}
    </div>
  );
};

export default UserPosts;
