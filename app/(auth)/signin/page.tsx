import { SignInForm } from "@/components/signinform";
import Link from "next/link";

export default async function Home() {
    return (
        <div className="h-screen w-screen flex flex-col items-center justify-center gap-10">
            <h1 className="text-2xl">sign in</h1>
            <SignInForm />
            <div className="text-xs text-gray-400"> Don't have an account? Click <Link href={'/signup'}>here</Link>.</div>
        </div>
    );
}
