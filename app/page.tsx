import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";
import SignOutButton from "@/components/signoutbutton";
import RecipeForm from "@/components/createpost";

export default async function Home() {
    const { user } = await validateRequest();
    if (!user) {
        return redirect("/signup");
    }
    return (
        <div className= "flex flex-col gap-10 items-center p-24">
            <h1>Hi, {user.user}!</h1>
            <RecipeForm />
            <SignOutButton />
        </div>
    );
}
