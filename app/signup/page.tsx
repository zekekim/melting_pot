import { SignUpForm } from "@/components/signupform";
import Link from "next/link";

export default async function Home() {
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center gap-10">
            <h1 className="text-2xl">sign up</h1>
            <SignUpForm />
            <div className="text-xs text-gray-400"> Already have an account? Click <Link href={'/signin'}>here</Link>.</div>
        </div>
    );
}
