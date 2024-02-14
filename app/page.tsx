import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/auth";
import SignOutButton from "@/components/signoutbutton";

export default async function Home() {
    const { user } = await validateRequest();
    if (!user) {
        return redirect("/signup");
    }
    return (
        <div>
            <h1>Hi, {user.user}!</h1>
            <SignOutButton />
        </div>
    );
}
