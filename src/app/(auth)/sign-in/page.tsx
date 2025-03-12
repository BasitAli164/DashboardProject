"use client";
import { useSession, signIn, signOut } from "next-auth/react";
export default function SignInPage() {
  const { data: session } = useSession();
  if(session){
   return (
    <>
    Signed in as {session.user.username} <br />

    <button onClick={()=>signOut()}>SignOut</button>
    </>
   ) 
  }
  return (
    <>
    Not-Sign In <br />
    <button className="bg-orange-500 px-3 py-1 m-4 rounded" onClick={()=>signIn()}>Sign In</button>
    </>
  )
}
