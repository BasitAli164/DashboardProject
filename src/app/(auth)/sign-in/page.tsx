"use client";
import { useSession, signIn, signOut } from "next-auth/react";
export default function SignInPage() {
  const { data: session } = useSession();
  if(session){
   return (
    <>
    Signed in as {session.user.username}
    <button></button>
    </>
   ) 
  }
}
