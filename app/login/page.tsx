import { SignUpForm } from "@/components/signupform";

export default async function Home() {
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center">
            <SignUpForm />
        </div>
    );
}
