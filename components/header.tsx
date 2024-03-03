"use client";

import SignOutButton from "@/components/signoutbutton";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <div className="h-20 px-12 bg-slate-100 flex flex-row justify-between items-center">
      <div className="flex flex-row items-center gap-2">
        <Image
          src="/static/images/melting-pot.png"
          width={30}
          height={30}
          alt="Melting pot logo"
        />
        <h1 className="text-xl font-semibold">Melting Pot</h1>
      </div>
      <div className="flex flex-row items-center gap-4">
        <Button variant="ghost" onClick={() => router.push("/")}>
          Home
        </Button>
        <Button variant="outline">Create New Recipe</Button>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/myrecipes")}>
              My Recipes
            </DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
