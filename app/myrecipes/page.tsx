import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";
import Header from "@/components/header";
import TopRecipes from "@/components/toprecipes";
import UserPosts from "@/components/userposts";

export default async function Home() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/signup");
  }
  return (
    <div className="h-dvh">
      <Header />
      <div className="px-32 py-8 flex flex-col gap-8">
        <h1 className="text-xl font-light">
          Hi, {user.user}! Welcome to your melting pot, today's top recipes
          are...
        </h1>
        <TopRecipes className="w-5/6 self-center" />
        <h1 className="text-xl font-medium text-center">Your Posts</h1>
        <UserPosts />
      </div>
    </div>
  );
}
