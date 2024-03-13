'use client'
import React, { useState } from 'react'; // Import useState hook
import RecipePost from "@/components/recipepost";
import { twMerge } from "tailwind-merge";
import { PostWithRecipe } from "@/lib/types";

interface RecipeFeedProps {
    className?: string;
    posts: PostWithRecipe[];
    userId: string;
}

const RecipeFeed = ({ className = "", posts, userId }: RecipeFeedProps) => {
    const [searchTerm, setSearchTerm] = useState(''); // State to store the search term

    // Function to handle the change in the search input
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    // Filter posts based on the search term
    const filteredPosts = posts.filter(post => {
        // Adjust this logic based on your needs, for example searching in the title
        return post.recipe!.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.recipe!.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.recipe!.ingredients.map(ing => ing.name.toLowerCase()).join('').includes(searchTerm.toLowerCase())
    });

    return (
        <div className={twMerge("flex flex-col gap-8", className)}>
            <input
                type="text"
                placeholder="Search posts..."
                className="p-2 border border-gray-300 rounded"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            {filteredPosts.map((post, index) => (
                <RecipePost key={index} post={post} userId={userId} useIngredientPopover={false} />
            ))}
        </div>
    );
};

export default RecipeFeed;

