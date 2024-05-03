import { SignedIn, SignedOut, UserButton, UserProfile } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-between">
      <h1 className="font-black text-2xl">Atomic To-Do</h1>
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Button>Login</Button>
        </Link>
      </SignedOut>
    </div>
  );
}
