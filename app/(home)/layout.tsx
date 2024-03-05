import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import Header from "@/components/header";


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user } = await validateRequest();
    if (!user) {
        return redirect("/signup");
    }
    return (
        <div className="h-dvh">
            <Header />
            <div className="px-32 py-8">
                {children}
            </div>
        </div>
    );
}
