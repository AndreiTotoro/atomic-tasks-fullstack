import { SignedIn, SignedOut, UserButton, UserProfile } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Navbar() {
  return (
    <div>
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
