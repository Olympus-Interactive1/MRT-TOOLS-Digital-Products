"use client";
import { signOut } from "next-auth/react";
export function SignOutButton() { return <button className="signOutButton" onClick={() => signOut({ callbackUrl: "/" })}>Çıkış Yap</button>; }
